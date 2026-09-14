import { createInterface } from "node:readline"
import { spawnSync } from "bun"

function decode(buf: Uint8Array | undefined): string {
	if (!buf || buf.length === 0) return ""
	return new TextDecoder().decode(buf).trim()
}

function git(args: string[], opts: { inherit?: boolean } = {}) {
	return spawnSync(["git", ...args], opts.inherit ? { stdout: "inherit", stderr: "inherit" } : undefined)
}

function readLine(prompt: string = ""): Promise<string> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	return new Promise(resolve => {
		rl.question(prompt, answer => {
			rl.close()
			resolve(answer)
		})
	})
}

function resolveHash(ref: string): string | null {
	const result = git(["rev-parse", "--verify", `${ref}^{commit}`])
	if (!result.success) return null
	return decode(result.stdout)
}

function isAncestor(commit: string, tip: string): boolean {
	return git(["merge-base", "--is-ancestor", commit, tip]).success
}

function workingTreeDirty(): boolean {
	const result = git(["status", "--porcelain"])
	return decode(result.stdout).length > 0
}

async function getResetMode(): Promise<string> {
	console.log("\nChoose reset mode:")
	console.log("1. --hard (destructive, removes all changes)")
	console.log("2. --soft (keeps changes staged)")
	console.log("3. --mixed (keeps changes unstaged, default)")

	const mode = (await readLine("Enter choice [1-3] (default: 3): ")) || "3"

	if (mode === "1") return "--hard"
	if (mode === "2") return "--soft"
	return "--mixed"
}

async function maybeForcePush(currentBranch: string) {
	const answer = ((await readLine(`Force push origin/${currentBranch}? [y/N]: `)) || "n")
		.trim()
		.toLowerCase()

	if (answer !== "y" && answer !== "yes") {
		console.log(`\n👉 Later: git push origin ${currentBranch} --force\n`)
		return
	}

	const push = git(["push", "origin", currentBranch, "--force"], { inherit: true })
	if (push.success) {
		console.log("\n✅ Force push complete.\n")
	} else {
		console.error("\n❌ Force push failed.")
		console.error(decode(push.stderr))
		process.exit(1)
	}
}

async function removeLastCommit(currentBranch: string) {
	const resetMode = await getResetMode()
	const reset = git(["reset", resetMode, "HEAD~1"])

	if (reset.success) {
		console.log(`\n✅ Successfully removed last commit using ${resetMode}.`)
		await maybeForcePush(currentBranch)
	} else {
		console.error("\n❌ Reset failed.")
		console.error(decode(reset.stderr))
		process.exit(1)
	}
}

async function removeOlderCommit(commitHash: string, currentBranch: string) {
	if (workingTreeDirty()) {
		console.error("\n❌ Working tree is dirty. Commit/stash/discard local changes before deleting a non-HEAD commit.")
		process.exit(1)
	}

	// Prefer ~1 over ^ so Windows shells never eat the caret if this ever gets shell-wrapped.
	const parent = resolveHash(`${commitHash}~1`)
	if (!parent) {
		console.error("\n❌ Cannot delete root commit (no parent).")
		process.exit(1)
	}

	console.log(`\nAttempting to remove: ${commitHash.substring(0, 7)}...`)
	const rebase = git(["rebase", "--onto", parent, commitHash, currentBranch])

	if (rebase.success) {
		console.log("\n✅ Successfully removed commit locally.")
		await maybeForcePush(currentBranch)
		return
	}

	console.error("\n❌ Rebase failed (likely due to merge conflicts).")
	console.log("Aborting rebase...")
	git(["rebase", "--abort"])
	console.error(decode(rebase.stderr) || decode(rebase.stdout))
	process.exit(1)
}

const branchResult = git(["rev-parse", "--abbrev-ref", "HEAD"])
const currentBranch = decode(branchResult.stdout)

if (!branchResult.success || !currentBranch) {
	console.error("Error: Not a git repository or couldn't find branch.")
	process.exit(1)
}

const headHash = resolveHash("HEAD")
if (!headHash) {
	console.error("Error: Could not resolve HEAD.")
	process.exit(1)
}

console.log(`\n--- Recent history for branch: ${currentBranch} ---`)
git(["log", "-n", "10", "--oneline", "--color"], { inherit: true })
console.log("--------------------------------------------------\n")

const input = await readLine(
	"Enter the commit hash you want to DELETE (or press Enter for last commit): "
)
const rawInput = input.trim()
const commitHash = resolveHash(rawInput || "HEAD")

if (!commitHash) {
	console.error(`\n❌ Error: Commit ${rawInput || "HEAD"} not found.`)
	process.exit(1)
}

if (commitHash !== headHash && !isAncestor(commitHash, headHash)) {
	console.error(`\n❌ Error: ${commitHash.substring(0, 7)} is not on ${currentBranch}.`)
	process.exit(1)
}

if (commitHash === headHash) {
	console.log(`\nRemoving last commit: ${commitHash.substring(0, 7)}...`)
	await removeLastCommit(currentBranch)
} else {
	await removeOlderCommit(commitHash, currentBranch)
}

process.exit(0)
