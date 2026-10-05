/* twdb compat pack "features" generated 2026-10-05T08:33:31.752Z — do not edit; from Compat/packs/features.js */
/**
 * Compat pack: features (lazy on prod/beta; embedded on dev).
 */

/** Table-driven clothcache TWDS.settings bool mitigations (pref engine). */
twdbCompatRegisterTwdsPrefSpecs([
	{ settingId: "job_show_collectibles", prefKey: "jobwindow_show_collectibles", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheJobShowCollectibles" },
	{ settingId: "job_show_luck", prefKey: "jobwindow_show_luckp", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheJobwindowShowLuck" },
	{ settingId: "daily_tasks_warning", prefKey: "misc_daily_activities_warning", missingDefault: true, forceValue: false, ourDefaultOn: true, syncName: "twdbSyncClothcacheDailyTasksWarning" },
	{ settingId: "unread_telegrams_highlight", prefKey: "misc_highlight_telegrams", missingDefault: false, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheUnreadTelegramsHighlightSetting" },
	{ settingId: "misc_sheriff_minbounty", prefKey: "misc_sheriff_minbounty", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheSheriffMinbounty" },
	{ settingId: "quest_tracker_warning", prefKey: "misc_mark_tracker_when_finishable", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheQuestTrackerWarning" },
	{ settingId: "fortbattle_chat_health", prefKey: "misc_fortbattle_chatext", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheFortbattleChatHealth" },
	{ settingId: "click_profile_for_description", prefKey: "misc_profile_text_click", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheMiscProfileTextClick" },
	{ settingId: "market_sellstat", prefKey: "market_sellstat", missingDefault: true, forceValue: false, ourDefaultOn: false, syncName: "twdbSyncClothcacheMarketSellstat" },
	{ settingId: "wof_rewards_count", prefKey: "misc_wof_showcount", missingDefault: false, forceValue: false, ourDefaultOn: false, schedule: "twds_retries", syncName: "twdbSyncClothcacheWofRewardsCount", afterForce: function () { if (typeof $ !== "undefined") { $(".TWDS_wof_count").remove() } } },
	{ settingId: "wof_nuggets_off", prefKey: "misc_avoid_nuggets", missingDefault: false, forceValue: false, ourDefaultOn: false, schedule: "twds_retries", syncName: "twdbSyncClothcacheAvoidNuggets", afterForce: function () { if (typeof changeWofNuggets === "function") { changeWofNuggets() } } },
])

function twdbMitigateClothcacheMiniChatTabs() {
	if (!Settings.get("mini_chat", false)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const clearTabsOnclick = function () {
		try {
			const t = document.querySelector("#ui_chat .tabs")
			if (t && t.onclick) {
				t.onclick = null
			}
		} catch (_e) {
			/* ignore */
		}
	}
	clearTabsOnclick()
	if (!twdbMiniChatTabsTwdsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbMiniChatTabsTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(clearTabsOnclick)
		} catch (_e) {
			twdbMiniChatTabsTwdsHookRegistered = false
		}
	}
	window.setTimeout(clearTabsOnclick, 0)
	window.setTimeout(clearTabsOnclick, 100)
	window.setTimeout(clearTabsOnclick, 500)
	window.setTimeout(clearTabsOnclick, 1500)
	window.setTimeout(clearTabsOnclick, 2500)
}
/**
 * Noops clothcache fort name clickhelper + removes TWDS fort UI nodes. `clickhelper` is assigned at
 * clothcache load (not re-created later); delegated handlers call the noop. Re-run when fort panel
 * opens via `fortbattle_player_colors` + settings callback.
 */
function twdbMitigateClothcacheFortCharacterColorsConflicts() {
	if (!Settings.get("fortbattle_player_colors", false)) {
		return
	}
	try {
		if (window.TWDS && window.TWDS.fbchat) {
			if (typeof window.TWDS.fbchat.clickhelper === "function") {
				window.TWDS.fbchat.clickhelper = function () { }
			}
		}
		$("#fort_battle_window, #windows")
			.find(".TWDS_charinfocolor,.TWDS_charinfocolorclear,.TWDS_copycharname")
			.remove()
	} catch (_e) {
		/* ignore */
	}
}
/** Legacy hook: current tw-duellstat clothcache has no `minimap.searchmodehandler` (no-op if absent). */
function twdbMitigateClothcacheMinimapSearchmode() {
	if (!Settings.get("minimap_shortcuts", false)) {
		return
	}
	try {
		if (!window.TWDS || !window.TWDS.minimap) {
			return
		}
		if (typeof window.TWDS.minimap.searchmodehandler === "function") {
			window.TWDS.minimap.searchmodehandler = function () { }
		}
	} catch (_e) {
		/* ignore */
	}
}
/**
 * True for clothcache `minimap_coordinput` jobsearch keyup (Enter + named places + coords).
 * Matches unminified tw-duellstat and common minifier output (no reliance on `GameMap.` vs `window.GameMap.`).
 */
function twdbHandlerLooksLikeClothcacheMinimapJobsearchKeyup(fn) {
	const src = String(fn || "")
	if (!src) {
		return false
	}
	if (src.includes("ghost|g|indian|i|center|c|home|h")) {
		return true
	}
	if (src.includes("TWDS_searchmode")) {
		return true
	}
	if (src.includes("keyCode === 13") && src.includes("tw2gui_jobsearchbar_results")) {
		return true
	}
	if (src.includes("1920") && src.includes("2176") && src.includes("GameMap.center")) {
		return true
	}
	return false
}
/** Used by `Map/minimap_shortcuts.js` when binding the jobsearch input (loads before this file; resolves at callback time). */
function twdbStripClothcacheMinimapInputHandlers($input) {
	try {
		const jq = window.jQuery || $
		if (!jq || typeof jq._data !== "function") {
			return
		}
		const el = $input && $input.get ? $input.get(0) : null
		if (!el) {
			return
		}
		const events = jq._data(el, "events")
		const list = events && events.keyup ? events.keyup.slice() : []
		for (let i = 0; i < list.length; i++) {
			const meta = list[i]
			const fn = meta && meta.handler
			if (twdbHandlerLooksLikeClothcacheMinimapJobsearchKeyup(fn)) {
				$input.off("keyup", fn)
			}
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbStripClothcacheDelegatedMinimapHandlers() {
	try {
		const jq = window.jQuery || $
		if (!jq || typeof jq._data !== "function") {
			return
		}
		const scanTargets = [document, document.body]
		for (let t = 0; t < scanTargets.length; t++) {
			const target = scanTargets[t]
			if (!target) {
				continue
			}
			const events = jq._data(target, "events")
			const list = events && events.keyup ? events.keyup.slice() : []
			for (let i = 0; i < list.length; i++) {
				const meta = list[i]
				const sel = String(meta && meta.selector ? meta.selector : "")
				const fn = meta && meta.handler
				if (!sel.includes(".tw2gui_jobsearch_string")) {
					continue
				}
				if (twdbHandlerLooksLikeClothcacheMinimapJobsearchKeyup(fn)) {
					jq(target).off("keyup", sel, fn)
				}
			}
		}
	} catch (_e) {
		/* ignore */
	}
}
/**
 * Clothcache registers minimap jobsearch `keyup` inside `TWDS.minimap.uiinit` after our inject runs.
 * Wrap once so we re-bind ClothCalc handlers immediately after clothcache attaches.
 */
function twdbEnsureClothcacheMinimapUiinitWrapped() {
	if (!Settings.get("minimap_shortcuts", false) && !Settings.get("minimap_nearest_job_center", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent !== "function" || !twdbIsClothcachePresent()) {
		return
	}
	try {
		const mm = window.TWDS && window.TWDS.minimap
		if (!mm || typeof mm.uiinit !== "function" || mm.__twdbClothcalcUiinitWrapped) {
			return
		}
		const orig = mm.uiinit
		mm.uiinit = function () {
			const ret = orig.apply(this, arguments)
			try {
				if (typeof twdbGetMinimapSearchInput !== "function") {
					return ret
				}
				const $inp = twdbGetMinimapSearchInput()
				if (!$inp || !$inp.length) {
					return ret
				}
				if (Settings.get("minimap_shortcuts", false) && typeof twdbBindMinimapShortcutHandlersOnInput === "function") {
					twdbBindMinimapShortcutHandlersOnInput($inp)
				}
				if (
					Settings.get("minimap_nearest_job_center", true) &&
					typeof twdbBindMinimapNearestJobCenterHandlersOnInput === "function"
				) {
					twdbBindMinimapNearestJobCenterHandlersOnInput($inp)
				}
			} catch (_e) {
				/* ignore */
			}
			return ret
		}
		mm.__twdbClothcalcUiinitWrapped = true
	} catch (_e) {
		/* ignore */
	}
}
function twdbMitigateClothcacheMinimapBundle() {
	twdbEnsureClothcacheMinimapUiinitWrapped()
	twdbMitigateClothcacheMinimapSearchmode()
	twdbStripClothcacheDelegatedMinimapHandlers()
	try {
		if (typeof twdbGetMinimapSearchInput !== "function") {
			return
		}
		const $inp = twdbGetMinimapSearchInput()
		if (!$inp || !$inp.length) {
			return
		}
		if (Settings.get("minimap_shortcuts", false) && typeof twdbBindMinimapShortcutHandlersOnInput === "function") {
			twdbBindMinimapShortcutHandlersOnInput($inp)
		}
		if (
			Settings.get("minimap_nearest_job_center", true) &&
			typeof twdbBindMinimapNearestJobCenterHandlersOnInput === "function"
		) {
			twdbBindMinimapNearestJobCenterHandlersOnInput($inp)
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbMitigationSlashClothcacheBundle() {
	twdbScheduleClothcacheSlashCoexistence()
	twdbReapplyChatSlashOperationsIfClothcache()
}
for (let i = 0; i < TWDB_SLASH_CLOTHCACHE_CONFLICT_IDS.length; i++) {
	twdbRegisterExternalMitigation(TWDB_SLASH_CLOTHCACHE_CONFLICT_IDS[i], twdbMitigationSlashClothcacheBundle)
}
let twdbFriendreqClothcacheTwdsHookRegistered = false
let twdbClothcacheFriendreqPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheFriendreqUserPref = null
/**
 * Turn off clothcache `friendrequestcounter` (hook + UI + listener) while ClothCalc’s
 * `friendrequest_counter` is on. Re-run after TWDS start (clothcache registers late).
 */
function twdbMitigateClothcacheFriendrequestCounter() {
	if (!Settings.get("friendrequest_counter")) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		try {
			const twds = window.TWDS
			if (!twds || !twds.friendrequestcounter) {
				return
			}
			if (twds.settings && typeof twds.settings === "object") {
				if (!twdbClothcacheFriendreqPrefCaptured) {
					const p = twds.settings.friendrequestcounter
					if (typeof p === "boolean") {
						twdbClothcacheFriendreqUserPref = p
					} else {
						twdbClothcacheFriendreqUserPref = true
					}
					twdbClothcacheFriendreqPrefCaptured = true
				}
				twds.settings.friendrequestcounter = false
			}
			if (
				typeof EventHandler !== "undefined" &&
				EventHandler.unlisten &&
				typeof twds.friendrequestcounter.update === "function"
			) {
				EventHandler.unlisten("friend_invitation_sent", twds.friendrequestcounter.update)
			}
			const FL = window.FriendslistWindow
			if (
				FL &&
				typeof FL.TWDS_backup_setOpenRequests === "function" &&
				FL.setOpenRequests === twds.friendrequestcounter.setopenrequests
			) {
				FL.setOpenRequests = FL.TWDS_backup_setOpenRequests
			}
			if (typeof twds.friendrequestcounter.update === "function") {
				twds.friendrequestcounter.update()
			}
			if (typeof $ !== "undefined") {
				$("#ui_bottombar .TWDS_requestcounter").remove()
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (!twdbFriendreqClothcacheTwdsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbFriendreqClothcacheTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbFriendreqClothcacheTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
/** Restore clothcache friend-request counter after ClothCalc’s feature is turned off (instant apply). */
function twdbRestoreClothcacheFriendrequestCounter() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheFriendreqPrefCaptured = false
		twdbClothcacheFriendreqUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.friendrequestcounter) {
			twdbClothcacheFriendreqPrefCaptured = false
			twdbClothcacheFriendreqUserPref = null
			return
		}
		if (twds.settings && typeof twds.settings === "object" && twdbClothcacheFriendreqPrefCaptured) {
			twds.settings.friendrequestcounter = twdbClothcacheFriendreqUserPref
		}
		const FL = window.FriendslistWindow
		if (FL && typeof twds.friendrequestcounter.setopenrequests === "function") {
			FL.setOpenRequests = twds.friendrequestcounter.setopenrequests
		}
		if (
			twds.settings &&
			twds.settings.friendrequestcounter &&
			typeof EventHandler !== "undefined" &&
			EventHandler.listen &&
			typeof twds.friendrequestcounter.update === "function"
		) {
			EventHandler.listen("friend_invitation_sent", twds.friendrequestcounter.update)
		}
		if (typeof twds.friendrequestcounter.update === "function") {
			twds.friendrequestcounter.update()
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheFriendreqPrefCaptured = false
	twdbClothcacheFriendreqUserPref = null
}
function twdbSyncClothcacheFriendrequestCounter(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheFriendrequestCounter()
	} else {
		twdbRestoreClothcacheFriendrequestCounter()
	}
}
twdbRegisterExternalMitigation("mini_chat", twdbMitigateClothcacheMiniChatTabs)
twdbRegisterExternalMitigation("fortbattle_player_colors", twdbMitigateClothcacheFortCharacterColorsConflicts)
twdbRegisterExternalMitigation("minimap_shortcuts", twdbMitigateClothcacheMinimapBundle)
twdbRegisterExternalMitigation("minimap_nearest_job_center", twdbMitigateClothcacheMinimapBundle)
twdbRegisterExternalMitigation("friendrequest_counter", twdbMitigateClothcacheFriendrequestCounter)

let twdbFriendslistClothcacheTwdsHookRegistered = false
let twdbClothcacheFriendslistPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheFriendslistUserPref = null
/**
 * Disable clothcache `misc_enhance_friendslistwindow` while ClothCalc `friendslist_window_info` is on.
 * Removes their summary node; re-run after TWDS start (clothcache registers late).
 */
function twdbMitigateClothcacheFriendslistWindow() {
	if (!Settings.get("friendslist_window_info")) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		try {
			const twds = window.TWDS
			if (!twds || !twds.settings || typeof twds.settings !== "object") {
				return
			}
			if (!twdbClothcacheFriendslistPrefCaptured) {
				const p = twds.settings.misc_enhance_friendslistwindow
				if (typeof p === "boolean") {
					twdbClothcacheFriendslistUserPref = p
				} else {
					twdbClothcacheFriendslistUserPref = true
				}
				twdbClothcacheFriendslistPrefCaptured = true
			}
			twds.settings.misc_enhance_friendslistwindow = false
			if (typeof $ !== "undefined") {
				$(".TWDS_friendslistwindow_num").remove()
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (!twdbFriendslistClothcacheTwdsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbFriendslistClothcacheTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbFriendslistClothcacheTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
function twdbRestoreClothcacheFriendslistWindow() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheFriendslistPrefCaptured = false
		twdbClothcacheFriendslistUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheFriendslistPrefCaptured = false
			twdbClothcacheFriendslistUserPref = null
			return
		}
		if (twdbClothcacheFriendslistPrefCaptured) {
			twds.settings.misc_enhance_friendslistwindow = twdbClothcacheFriendslistUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheFriendslistPrefCaptured = false
	twdbClothcacheFriendslistUserPref = null
}
function twdbSyncClothcacheFriendslistWindow(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheFriendslistWindow()
	} else {
		twdbRestoreClothcacheFriendslistWindow()
	}
}
twdbRegisterExternalMitigation("friendslist_window_info", twdbMitigateClothcacheFriendslistWindow)

let twdbEventCurrencyTwdsHookRegistered = false
let twdbClothcacheEventCurrencyFastclickCaptured = false
/** @type {(() => void) | null} */
let twdbClothcacheEventCurrencyFastclickOrig = null
function twdbClothcacheEventCurrencyFastclickNoop() { }
/**
 * Clothcache wires `TWDS.friends.fastclick` + a body delegate on `.custom_unit_counter .icon:not(.help)`.
 * While ClothCalc handles sends, replace `fastclick` with a noop so clothcache does not double-fire.
 */
function twdbMitigateClothcacheEventCurrencyClickSendAll() {
	if (!Settings.get("event_currency_click_send_all", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		if (!Settings.get("event_currency_click_send_all", true)) {
			return
		}
		try {
			const twds = window.TWDS
			if (!twds || !twds.friends || typeof twds.friends !== "object") {
				return
			}
			const cur = twds.friends.fastclick
			if (!twdbClothcacheEventCurrencyFastclickCaptured) {
				if (typeof cur === "function" && cur !== twdbClothcacheEventCurrencyFastclickNoop) {
					twdbClothcacheEventCurrencyFastclickOrig = cur
				}
				twdbClothcacheEventCurrencyFastclickCaptured = true
			}
			twds.friends.fastclick = twdbClothcacheEventCurrencyFastclickNoop
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (!twdbEventCurrencyTwdsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbEventCurrencyTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbEventCurrencyTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
}
function twdbRestoreClothcacheEventCurrencyClickSendAll() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheEventCurrencyFastclickCaptured = false
		twdbClothcacheEventCurrencyFastclickOrig = null
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.friends && typeof twdbClothcacheEventCurrencyFastclickOrig === "function") {
			twds.friends.fastclick = twdbClothcacheEventCurrencyFastclickOrig
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheEventCurrencyFastclickCaptured = false
	twdbClothcacheEventCurrencyFastclickOrig = null
}
function twdbSyncClothcacheEventCurrencyClickSendAll(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheEventCurrencyClickSendAll()
	} else {
		twdbRestoreClothcacheEventCurrencyClickSendAll()
	}
}
twdbRegisterExternalMitigation("event_currency_click_send_all", twdbMitigateClothcacheEventCurrencyClickSendAll)



/**
 * TWIR shop/trader collection injects have no feature flag — noop when ClothCalc collector is on.
 */
function twdbMitigateTwirShopCollectionBadges() {
	if (!Settings.get("collector", false)) {
		return
	}
	try {
		const shopProto = west?.game?.shop?.item?.view?.prototype
		if (shopProto) {
			shopProto.twir_Collections = function () {
				return ""
			}
		}
		if (tw2widget?.TraderItem?.prototype) {
			tw2widget.TraderItem.prototype.twir_Collections = function () {
				return this.divMain
			}
		}
		if (tw2widget?.ItemTraderItem?.prototype) {
			tw2widget.ItemTraderItem.prototype.twir_Collections = function () {
				return this.divMain
			}
		}
		if (typeof $ !== "undefined") {
			$(".shop_item > .twir_collectible").remove()
			$(".shop_item > img[src*='items/yield/toolbox.png']").filter(function () {
				return !$(this).closest(".item").length
			}).remove()
			$(".item_trader .twir_collectible, .item_trader_mini .twir_collectible").remove()
		}
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("collector", twdbMitigateTwirShopCollectionBadges)



let twdbClothcacheTaskqueueFaviconTwdsHookRegistered = false
let twdbClothcacheTaskqueueFaviconPrefsCaptured = false
/** @type {Record<string, boolean|number>} */
let twdbClothcacheTaskqueueFaviconUserPrefs = Object.create(null)
/** @type {Function|null} */
let twdbClothcacheTaskqueueFaviconHandlerBackup = null

function twdbClothcacheTaskqueueFaviconAnyOursOn() {
	return !!(
		Settings.get("taskqueue_length_in_favicon", false) ||
		Settings.get("taskqueue_idle_in_favicon", false) ||
		Settings.get("taskqueue_sleep_in_favicon", false)
	)
}

function twdbRemoveClothcacheTaskqueueFaviconDom() {
	try {
		const shortcut = document.querySelector("#TWDS_shortcuticon")
		if (shortcut && shortcut.parentNode) {
			shortcut.remove()
		}
		const twds = window.TWDS
		const tq = twds && twds.taskqueue
		if (tq) {
			const my = tq.myfavicon
			if (my && my !== -1) {
				if (typeof my.remove === "function") {
					my.remove()
				} else if (my.parentNode) {
					my.parentNode.removeChild(my)
				}
			}
			tq.myfavicon = null
		}
		let old = tq && tq.oldfavicon
		if (!old || !old.isConnected) {
			old =
				document.querySelector("link.TWDS_faviconbackup") ||
				document.querySelector("link[rel='TWDS_disabled']")
		}
		const oursOwnsIcon =
			twdbClothcacheTaskqueueFaviconAnyOursOn() || !!document.querySelector("#twdb_shortcuticon")
		if (oursOwnsIcon) {
			// Keep vanilla disabled so the browser does not prefer it over #twdb_shortcuticon.
			if (old && old.isConnected) {
				old.classList.remove("TWDS_faviconbackup")
				old.classList.add("twdb_favicon_backup")
				if (old.rel === "shortcut icon" || old.rel === "TWDS_disabled") {
					old.rel = "twdb_disabled"
				}
				if (tq) {
					tq.oldfavicon = old
				}
			}
			return
		}
		if (old) {
			old.rel = "shortcut icon"
			old.classList.remove("TWDS_faviconbackup")
		}
	} catch (_e) {
		/* ignore */
	}
}

/**
 * Clothcache task-queue favicon uses `TWDS.settings.taskqueue_*_in_favicon` + `TWDS.taskqueue.faviconhandler`
 * (also listens on energy/health). Force off while any ClothCalc task-queue favicon option is enabled.
 */
function twdbMitigateClothcacheTaskqueueFavicon() {
	if (!twdbClothcacheTaskqueueFaviconAnyOursOn()) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		try {
			const twds = window.TWDS
			if (!twds || !twds.settings || typeof twds.settings !== "object") {
				return
			}
			if (!twdbClothcacheTaskqueueFaviconPrefsCaptured) {
				const s = twds.settings
				twdbClothcacheTaskqueueFaviconUserPrefs.taskqueue_length_in_favicon =
					typeof s.taskqueue_length_in_favicon === "boolean" ? s.taskqueue_length_in_favicon : false
				twdbClothcacheTaskqueueFaviconUserPrefs.taskqueue_length0_in_favicon =
					typeof s.taskqueue_length0_in_favicon === "boolean" ? s.taskqueue_length0_in_favicon : false
				twdbClothcacheTaskqueueFaviconUserPrefs.taskqueue_sleep_in_favicon =
					typeof s.taskqueue_sleep_in_favicon === "boolean" ? s.taskqueue_sleep_in_favicon : false
				const healthPref = s.taskqueue_show_health_in_favicon
				twdbClothcacheTaskqueueFaviconUserPrefs.taskqueue_show_health_in_favicon =
					typeof healthPref === "number" && Number.isFinite(healthPref) ? healthPref : 0
				twdbClothcacheTaskqueueFaviconPrefsCaptured = true
			}
			twds.settings.taskqueue_length_in_favicon = false
			twds.settings.taskqueue_length0_in_favicon = false
			twds.settings.taskqueue_sleep_in_favicon = false
			twds.settings.taskqueue_show_health_in_favicon = 0
			const tq = twds.taskqueue
			if (tq && typeof tq.faviconhandler === "function") {
				if (!twdbClothcacheTaskqueueFaviconHandlerBackup) {
					twdbClothcacheTaskqueueFaviconHandlerBackup = tq.faviconhandler
				}
				// Do not call the backup handler while ours is on — with settings forced
				// off it re-enables vanilla `shortcut icon` and races our overlay.
				tq.faviconhandler = function () { }
			}
			twdbRemoveClothcacheTaskqueueFaviconDom()
			if (typeof taskqueueFaviconCore !== "undefined" && taskqueueFaviconCore && typeof taskqueueFaviconCore.update === "function") {
				taskqueueFaviconCore.update()
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (
		!twdbClothcacheTaskqueueFaviconTwdsHookRegistered &&
		window.TWDS &&
		typeof window.TWDS.registerStartFunc === "function"
	) {
		twdbClothcacheTaskqueueFaviconTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbClothcacheTaskqueueFaviconTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}

/** Restore clothcache task-queue favicon after all ClothCalc favicon options are turned off. */
function twdbRestoreClothcacheTaskqueueFavicon() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheTaskqueueFaviconPrefsCaptured = false
		twdbClothcacheTaskqueueFaviconUserPrefs = Object.create(null)
		twdbClothcacheTaskqueueFaviconHandlerBackup = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.taskqueue) {
			twdbClothcacheTaskqueueFaviconPrefsCaptured = false
			twdbClothcacheTaskqueueFaviconUserPrefs = Object.create(null)
			twdbClothcacheTaskqueueFaviconHandlerBackup = null
			return
		}
		const tq = twds.taskqueue
		if (twdbClothcacheTaskqueueFaviconHandlerBackup) {
			tq.faviconhandler = twdbClothcacheTaskqueueFaviconHandlerBackup
			twdbClothcacheTaskqueueFaviconHandlerBackup = null
		}
		if (twds.settings && twdbClothcacheTaskqueueFaviconPrefsCaptured) {
			const p = twdbClothcacheTaskqueueFaviconUserPrefs
			twds.settings.taskqueue_length_in_favicon = p.taskqueue_length_in_favicon
			twds.settings.taskqueue_length0_in_favicon = p.taskqueue_length0_in_favicon
			twds.settings.taskqueue_sleep_in_favicon = p.taskqueue_sleep_in_favicon
			twds.settings.taskqueue_show_health_in_favicon = p.taskqueue_show_health_in_favicon
		}
		if (typeof tq.faviconhandler === "function") {
			tq.faviconhandler()
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheTaskqueueFaviconPrefsCaptured = false
	twdbClothcacheTaskqueueFaviconUserPrefs = Object.create(null)
}

function twdbSyncClothcacheTaskqueueFavicon() {
	if (twdbClothcacheTaskqueueFaviconAnyOursOn()) {
		twdbMitigateClothcacheTaskqueueFavicon()
	} else {
		twdbRestoreClothcacheTaskqueueFavicon()
	}
}

twdbRegisterExternalMitigation("taskqueue_length_in_favicon", twdbMitigateClothcacheTaskqueueFavicon)
twdbRegisterExternalMitigation("taskqueue_idle_in_favicon", twdbMitigateClothcacheTaskqueueFavicon)
twdbRegisterExternalMitigation("taskqueue_sleep_in_favicon", twdbMitigateClothcacheTaskqueueFavicon)

let twdbClothcacheTaskqueueLogsPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheTaskqueueLogsUserPref = null
let twdbClothcacheTaskqueueLogsTwdsHookRegistered = false
/** @type {Function|null} */
let twdbClothcacheNextactionUpdateBackup = null
/**
 * Clothcache shows next manual action below the task queue via `TWDS.settings.taskqueue_nextaction`.
 * Force it off while ClothCalc `taskqueue_logs` is enabled.
 */
function twdbMitigateClothcacheTaskqueueLogs() {
	if (!Settings.get("taskqueue_logs", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		try {
			const twds = window.TWDS
			if (!twds || !twds.settings || typeof twds.settings !== "object") {
				return
			}
			if (!twdbClothcacheTaskqueueLogsPrefCaptured) {
				const pref = twds.settings.taskqueue_nextaction
				twdbClothcacheTaskqueueLogsUserPref = typeof pref === "boolean" ? pref : true
				twdbClothcacheTaskqueueLogsPrefCaptured = true
			}
			twds.settings.taskqueue_nextaction = false
			if (typeof $ !== "undefined") {
				$("#ui_bottomright #TWDS_nextaction").remove()
			}
			const na = twds.nextaction
			if (na && typeof na.update === "function") {
				if (!twdbClothcacheNextactionUpdateBackup) {
					twdbClothcacheNextactionUpdateBackup = na.update
				}
				na.update = function () { }
				if (typeof twdbClothcacheNextactionUpdateBackup === "function") {
					try {
						twdbClothcacheNextactionUpdateBackup.call(na, true)
					} catch (_e2) {
						/* ignore */
					}
				}
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (
		!twdbClothcacheTaskqueueLogsTwdsHookRegistered &&
		window.TWDS &&
		typeof window.TWDS.registerStartFunc === "function"
	) {
		twdbClothcacheTaskqueueLogsTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbClothcacheTaskqueueLogsTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
function twdbRestoreClothcacheTaskqueueLogs() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheTaskqueueLogsPrefCaptured = false
		twdbClothcacheTaskqueueLogsUserPref = null
		twdbClothcacheNextactionUpdateBackup = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheTaskqueueLogsPrefCaptured = false
			twdbClothcacheTaskqueueLogsUserPref = null
			twdbClothcacheNextactionUpdateBackup = null
			return
		}
		if (twdbClothcacheTaskqueueLogsPrefCaptured) {
			twds.settings.taskqueue_nextaction = twdbClothcacheTaskqueueLogsUserPref
		}
		const na = twds.nextaction
		if (na && twdbClothcacheNextactionUpdateBackup) {
			na.update = twdbClothcacheNextactionUpdateBackup
			twdbClothcacheNextactionUpdateBackup = null
		}
		if (
			twdbClothcacheTaskqueueLogsPrefCaptured &&
			twdbClothcacheTaskqueueLogsUserPref &&
			na &&
			typeof na.queueupdate === "function"
		) {
			na.queueupdate()
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheTaskqueueLogsPrefCaptured = false
	twdbClothcacheTaskqueueLogsUserPref = null
}
function twdbSyncClothcacheTaskqueueLogs(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheTaskqueueLogs()
	} else {
		twdbRestoreClothcacheTaskqueueLogs()
	}
}
twdbRegisterExternalMitigation("taskqueue_logs", twdbMitigateClothcacheTaskqueueLogs)




let twdbClothcacheWofOktoberfestSpeedupPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheWofOktoberfestSpeedupUserPref = null
/**
 * Clothcache speeds up Oktoberfest `GambleWindow.animateIcons` via `TWDS.settings.misc_gamblewindow_speedup`
 * (string-rewrite + eval at register/callback time). Force the TWDS pref off while ClothCalc's
 * `wof_oktoberfest_speedup` is on so Clothcache does not (re)patch. Our snippet always rebuilds
 * from `_TWDS_backup_animateIcons` when present.
 */
function twdbMitigateClothcacheWofOktoberfestSpeedup() {
	if (!Settings.get("wof_oktoberfest_speedup", false)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	if (typeof twdbEnsureClothcacheFeatureGuards === "function") {
		twdbEnsureClothcacheFeatureGuards()
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheWofOktoberfestSpeedupPrefCaptured) {
			const pref = twds.settings.misc_gamblewindow_speedup
			twdbClothcacheWofOktoberfestSpeedupUserPref = typeof pref === "boolean" ? pref : false
			twdbClothcacheWofOktoberfestSpeedupPrefCaptured = true
		}
		twds.settings.misc_gamblewindow_speedup = false
		twdbForceClothcacheGatedCheckboxesOff()
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreClothcacheWofOktoberfestSpeedup() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheWofOktoberfestSpeedupPrefCaptured = false
		twdbClothcacheWofOktoberfestSpeedupUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheWofOktoberfestSpeedupPrefCaptured = false
			twdbClothcacheWofOktoberfestSpeedupUserPref = null
			return
		}
		if (twdbClothcacheWofOktoberfestSpeedupPrefCaptured) {
			twds.settings.misc_gamblewindow_speedup = twdbClothcacheWofOktoberfestSpeedupUserPref
			// Clothcache only patches in its setting callback; re-apply / restore animateIcons ourselves.
			const gw = window.GambleWindow
			if (gw && typeof gw._TWDS_backup_animateIcons === "function") {
				if (twdbClothcacheWofOktoberfestSpeedupUserPref) {
					const patchedSrc = gw._TWDS_backup_animateIcons
						.toString()
						.replace(/\b200\b/g, "20")
						.replace(/\b500\b/, "50")
					// eslint-disable-next-line no-eval
					eval("GambleWindow.animateIcons=" + patchedSrc)
				} else {
					gw.animateIcons = gw._TWDS_backup_animateIcons
				}
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheWofOktoberfestSpeedupPrefCaptured = false
	twdbClothcacheWofOktoberfestSpeedupUserPref = null
}
function twdbSyncClothcacheWofOktoberfestSpeedup(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheWofOktoberfestSpeedup()
	} else {
		twdbRestoreClothcacheWofOktoberfestSpeedup()
	}
}
twdbRegisterExternalMitigation("wof_oktoberfest_speedup", twdbMitigateClothcacheWofOktoberfestSpeedup)



let twdbClothcacheFortbattlePopupMovePrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheFortbattlePopupMoveUserPref = null
/**
 * Clothcache always replaces `FortBattleWindow.showCellPopupHtml5` with
 * `TWDS.fbmisc.showCellPopupHtml5`, which pins the popup to `divMain` top-left and
 * **never reads** `fbmisc_movepopup`. Forcing that pref off alone does nothing.
 * Gate their function to use real mouse coords (or skip corner-pin) while ClothCalc
 * owns fortbattle popup / move, then re-assert our outermost wrapper.
 */
function twdbGateClothcacheFbmiscShowCellPopupHtml5() {
	try {
		const twds = window.TWDS
		if (!twds || !twds.fbmisc || typeof twds.fbmisc.showCellPopupHtml5 !== "function") {
			return
		}
		const raw = twds.fbmisc.showCellPopupHtml5
		if (raw.__twdbFbmiscMoveGated) {
			return
		}
		const gated = function twdbGatedFbmiscShowCellPopupHtml5(x, y, cellIdx) {
			const oursDock =
				(typeof Settings !== "undefined" && Settings.get("fortbattle_popup", true)) ||
				(typeof Settings !== "undefined" && Settings.get("fortbattle_popup_move", true))
			const ccWantsMove = !!(twds.settings && twds.settings.fbmisc_movepopup)
			// ClothCalc docking or their pref off → never pin to window corner with fake clientX/Y
			if (oursDock || !ccWantsMove) {
				if (this.popup && this.popup.idx !== cellIdx) {
					this.changeCellPopupText(cellIdx)
				} else if (this.popup && typeof this.popup.updatePosition === "function") {
					this.popup.updatePosition({ clientX: x, clientY: y }, true)
				}
				return
			}
			return raw.apply(this, arguments)
		}
		gated.__twdbFbmiscMoveGated = true
		gated.__twdbFbmiscMoveRaw = raw
		twds.fbmisc.showCellPopupHtml5 = gated
		if (
			typeof FortBattleWindow !== "undefined" &&
			FortBattleWindow.showCellPopupHtml5 === raw
		) {
			FortBattleWindow.showCellPopupHtml5 = gated
		}
	} catch (_e) {
		/* ignore */
	}
}
/**
 * While ClothCalc `fortbattle_popup_move` or `fortbattle_popup` is on, force clothcache
 * `fbmisc_movepopup` off and gate their always-on showCellPopupHtml5 corner pin.
 */
function twdbMitigateClothcacheFortbattlePopupMove() {
	const oursMove = Settings.get("fortbattle_popup_move", true)
	const oursPopup = Settings.get("fortbattle_popup", true)
	if (!oursMove && !oursPopup) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheFortbattlePopupMovePrefCaptured) {
			const pref = twds.settings.fbmisc_movepopup
			twdbClothcacheFortbattlePopupMoveUserPref = typeof pref === "boolean" ? pref : true
			twdbClothcacheFortbattlePopupMovePrefCaptured = true
		}
		// Pref is cosmetic in clothcache (their patch ignores it); still force off for UI parity.
		if (oursMove || oursPopup) {
			twds.settings.fbmisc_movepopup = false
		}
	} catch (_e) {
		/* ignore */
	}
	twdbGateClothcacheFbmiscShowCellPopupHtml5()
	if (oursMove && typeof twdbInstallFortbattlePopupMovePatch === "function") {
		twdbInstallFortbattlePopupMovePatch()
	}
}
function twdbRestoreClothcacheFortbattlePopupMove() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheFortbattlePopupMovePrefCaptured = false
		twdbClothcacheFortbattlePopupMoveUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.fbmisc && typeof twds.fbmisc.showCellPopupHtml5 === "function") {
			const cur = twds.fbmisc.showCellPopupHtml5
			if (cur.__twdbFbmiscMoveGated && typeof cur.__twdbFbmiscMoveRaw === "function") {
				twds.fbmisc.showCellPopupHtml5 = cur.__twdbFbmiscMoveRaw
				if (
					typeof FortBattleWindow !== "undefined" &&
					FortBattleWindow.showCellPopupHtml5 === cur
				) {
					FortBattleWindow.showCellPopupHtml5 = cur.__twdbFbmiscMoveRaw
				}
			}
		}
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheFortbattlePopupMovePrefCaptured = false
			twdbClothcacheFortbattlePopupMoveUserPref = null
			return
		}
		if (twdbClothcacheFortbattlePopupMovePrefCaptured) {
			twds.settings.fbmisc_movepopup = twdbClothcacheFortbattlePopupMoveUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheFortbattlePopupMovePrefCaptured = false
	twdbClothcacheFortbattlePopupMoveUserPref = null
}
function twdbSyncClothcacheFortbattlePopupMove(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheFortbattlePopupMove()
		if (typeof snippetsFortbattlePopupMove === "function") {
			snippetsFortbattlePopupMove()
		}
	} else {
		// Keep clothcache gated while enriched fortbattle_popup is still on
		if (Settings.get("fortbattle_popup", true)) {
			twdbMitigateClothcacheFortbattlePopupMove()
			if (typeof twdbUninstallFortbattlePopupMove === "function") {
				twdbUninstallFortbattlePopupMove()
			}
			return
		}
		twdbRestoreClothcacheFortbattlePopupMove()
		if (typeof twdbUninstallFortbattlePopupMove === "function") {
			twdbUninstallFortbattlePopupMove()
		}
	}
}
twdbRegisterExternalMitigation("fortbattle_popup_move", twdbMitigateClothcacheFortbattlePopupMove)


let twdbClothcacheVipendtimePrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheVipendtimeUserPref = null
let twdbVipendtimeClothcacheTwdsHookRegistered = false
let twdbVipendtimeClothcacheGuardIntervalId = 0
/** @type {Function|null} */
let twdbClothcacheVipendtimeOriginalHandler = null
/**
 * Clothcache uses `TWDS.settings.vipendtime_show` and its own VIP overlay nodes (TWDS_* class).
 * Force clothcache off while ClothCalc `vipendtime_show` is enabled.
 */
function twdbMitigateClothcacheVipendtimeShow() {
	if (!Settings.get("vipendtime_show", false)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		try {
			const twds = window.TWDS
			if (!twds || !twds.settings || typeof twds.settings !== "object") {
				return
			}
			if (!twdbClothcacheVipendtimePrefCaptured) {
				const pref = twds.settings.vipendtime_show
				twdbClothcacheVipendtimeUserPref = typeof pref === "boolean" ? pref : false
				twdbClothcacheVipendtimePrefCaptured = true
			}
			const vip = twds.vipendtime
			if (vip && typeof vip === "object") {
				// Hard-disable clothcache's periodic writer while our feature is active.
				if (!twdbClothcacheVipendtimeOriginalHandler && typeof vip.handler === "function") {
					twdbClothcacheVipendtimeOriginalHandler = vip.handler
				}
				if (vip.interval) {
					window.clearInterval(vip.interval)
					vip.interval = 0
				}
				vip.handler = function () { }
			}
			twds.settings.vipendtime_show = false
			if (typeof $ !== "undefined") {
				$("#buffbars .buffbar_vip .bag_item_mini .TWDS_vipendtime").remove()
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (!twdbVipendtimeClothcacheTwdsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbVipendtimeClothcacheTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbVipendtimeClothcacheTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
	if (!twdbVipendtimeClothcacheGuardIntervalId) {
		twdbVipendtimeClothcacheGuardIntervalId = window.setInterval(run, 5000)
	}
}
function twdbRestoreClothcacheVipendtimeShow() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheVipendtimePrefCaptured = false
		twdbClothcacheVipendtimeUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheVipendtimePrefCaptured = false
			twdbClothcacheVipendtimeUserPref = null
			return
		}
		if (twdbClothcacheVipendtimePrefCaptured) {
			twds.settings.vipendtime_show = twdbClothcacheVipendtimeUserPref
		}
		const vip = twds.vipendtime
		if (vip && typeof vip === "object") {
			if (twdbClothcacheVipendtimeOriginalHandler) {
				vip.handler = twdbClothcacheVipendtimeOriginalHandler
			}
			if (vip.interval) {
				window.clearInterval(vip.interval)
				vip.interval = 0
			}
			if (twdbClothcacheVipendtimePrefCaptured && twdbClothcacheVipendtimeUserPref && typeof vip.handler === "function") {
				vip.handler()
				vip.interval = window.setInterval(vip.handler, 60 * 1000)
			}
		}
	} catch (_e) {
		/* ignore */
	}
	if (twdbVipendtimeClothcacheGuardIntervalId) {
		window.clearInterval(twdbVipendtimeClothcacheGuardIntervalId)
		twdbVipendtimeClothcacheGuardIntervalId = 0
	}
	twdbClothcacheVipendtimePrefCaptured = false
	twdbClothcacheVipendtimeUserPref = null
	twdbClothcacheVipendtimeOriginalHandler = null
}
function twdbSyncClothcacheVipendtimeShow(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheVipendtimeShow()
	} else {
		twdbRestoreClothcacheVipendtimeShow()
	}
}
twdbRegisterExternalMitigation("vipendtime_show", twdbMitigateClothcacheVipendtimeShow)


let twdbClothcacheTownwindowAlliancePrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheTownwindowAllianceUserPref = null
/**
 * Clothcache town-window alliance label is controlled by `TWDS.settings.townwindow_alliance`.
 * Force it off while ClothCalc `townwindow_alliance` is enabled to avoid duplicate labels.
 */
function twdbMitigateClothcacheTownwindowAlliance() {
	if (!Settings.get("townwindow_alliance", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheTownwindowAlliancePrefCaptured) {
			const pref = twds.settings.townwindow_alliance
			twdbClothcacheTownwindowAllianceUserPref = typeof pref === "boolean" ? pref : true
			twdbClothcacheTownwindowAlliancePrefCaptured = true
		}
		twds.settings.townwindow_alliance = false
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreClothcacheTownwindowAlliance() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheTownwindowAlliancePrefCaptured = false
		twdbClothcacheTownwindowAllianceUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheTownwindowAlliancePrefCaptured = false
			twdbClothcacheTownwindowAllianceUserPref = null
			return
		}
		if (twdbClothcacheTownwindowAlliancePrefCaptured) {
			twds.settings.townwindow_alliance = twdbClothcacheTownwindowAllianceUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheTownwindowAlliancePrefCaptured = false
	twdbClothcacheTownwindowAllianceUserPref = null
}
function twdbSyncClothcacheTownwindowAlliance(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheTownwindowAlliance()
	} else {
		twdbRestoreClothcacheTownwindowAlliance()
	}
}

let twdbTwirTownwindowAllianceHookRegistered = false
/** @type {Function|null} */
let twdbTwirTownwindowAllianceOriginalInit = null
/**
 * TWIR `fb_ali_name` wraps `TownWindow.init` and appends `.tow_forumlink` alliance UI.
 * Unwrap TWIR's init wrapper while ClothCalc `townwindow_alliance` is enabled.
 */
function twdbMitigateTwirTownwindowAlliance() {
	if (!Settings.get("townwindow_alliance", true)) {
		return
	}
	twdbMitigateTwirGatedFeature("fb_ali_name")
	try {
		if (typeof TownWindow !== "undefined") {
			// ClothCalc already wrapped TownWindow.init; never overwrite it.
			if (TownWindow.init && TownWindow.init.__twdbTownwindowAllianceWrapped) {
				return
			}
			if (!twdbTwirTownwindowAllianceOriginalInit && typeof TownWindow.twir_init === "function") {
				twdbTwirTownwindowAllianceOriginalInit = TownWindow.twir_init
			}
			if (
				typeof TownWindow.twir_init === "function" &&
				typeof TownWindow.init === "function" &&
				TownWindow.init !== TownWindow.twir_init
			) {
				TownWindow.init = TownWindow.twir_init
			}
		}
	} catch (_e) {
		/* ignore */
	}
	try {
		if (typeof $ !== "undefined") {
			$(".town-overview .tow_forumlink").remove()
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreTwirTownwindowAlliance() {
	try {
		if (window.TWIR && TWIR.Features && typeof TWIR.Features.update === "function") {
			TWIR.Features.update()
		}
	} catch (_e) {
		/* ignore */
	}
	try {
		if (
			typeof TownWindow !== "undefined" &&
			typeof TownWindow.init === "function" &&
			typeof twdbTwirTownwindowAllianceOriginalInit === "function"
		) {
			// If our mitigation forced vanilla init, restore the TWIR wrapper entrypoint.
			if (TownWindow.init === twdbTwirTownwindowAllianceOriginalInit) {
				TownWindow.init = twdbTwirTownwindowAllianceOriginalInit
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbTwirTownwindowAllianceOriginalInit = null
}
function twdbEnsureTownwindowAllianceHookAlive() {
	if (!Settings.get("townwindow_alliance", true)) {
		return
	}
	try {
		const initFn = typeof TownWindow !== "undefined" ? TownWindow.init : null
		if (typeof initFn === "function" && initFn.__twdbTownwindowAllianceWrapped) {
			return
		}
		if (typeof snippetsTownwindowAlliance === "function") {
			snippetsTownwindowAlliance()
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbMitigateTownwindowAllianceExternals() {
	twdbMitigateClothcacheTownwindowAlliance()
	twdbMitigateTwirTownwindowAlliance()
	twdbEnsureTownwindowAllianceHookAlive()
	if (!twdbTwirTownwindowAllianceHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbTwirTownwindowAllianceHookRegistered = true
		try {
			window.TWDS.registerStartFunc(function () {
				twdbMitigateTwirTownwindowAlliance()
				twdbEnsureTownwindowAllianceHookAlive()
			})
		} catch (_e) {
			twdbTwirTownwindowAllianceHookRegistered = false
		}
	}
	const run = function () {
		twdbMitigateTwirTownwindowAlliance()
		twdbEnsureTownwindowAllianceHookAlive()
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
function twdbSyncTownwindowAllianceExternals(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateTownwindowAllianceExternals()
	} else {
		twdbRestoreClothcacheTownwindowAlliance()
		twdbRestoreTwirTownwindowAlliance()
	}
}
twdbRegisterExternalMitigation("townwindow_alliance", twdbMitigateTownwindowAllianceExternals)

let twdbClothcacheProfileCraftPointsPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheProfileCraftPointsUserPref = null
let twdbProfileCraftPointsExternalHookRegistered = false
/**
 * Clothcache profile craft points uses `TWDS.settings.profilewindow_craftpoints`.
 * Force it off while ClothCalc `profile_craft_points` is enabled.
 */
function twdbMitigateClothcacheProfileCraftPoints() {
	if (!Settings.get("profile_craft_points", false)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheProfileCraftPointsPrefCaptured) {
			const pref = twds.settings.profilewindow_craftpoints
			twdbClothcacheProfileCraftPointsUserPref = typeof pref === "boolean" ? pref : true
			twdbClothcacheProfileCraftPointsPrefCaptured = true
		}
		twds.settings.profilewindow_craftpoints = false
		if (typeof $ !== "undefined") {
			$(".TWDS_craftpoints").remove()
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreClothcacheProfileCraftPoints() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheProfileCraftPointsPrefCaptured = false
		twdbClothcacheProfileCraftPointsUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheProfileCraftPointsPrefCaptured = false
			twdbClothcacheProfileCraftPointsUserPref = null
			return
		}
		if (twdbClothcacheProfileCraftPointsPrefCaptured) {
			twds.settings.profilewindow_craftpoints = twdbClothcacheProfileCraftPointsUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheProfileCraftPointsPrefCaptured = false
	twdbClothcacheProfileCraftPointsUserPref = null
}

function twdbMitigateTwirProfileCraftPoints() {
	if (!Settings.get("profile_craft_points", false)) {
		return
	}
	twdbMitigateTwirGatedFeature("prof_craft_points")
}
function twdbRestoreTwirProfileCraftPoints() {
	try {
		if (window.TWIR && TWIR.Features && typeof TWIR.Features.update === "function") {
			TWIR.Features.update()
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbMitigateProfileCraftPointsExternals() {
	const run = function () {
		twdbMitigateClothcacheProfileCraftPoints()
		twdbMitigateTwirProfileCraftPoints()
	}
	run()
	if (
		!twdbProfileCraftPointsExternalHookRegistered &&
		window.TWDS &&
		typeof window.TWDS.registerStartFunc === "function"
	) {
		twdbProfileCraftPointsExternalHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbProfileCraftPointsExternalHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
function twdbSyncProfileCraftPointsExternals(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateProfileCraftPointsExternals()
	} else {
		twdbRestoreClothcacheProfileCraftPoints()
		twdbRestoreTwirProfileCraftPoints()
	}
}
twdbRegisterExternalMitigation("profile_craft_points", twdbMitigateProfileCraftPointsExternals)

let twdbClothcacheFbCharIconsPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheFbCharIconsUserPref = null
/**
 * Clothcache wraps `renderChars` in `TWDS.fbmisc.renderchars` and, when `fbmisc_charicons` is on,
 * appends duplicate `.otherchar` nodes. Force off while ClothCalc `fortbattle_player_icons` is on.
 */
function twdbMitigateClothcacheFbCharIcons() {
	if (!Settings.get("fortbattle_player_icons", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheFbCharIconsPrefCaptured) {
			const pref = twds.settings.fbmisc_charicons
			twdbClothcacheFbCharIconsUserPref = typeof pref === "boolean" ? pref : true
			twdbClothcacheFbCharIconsPrefCaptured = true
		}
		twds.settings.fbmisc_charicons = false
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreClothcacheFbCharIcons() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheFbCharIconsPrefCaptured = false
		twdbClothcacheFbCharIconsUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheFbCharIconsPrefCaptured = false
			twdbClothcacheFbCharIconsUserPref = null
			return
		}
		if (twdbClothcacheFbCharIconsPrefCaptured) {
			twds.settings.fbmisc_charicons = twdbClothcacheFbCharIconsUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheFbCharIconsPrefCaptured = false
	twdbClothcacheFbCharIconsUserPref = null
}

/**
 * TW Fort Battle Tool (`twfortbattletool.js`) `TWFBT.PreBattleChars.init` sets `FortBattleWindow.renderChars_twfbt`
 * then replaces `renderChars` with a wrapper that does not call the backup. Only TWFBT uses `renderChars_twfbt`;
 * minified builds drop `getCharDiv` / `charClasses` strings — unwrap by reference, not substring heuristics.
 */
function twdbMitigateTwfbFortbattleToolCharIcons() {
	if (!Settings.get("fortbattle_player_icons", true)) {
		return
	}
	if (typeof FortBattleWindow === "undefined") {
		return
	}
	try {
		const currentRenderChars = FortBattleWindow.renderChars
		const priorRenderChars = FortBattleWindow.renderChars_twfbt
		if (typeof currentRenderChars !== "function" || typeof priorRenderChars !== "function") {
			return
		}
		if (currentRenderChars === priorRenderChars) {
			return
		}
		// Do not unwrap ClothCalc’s patched `renderChars` (minify drops `twdbFormatFbCharIcon` from .toString()).
		if (currentRenderChars["__twdbFbCharIconsPatched"]) {
			return
		}
		FortBattleWindow.renderChars = priorRenderChars
	} catch (_e) {
		/* ignore */
	}
}
/**
 * If `PreBattleChars.init` runs later (user build may uncomment it), skip installing the `renderChars` wrapper
 * while ClothCalc owns pre-battle icons.
 */
function twdbWrapTwfbPreBattleCharsInit() {
	if (!Settings.get("fortbattle_player_icons", true)) {
		return
	}
	try {
		const pb = window.TWFBT && window.TWFBT.PreBattleChars
		if (!pb || typeof pb.init !== "function" || pb.init.__twdbFbCharIconsWrapped) {
			return
		}
		const originalInit = pb.init
		pb.init = function twdbFbCharIconsTwfbPreBattleCharsInitWrapper() {
			if (Settings.get("fortbattle_player_icons", true)) {
				return
			}
			return originalInit.apply(this, arguments)
		}
		pb.init.__twdbFbCharIconsWrapped = true
	} catch (_e) {
		/* ignore */
	}
}

let twdbTwirFbCharIconsHookRegistered = false
function twdbMitigateTwirFbCharIcons() {
	if (!Settings.get("fortbattle_player_icons", true)) {
		return
	}
	twdbMitigateTwirGatedFeature("fb_char_icons")
	twdbMitigateClothcacheFbCharIcons()
	twdbWrapTwfbPreBattleCharsInit()
	twdbMitigateTwfbFortbattleToolCharIcons()
}
function twdbRestoreTwirFbCharIcons() {
	twdbRestoreClothcacheFbCharIcons()
	try {
		if (window.TWIR && TWIR.Features && typeof TWIR.Features.update === "function") {
			TWIR.Features.update()
		}
	} catch (_e) {
		/* ignore */
	}
	try {
		if (typeof FortBattleWindow !== "undefined" && FortBattleWindow.twdb_fbcharicons_vanillaFn) {
			FortBattleWindow.renderChars = FortBattleWindow.twdb_fbcharicons_vanillaFn
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbSyncTwirFbCharIcons(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateTwirFbCharIconsBundle()
	} else {
		twdbRestoreTwirFbCharIcons()
	}
}
function twdbMitigateTwirFbCharIconsBundle() {
	if (!Settings.get("fortbattle_player_icons", true)) {
		return
	}
	twdbMitigateTwirFbCharIcons()
	if (typeof twdbApplyFbCharIconsPatch === "function") {
		twdbApplyFbCharIconsPatch()
	}
	if (!twdbTwirFbCharIconsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbTwirFbCharIconsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(function () {
				twdbMitigateTwirFbCharIcons()
				if (typeof twdbApplyFbCharIconsPatch === "function") {
					twdbApplyFbCharIconsPatch()
				}
			})
		} catch (_e) {
			twdbTwirFbCharIconsHookRegistered = false
		}
	}
	const run = function () {
		twdbMitigateTwirFbCharIcons()
		if (typeof twdbApplyFbCharIconsPatch === "function") {
			twdbApplyFbCharIconsPatch()
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
	window.setTimeout(run, 4000)
	window.setTimeout(run, 8000)
}
twdbRegisterExternalMitigation("fortbattle_player_icons", twdbMitigateTwirFbCharIconsBundle)

let twdbClothcacheFbChattopicPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheFbChattopicUserPref = null
/**
 * Clothcache `fbmisc_chattopic` duplicates this pane; force off while ClothCalc `fortbattle_chat_topic` is on.
 */
function twdbMitigateClothcacheFbChattopic() {
	if (!Settings.get("fortbattle_chat_topic", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheFbChattopicPrefCaptured) {
			const pref = twds.settings.fbmisc_chattopic
			twdbClothcacheFbChattopicUserPref = typeof pref === "boolean" ? pref : true
			twdbClothcacheFbChattopicPrefCaptured = true
		}
		twds.settings.fbmisc_chattopic = false
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreClothcacheFbChattopic() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheFbChattopicPrefCaptured = false
		twdbClothcacheFbChattopicUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheFbChattopicPrefCaptured = false
			twdbClothcacheFbChattopicUserPref = null
			return
		}
		if (twdbClothcacheFbChattopicPrefCaptured) {
			twds.settings.fbmisc_chattopic = twdbClothcacheFbChattopicUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheFbChattopicPrefCaptured = false
	twdbClothcacheFbChattopicUserPref = null
}

/** @type {Function|null} */
let twdbTwirFbTopicSavedWrapper = null
/** @type {Function|null} */
let twdbTwirFbTopicSavedTwdsBackup = null
/**
 * TWIR `FortbattleChatTopic` wraps `renderPreBattle` once at init; `TWIR.Features.fb_topic` does not guard the wrapper body.
 * Strip the outer TWIR layer (restore `twir_renderPreBattle` as `renderPreBattle`) when its source still delegates there.
 * When clothcache loaded after TWIR, the TWIR wrapper may sit under `TWDS_backup_renderPreBattle` instead.
 */
function twdbMitigateTwirFbTopicUnwrap() {
	if (!Settings.get("fortbattle_chat_topic", true)) {
		return
	}
	twdbMitigateTwirGatedFeature("fb_topic")
	if (typeof FortBattleWindow === "undefined") {
		return
	}
	try {
		const inner = FortBattleWindow.twir_renderPreBattle
		const cur = FortBattleWindow.renderPreBattle
		const coordinatorKey =
			typeof TWDB_FB_RENDER_PREBATTLE_COORDINATOR_KEY !== "undefined"
				? TWDB_FB_RENDER_PREBATTLE_COORDINATOR_KEY
				: "__twdbFortBattleRenderPreBattleCoordinator"
		const isCoordinator =
			typeof twdbFortBattleRenderPreBattleCoordinator === "function" && cur === twdbFortBattleRenderPreBattleCoordinator
		const isCoordinatorMarked = cur && typeof cur === "function" && cur[coordinatorKey]
		if (!isCoordinator && !isCoordinatorMarked && typeof inner === "function" && typeof cur === "function" && cur !== inner) {
			const shouldUnwrap =
				cur === twdbTwirFbTopicSavedWrapper ||
				(!twdbTwirFbTopicSavedWrapper &&
					String(cur).indexOf("twir_renderPreBattle") !== -1 &&
					(typeof twdbFortbattleChatTopicRenderPreBattleWrapper !== "function" ||
						cur !== twdbFortbattleChatTopicRenderPreBattleWrapper))
			if (shouldUnwrap) {
				if (!twdbTwirFbTopicSavedWrapper) {
					twdbTwirFbTopicSavedWrapper = cur
				}
				FortBattleWindow.renderPreBattle = inner
				if (typeof twdbFortBattleRefreshRenderPreBattleChain === "function") {
					twdbFortBattleRefreshRenderPreBattleChain()
				}
			}
		}
	} catch (_e) {
		/* ignore */
	}
	try {
		const twdsBackup = FortBattleWindow.TWDS_backup_renderPreBattle
		const twirInner = FortBattleWindow.twir_renderPreBattle
		if (
			typeof twdsBackup === "function" &&
			typeof twirInner === "function" &&
			twdsBackup !== twirInner &&
			String(twdsBackup).indexOf("twir_renderPreBattle") !== -1
		) {
			if (!twdbTwirFbTopicSavedTwdsBackup) {
				twdbTwirFbTopicSavedTwdsBackup = twdsBackup
			}
			FortBattleWindow.TWDS_backup_renderPreBattle = twirInner
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreTwirFbTopicWrap() {
	try {
		if (twdbTwirFbTopicSavedTwdsBackup && typeof FortBattleWindow !== "undefined") {
			FortBattleWindow.TWDS_backup_renderPreBattle = twdbTwirFbTopicSavedTwdsBackup
		}
	} catch (_e) {
		/* ignore */
	}
	twdbTwirFbTopicSavedTwdsBackup = null
	try {
		if (
			twdbTwirFbTopicSavedWrapper &&
			typeof FortBattleWindow !== "undefined" &&
			typeof FortBattleWindow.twir_renderPreBattle === "function" &&
			FortBattleWindow.renderPreBattle === FortBattleWindow.twir_renderPreBattle
		) {
			FortBattleWindow.renderPreBattle = twdbTwirFbTopicSavedWrapper
		}
	} catch (_e) {
		/* ignore */
	}
	twdbTwirFbTopicSavedWrapper = null
	try {
		if (window.TWIR && TWIR.Features && typeof TWIR.Features.update === "function") {
			TWIR.Features.update()
		}
	} catch (_e) {
		/* ignore */
	}
}

function twdbRestoreFortbattleChatTopicExternals() {
	twdbRestoreClothcacheFbChattopic()
	twdbRestoreTwirFbTopicWrap()
}

let twdbFortbattleChatTopicMitigationHookRegistered = false
function twdbMitigateFortbattleChatTopicExternalsBundle() {
	if (!Settings.get("fortbattle_chat_topic", true)) {
		return
	}
	twdbMitigateClothcacheFbChattopic()
	twdbMitigateTwirFbTopicUnwrap()
	if (typeof twdbFortBattleRefreshRenderPreBattleChain === "function") {
		twdbFortBattleRefreshRenderPreBattleChain()
	}
	if (!twdbFortbattleChatTopicMitigationHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbFortbattleChatTopicMitigationHookRegistered = true
		try {
			window.TWDS.registerStartFunc(function () {
				twdbMitigateClothcacheFbChattopic()
				twdbMitigateTwirFbTopicUnwrap()
			})
		} catch (_e) {
			twdbFortbattleChatTopicMitigationHookRegistered = false
		}
	}
	const run = function () {
		twdbMitigateClothcacheFbChattopic()
		twdbMitigateTwirFbTopicUnwrap()
		if (typeof twdbFortBattleRefreshRenderPreBattleChain === "function") {
			twdbFortBattleRefreshRenderPreBattleChain()
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
twdbRegisterExternalMitigation("fortbattle_chat_topic", twdbMitigateFortbattleChatTopicExternalsBundle)

let twdbTwToolkitFbPopupRetryTimer = null
let twdbTwToolkitFbPopupPrefCaptured = false
/** @type {boolean} */
let twdbTwToolkitFbPopupUserPref = true
let twdbFortbattlePopupMitigationHookRegistered = false

/** TW Battle Toolkit `fb_popup` — runtime override only (do not write localStorage). */
function twdbMitigateTwToolkitFbPopup() {
	if (!Settings.get("fortbattle_popup", true)) {
		return
	}
	twdbEnsureExternalStorageGateWrap()
	twdbEnsureTwToolkitOpenWindowWrap()
	const attempt = () => {
		const tk = window.TWBattleToolkit
		if (!tk || !tk.preferences || typeof tk.preferences !== "object") {
			return false
		}
		try {
			if (!twdbTwToolkitFbPopupPrefCaptured) {
				try {
					const raw = localStorage.getItem("TWBattleToolkit_preferences")
					if (raw && raw.indexOf("{") === 0) {
						const storage = JSON.parse(raw)
						if (typeof storage.fb_popup === "boolean") {
							twdbTwToolkitFbPopupUserPref = storage.fb_popup
						}
					} else if (typeof tk.preferences.fb_popup === "boolean") {
						twdbTwToolkitFbPopupUserPref = tk.preferences.fb_popup
					}
				} catch (_e) {
					/* ignore */
				}
				twdbTwToolkitFbPopupPrefCaptured = true
				if (typeof twdbToolkitGetGatePref("fb_popup") !== "boolean") {
					twdbToolkitSetGatePref("fb_popup", twdbTwToolkitFbPopupUserPref)
				}
			}
			tk.preferences.fb_popup = false
			twdbEnsureTwToolkitOpenWindowWrap()
			twdbTwToolkitForceGatedCheckboxesOff()
			twdbHookTwToolkitPrefsUi()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbTwToolkitFbPopupRetryTimer !== null) {
			clearInterval(twdbTwToolkitFbPopupRetryTimer)
			twdbTwToolkitFbPopupRetryTimer = null
		}
		return
	}
	if (twdbTwToolkitFbPopupRetryTimer !== null) {
		return
	}
	let attempts = 0
	twdbTwToolkitFbPopupRetryTimer = setInterval(() => {
		attempts++
		if (attempt() || attempts >= 40) {
			clearInterval(twdbTwToolkitFbPopupRetryTimer)
			twdbTwToolkitFbPopupRetryTimer = null
		}
	}, 250)
}

function twdbRestoreTwToolkitFbPopup() {
	try {
		const tk = window.TWBattleToolkit
		if (!tk || !tk.preferences || typeof tk.preferences !== "object") {
			twdbTwToolkitFbPopupPrefCaptured = false
			return
		}
		if (twdbTwToolkitFbPopupPrefCaptured) {
			tk.preferences.fb_popup = twdbTwToolkitFbPopupUserPref
			if (
				twdbTwToolkitFbPopupUserPref &&
				tk.fbPopup &&
				typeof tk.fbPopup.init === "function"
			) {
				try {
					tk.fbPopup.init()
				} catch (_e) {
					/* Toolkit may need a full reload */
				}
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbTwToolkitFbPopupPrefCaptured = false
}

function twdbMitigateFortbattlePopupExternalsBundle() {
	if (!Settings.get("fortbattle_popup", true)) {
		return
	}
	twdbMitigateTwirGatedFeature("fb_online_status")
	twdbMitigateTwirGatedFeature("fb_ranks")
	twdbMitigateTwToolkitFbPopup()
	// Clothcache always corner-pins showCellPopupHtml5 (ignores fbmisc_movepopup) — gate it
	twdbMitigateClothcacheFortbattlePopupMove()
	if (typeof twdbInstallFortbattlePopupPatches === "function") {
		twdbInstallFortbattlePopupPatches()
	}
	if (
		!twdbFortbattlePopupMitigationHookRegistered &&
		window.TWDS &&
		typeof window.TWDS.registerStartFunc === "function"
	) {
		twdbFortbattlePopupMitigationHookRegistered = true
		try {
			window.TWDS.registerStartFunc(function () {
				twdbMitigateTwirGatedFeature("fb_online_status")
				twdbMitigateTwirGatedFeature("fb_ranks")
				twdbMitigateTwToolkitFbPopup()
				twdbMitigateClothcacheFortbattlePopupMove()
				if (typeof twdbInstallFortbattlePopupPatches === "function") {
					twdbInstallFortbattlePopupPatches()
				}
			})
		} catch (_e) {
			twdbFortbattlePopupMitigationHookRegistered = false
		}
	}
	const run = function () {
		twdbMitigateTwirGatedFeature("fb_online_status")
		twdbMitigateTwirGatedFeature("fb_ranks")
		twdbMitigateTwToolkitFbPopup()
		twdbMitigateClothcacheFortbattlePopupMove()
		if (typeof twdbInstallFortbattlePopupPatches === "function") {
			twdbInstallFortbattlePopupPatches()
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
	window.setTimeout(run, 4000)
}

function twdbRestoreFortbattlePopupExternals() {
	try {
		if (window.TWIR && TWIR.Features && typeof TWIR.Features.update === "function") {
			TWIR.Features.update()
		}
	} catch (_e) {
		/* ignore */
	}
	twdbRestoreTwToolkitFbPopup()
	if (typeof twdbUninstallFortbattlePopupPatches === "function") {
		twdbUninstallFortbattlePopupPatches()
	}
}

function twdbSyncFortbattlePopupExternals(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateFortbattlePopupExternalsBundle()
	} else {
		twdbRestoreFortbattlePopupExternals()
	}
}

twdbRegisterExternalMitigation("fortbattle_popup", twdbMitigateFortbattlePopupExternalsBundle)

let twdbClothcacheFortbattleBetterCtrlPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheFortbattleBetterCtrlUserPref = null
/**
 * Clothcache fort pre-battle layer toggles (`fbmisc_controlbuttons`) conflict with ClothCalc’s
 * implementation — force off while `fortbattle_better_control_buttons` is on.
 */
function twdbMitigateClothcacheFortbattleBetterControlButtons() {
	if (!Settings.get("fortbattle_better_control_buttons", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheFortbattleBetterCtrlPrefCaptured) {
			const pref = twds.settings.fbmisc_controlbuttons
			twdbClothcacheFortbattleBetterCtrlUserPref = typeof pref === "boolean" ? pref : true
			twdbClothcacheFortbattleBetterCtrlPrefCaptured = true
		}
		twds.settings.fbmisc_controlbuttons = false
	} catch (_e) {
		/* ignore */
	}
}
function twdbRestoreClothcacheFortbattleBetterControlButtons() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheFortbattleBetterCtrlPrefCaptured = false
		twdbClothcacheFortbattleBetterCtrlUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheFortbattleBetterCtrlPrefCaptured = false
			twdbClothcacheFortbattleBetterCtrlUserPref = null
			return
		}
		if (twdbClothcacheFortbattleBetterCtrlPrefCaptured) {
			twds.settings.fbmisc_controlbuttons = twdbClothcacheFortbattleBetterCtrlUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheFortbattleBetterCtrlPrefCaptured = false
	twdbClothcacheFortbattleBetterCtrlUserPref = null
}
let twdbFortbattleBetterCtrlTwdsHookRegistered = false
function twdbMitigateClothcacheFortbattleBetterControlButtonsBundle() {
	if (!Settings.get("fortbattle_better_control_buttons", true)) {
		return
	}
	twdbMitigateClothcacheFortbattleBetterControlButtons()
	if (typeof twdbApplyFortbattleBetterControlButtonsPatch === "function") {
		twdbApplyFortbattleBetterControlButtonsPatch()
	}
	if (!twdbFortbattleBetterCtrlTwdsHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbFortbattleBetterCtrlTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(function () {
				twdbMitigateClothcacheFortbattleBetterControlButtons()
				if (typeof twdbApplyFortbattleBetterControlButtonsPatch === "function") {
					twdbApplyFortbattleBetterControlButtonsPatch()
				}
			})
		} catch (_e) {
			twdbFortbattleBetterCtrlTwdsHookRegistered = false
		}
	}
	const run = function () {
		twdbMitigateClothcacheFortbattleBetterControlButtons()
		if (typeof twdbApplyFortbattleBetterControlButtonsPatch === "function") {
			twdbApplyFortbattleBetterControlButtonsPatch()
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
function twdbSyncClothcacheFortbattleBetterControlButtons(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateClothcacheFortbattleBetterControlButtonsBundle()
	} else {
		if (typeof twdbRemoveFortbattleBetterControlButtonsPatch === "function") {
			twdbRemoveFortbattleBetterControlButtonsPatch()
		}
		twdbRestoreClothcacheFortbattleBetterControlButtons()
	}
}
twdbRegisterExternalMitigation(
	"fortbattle_better_control_buttons",
	twdbMitigateClothcacheFortbattleBetterControlButtonsBundle
)

let twdbNotificationsMaxCountClothcacheTwdsHookRegistered = false
function twdbNotificationsMaxCountClampFromSettings() {
	const raw = Settings.get("notifications_max_count", 4)
	const n = Number(raw)
	const x = Number.isFinite(n) ? Math.floor(n) : 4
	return Math.max(2, Math.min(8, x || 4))
}
/**
 * Clothcache uses `TWDS.settings.misc_notibar_main_max` with the same `setMaxView` cap.
 * Mirror ClothCalc’s value into TWDS (and re-apply) so late clothcache callbacks stay aligned.
 */
function twdbMitigateClothcacheNotificationsMaxCount() {
	const run = function () {
		try {
			const v = twdbNotificationsMaxCountClampFromSettings()
			const twds = window.TWDS
			if (twds && twds.settings && typeof twds.settings === "object") {
				twds.settings.misc_notibar_main_max = v
			}
			if (typeof snippetsNotificationsMaxCountApply === "function") {
				snippetsNotificationsMaxCountApply(v)
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (
		!twdbNotificationsMaxCountClothcacheTwdsHookRegistered &&
		window.TWDS &&
		typeof window.TWDS.registerStartFunc === "function"
	) {
		twdbNotificationsMaxCountClothcacheTwdsHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbNotificationsMaxCountClothcacheTwdsHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
twdbRegisterExternalMitigation("notifications_max_count", twdbMitigateClothcacheNotificationsMaxCount)

let twdbEssentialsMitigationGetFeatureWrapped = false
let twdbEssentialsMitigationUpdateFeatWrapped = false

function twdbReadTwltBool(key, defaultValue) {
	try {
		const raw = localStorage.getItem("TWLT")
		if (raw && raw.indexOf("{") === 0) {
			const data = JSON.parse(raw)
			if (typeof data[key] === "boolean") {
				return data[key]
			}
		}
	} catch (_e) {
		/* ignore */
	}
	try {
		const twx = window.TWX
		if (twx && twx.Data && typeof twx.Data[key] === "boolean") {
			return twx.Data[key]
		}
		if (twx && twx.Features && typeof twx.Features[key] === "boolean") {
			return twx.Features[key]
		}
	} catch (_e) {
		/* ignore */
	}
	return defaultValue
}

function twdbReadTwirFeatureBool(key, defaultValue) {
	try {
		const raw = localStorage.getItem("twir_features")
		if (raw && raw.indexOf("{") === 0) {
			const features = JSON.parse(raw)
			if (typeof features[key] === "boolean") {
				return features[key]
			}
		}
	} catch (_e) {
		/* ignore */
	}
	try {
		if (window.TWIR && TWIR.Features && typeof TWIR.Features[key] === "boolean") {
			return TWIR.Features[key]
		}
	} catch (_e) {
		/* ignore */
	}
	return defaultValue
}

function twdbItemTooltipEnhancementActive() {
	return Settings.get("item_tooltip_v2", true)
}

function twdbEnsureEssentialsMitigationGetFeatureWrap() {
	const twx = window.TWX
	if (!twx || !twx.Skript || typeof twx.Skript.getFeature !== "function") {
		return
	}
	if (twdbEssentialsMitigationGetFeatureWrapped) {
		return
	}
	const origGetFeature = twx.Skript.getFeature
	twx.Skript.getFeature = function (name) {
		if (typeof twdbEssentialsTwltKeyBlocked === "function" && twdbEssentialsTwltKeyBlocked(name)) {
			return false
		}
		return origGetFeature.apply(this, arguments)
	}
	twdbEssentialsMitigationGetFeatureWrapped = true
}

function twdbEssentialsApplyUpdateFeatMitigation(twx) {
	if (!twx || typeof twx.Data !== "object" || twx.Data === null) {
		return
	}
	twdbForceEssentialsGatedDataOff()
	if (twdbItemTooltipEnhancementActive()) {
		const loaded = twx.loaded
		if (Array.isArray(loaded) && loaded.includes("ShortPopups")) {
			loaded.splice(loaded.indexOf("ShortPopups"), 1)
		}
		if (typeof twdbUnwrapExternalItemPopupLayers === "function") {
			twdbUnwrapExternalItemPopupLayers()
		}
	}
	if (Settings.get("map_job_owned_count", true)) {
		const loaded = twx.loaded
		if (Array.isArray(loaded) && loaded.includes("JobProducts")) {
			loaded.splice(loaded.indexOf("JobProducts"), 1)
		}
		if (typeof twdbReassertMapJobPopupOwnedCountHook === "function") {
			twdbReassertMapJobPopupOwnedCountHook()
		}
	}
	if (typeof twdbEssentialsApplyPortedFeaturesMitigation === "function") {
		twdbEssentialsApplyPortedFeaturesMitigation(twx)
	}
	if (Settings.get("improved_market", false)) {
		const loaded = twx.loaded
		if (Array.isArray(loaded) && loaded.includes("MarketRights")) {
			loaded.splice(loaded.indexOf("MarketRights"), 1)
		}
		if (typeof twdbNeutralizeEssentialsMarketRights === "function") {
			twdbNeutralizeEssentialsMarketRights()
		}
	}
	if (Settings.get("auto_deposit", false)) {
		const loaded = twx.loaded
		if (Array.isArray(loaded) && loaded.includes("MarketMessage")) {
			loaded.splice(loaded.indexOf("MarketMessage"), 1)
		}
		if (typeof twdbNeutralizeEssentialsMarketMessage === "function") {
			twdbNeutralizeEssentialsMarketMessage()
		}
	}
}

function twdbEnsureEssentialsMitigationUpdateFeatWrap() {
	const twx = window.TWX
	if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
		return
	}
	if (twdbEssentialsMitigationUpdateFeatWrapped) {
		return
	}
	const origUpdateFeat = twx.Skript.updateFeat
	twx.Skript.updateFeat = function () {
		const result = origUpdateFeat.apply(this, arguments)
		try {
			twdbEssentialsApplyUpdateFeatMitigation(twx)
		} catch (_e) {
			/* ignore */
		}
		return result
	}
	twdbEssentialsMitigationUpdateFeatWrapped = true
}

function twdbEssentialsReinitFeature() {
	const twx = window.TWX
	if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
		return
	}
	try {
		twx.Skript.updateFeat()
	} catch (_e) {
		/* ignore */
	}
}

let twdbEssentialsEquipManagerPlusRetryTimer = null
let twdbEssentialsEquipManagerPlusPrefCaptured = false
/** @type {boolean} */
let twdbEssentialsEquipManagerPlusUserPref = true
/**
 * Peel Essentials `method_twx` without assigning our `__twdb*` backup as current (that drops our wrap).
 * If ours is on top, repoint the backup past `_twx`; otherwise restore current from `_twx`.
 */
function twdbPeelEssentialsTwxHook(obj, methodName, ourBackupKey, oursMarkers) {
	if (!obj || typeof obj[`${methodName}_twx`] !== "function") {
		return false
	}
	const twxKey = `${methodName}_twx`
	try {
		const currentSrc =
			typeof obj[methodName] === "function" ? Function.prototype.toString.call(obj[methodName]) : ""
		let oursOnTop = false
		if (ourBackupKey && typeof obj[ourBackupKey] === "function" && Array.isArray(oursMarkers)) {
			for (let i = 0; i < oursMarkers.length; i++) {
				if (oursMarkers[i] && currentSrc.indexOf(oursMarkers[i]) >= 0) {
					oursOnTop = true
					break
				}
			}
		}
		if (oursOnTop) {
			obj[ourBackupKey] = obj[twxKey]
		} else {
			obj[methodName] = obj[twxKey]
		}
		delete obj[twxKey]
		return true
	} catch (_e) {
		return false
	}
}

function twdbEnsureEssentialsFeatureInitGuard(featureKey, isBlockedFn) {
	const twx = window.TWX
	const feat = twx?.[featureKey]
	if (!feat || typeof feat.init !== "function") {
		return false
	}
	if (feat.init.__twdbEssentialsGuard) {
		return true
	}
	const origInit = feat.init.__twdbOrigInit || feat.init
	const guarded = function () {
		if (typeof isBlockedFn === "function" && isBlockedFn()) {
			return
		}
		return origInit.apply(this, arguments)
	}
	guarded.__twdbEssentialsGuard = true
	guarded.__twdbOrigInit = origInit
	feat.init = guarded
	return true
}

/**
 * TW Essentials EquipManagerPlus shares `*_twx` backup names with our feature. Never restore from
 * `*_twx` / delete `__twdbEquipManagerPlus` while ours is installed — peel Essentials only.
 */
function twdbNeutralizeEssentialsEquipManagerPlusHooks() {
	if (typeof EquipManager === "undefined") {
		return
	}
	try {
		const ours = !!EquipManager.__twdbEquipManagerPlus
		const showSrc =
			typeof EquipManager.showPopup === "function"
				? Function.prototype.toString.call(EquipManager.showPopup)
				: ""
		const listSrc =
			typeof EquipManager.buildEquipList === "function"
				? Function.prototype.toString.call(EquipManager.buildEquipList)
				: ""
		const essentialsShowOnTop = showSrc.indexOf("equip_used") >= 0
		const essentialsListOnTop =
			listSrc.indexOf("buildEquipList_twx") >= 0 && listSrc.indexOf("__twdbEquipManager") < 0

		if (ours) {
			if (essentialsShowOnTop && typeof EquipManager.__twdbEquipManagerShowPopup === "function") {
				EquipManager.showPopup = function () {
					EquipManager.__twdbEquipManagerShowPopup.apply(this, arguments)
					if (typeof twdbScheduleEquipManagerEnhance === "function") {
						twdbScheduleEquipManagerEnhance()
					}
				}
			} else if (essentialsShowOnTop && typeof EquipManager.showPopup_twx === "function") {
				EquipManager.showPopup = EquipManager.showPopup_twx
			}
			if (essentialsListOnTop && typeof EquipManager.__twdbEquipManagerBuildEquipList === "function") {
				EquipManager.buildEquipList = EquipManager.__twdbEquipManagerBuildEquipList
			} else if (essentialsListOnTop && typeof EquipManager.buildEquipList_twx === "function") {
				EquipManager.buildEquipList = EquipManager.buildEquipList_twx
			}
			if (typeof EquipManager.showPopup_twx === "function") {
				const twxShowSrc = Function.prototype.toString.call(EquipManager.showPopup_twx)
				if (twxShowSrc.indexOf("equip_used") >= 0 || EquipManager.showPopup_twx === EquipManager.showPopup) {
					delete EquipManager.showPopup_twx
				}
			}
			if (typeof EquipManager.buildEquipList_twx === "function") {
				const twxListSrc = Function.prototype.toString.call(EquipManager.buildEquipList_twx)
				if (
					(twxListSrc.indexOf("renameEquip") >= 0 && twxListSrc.indexOf("__twdb") < 0) ||
					EquipManager.buildEquipList_twx === EquipManager.buildEquipList
				) {
					delete EquipManager.buildEquipList_twx
				}
			}
			return
		}

		if (typeof EquipManager.showPopup_twx === "function") {
			EquipManager.showPopup = EquipManager.showPopup_twx
			delete EquipManager.showPopup_twx
		}
		if (typeof EquipManager.buildEquipList_twx === "function") {
			EquipManager.buildEquipList = EquipManager.buildEquipList_twx
			delete EquipManager.buildEquipList_twx
		}
		delete EquipManager.renameEquip
	} catch (_e) {
		/* ignore */
	}
}

/**
 * TWX essentials `EquipManagerPlus` duplicates ClothCalc `equip_manager_plus`. When ours is on:
 * keep the TWX feature off in `TWX.Data`, wrap `updateFeat` so it stays off, and if essentials already
 * initialized, revert `EquipManager` patches and drop `EquipManagerPlus` from `TWX.loaded`.
 */
function twdbMitigateEssentialsEquipManagerPlus() {
	if (!Settings.get("equip_manager_plus", true)) {
		return
	}
	const attempt = () => {
		const twx = window.TWX
		if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
			return false
		}
		try {
			twdbEnsureEssentialsMitigationGetFeatureWrap()
			twdbEnsureEssentialsMitigationUpdateFeatWrap()
			twdbEnsureEssentialsFeatureGuards()
			if (typeof twx.Data !== "object" || twx.Data === null) {
				twx.Data = {}
			}
			if (!twdbEssentialsEquipManagerPlusPrefCaptured) {
				twdbEssentialsEquipManagerPlusUserPref = twdbReadTwltBool("EquipManagerPlus", true)
				twdbEssentialsEquipManagerPlusPrefCaptured = true
			}
			twx.Data.EquipManagerPlus = false
			twdbEnsureEssentialsFeatureInitGuard("EquipManagerPlus", () => Settings.get("equip_manager_plus", true))
			twdbNeutralizeEssentialsEquipManagerPlusHooks()
			const loaded = twx.loaded
			if (Array.isArray(loaded) && loaded.includes("EquipManagerPlus")) {
				const i = loaded.indexOf("EquipManagerPlus")
				if (i !== -1) {
					loaded.splice(i, 1)
				}
			}
			twdbForceEssentialsGatedCheckboxesOff()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbEssentialsEquipManagerPlusRetryTimer !== null) {
			clearInterval(twdbEssentialsEquipManagerPlusRetryTimer)
			twdbEssentialsEquipManagerPlusRetryTimer = null
		}
		return
	}
	if (twdbEssentialsEquipManagerPlusRetryTimer !== null) {
		return
	}
	let n = 0
	twdbEssentialsEquipManagerPlusRetryTimer = setInterval(() => {
		n++
		if (attempt() || n >= 40) {
			clearInterval(twdbEssentialsEquipManagerPlusRetryTimer)
			twdbEssentialsEquipManagerPlusRetryTimer = null
		}
	}, 250)
}

function twdbRestoreEssentialsEquipManagerPlus() {
	try {
		const twx = window.TWX
		if (!twx || typeof twx.Data !== "object" || twx.Data === null) {
			twdbEssentialsEquipManagerPlusPrefCaptured = false
			return
		}
		if (twdbEssentialsEquipManagerPlusPrefCaptured) {
			twx.Data.EquipManagerPlus = twdbEssentialsEquipManagerPlusUserPref
			if (twdbEssentialsEquipManagerPlusUserPref) {
				twdbEssentialsReinitFeature()
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbEssentialsEquipManagerPlusPrefCaptured = false
}

function twdbSyncEssentialsEquipManagerPlus(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateEssentialsEquipManagerPlus()
	} else {
		twdbRestoreEssentialsEquipManagerPlus()
	}
}

twdbRegisterExternalMitigation("equip_manager_plus", twdbMitigateEssentialsEquipManagerPlus)

let twdbEssentialsJobProductsRetryTimer = null
let twdbEssentialsJobProductsPrefCaptured = false
/** @type {boolean} */
let twdbEssentialsJobProductsUserPref = true

function twdbMitigateEssentialsJobProducts() {
	if (!Settings.get("map_job_owned_count", true)) {
		return
	}
	const attempt = () => {
		const twx = window.TWX
		if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
			return false
		}
		try {
			twdbEnsureEssentialsMitigationGetFeatureWrap()
			twdbEnsureEssentialsMitigationUpdateFeatWrap()
			twdbEnsureEssentialsFeatureGuards()
			if (typeof twx.Data !== "object" || twx.Data === null) {
				twx.Data = {}
			}
			if (!twdbEssentialsJobProductsPrefCaptured) {
				twdbEssentialsJobProductsUserPref = twdbReadTwltBool("JobProducts", true)
				twdbEssentialsJobProductsPrefCaptured = true
			}
			twx.Data.JobProducts = false
			twdbEnsureEssentialsFeatureInitGuard("JobProducts", () => Settings.get("map_job_owned_count", true))
			const loaded = twx.loaded
			const handler = window.GameMap?.PopupHandler
			if (Array.isArray(loaded) && loaded.includes("JobProducts")) {
				const index = loaded.indexOf("JobProducts")
				if (index !== -1) {
					loaded.splice(index, 1)
				}
			}
			if (handler && typeof twdbReassertMapJobPopupOwnedCountHook === "function") {
				twdbReassertMapJobPopupOwnedCountHook()
			}
			twdbForceEssentialsGatedCheckboxesOff()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbEssentialsJobProductsRetryTimer !== null) {
			clearInterval(twdbEssentialsJobProductsRetryTimer)
			twdbEssentialsJobProductsRetryTimer = null
		}
		return
	}
	if (twdbEssentialsJobProductsRetryTimer !== null) {
		return
	}
	let attempts = 0
	twdbEssentialsJobProductsRetryTimer = setInterval(() => {
		attempts++
		if (attempt() || attempts >= 40) {
			clearInterval(twdbEssentialsJobProductsRetryTimer)
			twdbEssentialsJobProductsRetryTimer = null
		}
	}, 250)
}

function twdbRestoreEssentialsJobProducts() {
	try {
		const twx = window.TWX
		if (!twx || typeof twx.Data !== "object" || twx.Data === null) {
			twdbEssentialsJobProductsPrefCaptured = false
			return
		}
		if (twdbEssentialsJobProductsPrefCaptured) {
			twx.Data.JobProducts = twdbEssentialsJobProductsUserPref
			if (twdbEssentialsJobProductsUserPref) {
				twdbEssentialsReinitFeature()
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbEssentialsJobProductsPrefCaptured = false
}

function twdbSyncEssentialsJobProducts(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateEssentialsJobProducts()
	} else {
		twdbRestoreEssentialsJobProducts()
	}
}

let twdbEssentialsMarketRightsRetryTimer = null
let twdbEssentialsMarketRightsPrefCaptured = false
/** @type {boolean} */
let twdbEssentialsMarketRightsUserPref = true

/**
 * TW Essentials `MarketRights` duplicates ClothCalc `improved_market` (rights icons on market offers).
 */
function twdbNeutralizeEssentialsMarketRights() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const sell = root.MarketWindow?.Sell
	const buy = root.MarketWindow?.Buy
	twdbPeelEssentialsTwxHook(sell, "updateTable", "updateTable_backup", [
		"twdbApplyImprovedMarketRights",
		"getRights",
		"twdb_improved_market_rights",
	])
	twdbPeelEssentialsTwxHook(buy, "updateTable", "updateTable_backup", [
		"twdbApplyImprovedMarketRights",
		"reworkMarketReport",
		"twdb_improved_market_rights",
	])
}

function twdbMitigateEssentialsMarketRights() {
	if (!Settings.get("improved_market", false)) {
		return
	}
	const attempt = () => {
		const twx = window.TWX
		if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
			return false
		}
		try {
			twdbEnsureEssentialsFeatureGuards()
			twdbEnsureEssentialsMitigationGetFeatureWrap()
			twdbEnsureEssentialsMitigationUpdateFeatWrap()
			if (typeof twx.Data !== "object" || twx.Data === null) {
				twx.Data = {}
			}
			if (!twdbEssentialsMarketRightsPrefCaptured) {
				twdbEssentialsMarketRightsUserPref = twdbReadTwltBool("MarketRights", true)
				twdbEssentialsMarketRightsPrefCaptured = true
			}
			twx.Data.MarketRights = false
			twdbEnsureEssentialsFeatureInitGuard("MarketRights", () => Settings.get("improved_market", false))
			const loaded = twx.loaded
			if (Array.isArray(loaded) && loaded.includes("MarketRights")) {
				loaded.splice(loaded.indexOf("MarketRights"), 1)
			}
			twdbNeutralizeEssentialsMarketRights()
			twdbForceEssentialsGatedCheckboxesOff()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbEssentialsMarketRightsRetryTimer !== null) {
			clearInterval(twdbEssentialsMarketRightsRetryTimer)
			twdbEssentialsMarketRightsRetryTimer = null
		}
		return
	}
	if (twdbEssentialsMarketRightsRetryTimer !== null) {
		return
	}
	let attempts = 0
	twdbEssentialsMarketRightsRetryTimer = setInterval(() => {
		attempts++
		if (attempt() || attempts >= 40) {
			clearInterval(twdbEssentialsMarketRightsRetryTimer)
			twdbEssentialsMarketRightsRetryTimer = null
		}
	}, 250)
}

function twdbRestoreEssentialsMarketRights() {
	try {
		const twx = window.TWX
		if (!twx || typeof twx.Data !== "object" || twx.Data === null) {
			twdbEssentialsMarketRightsPrefCaptured = false
			return
		}
		if (twdbEssentialsMarketRightsPrefCaptured) {
			twx.Data.MarketRights = twdbEssentialsMarketRightsUserPref
			if (twdbEssentialsMarketRightsUserPref) {
				twdbEssentialsReinitFeature()
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbEssentialsMarketRightsPrefCaptured = false
}

function twdbSyncEssentialsMarketRights(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateEssentialsMarketRights()
	} else {
		twdbRestoreEssentialsMarketRights()
	}
}

twdbRegisterExternalMitigation("improved_market", twdbMitigateEssentialsMarketRights)

let twdbEssentialsMarketMessageRetryTimer = null
let twdbEssentialsMarketMessagePrefCaptured = false
/** @type {boolean} */
let twdbEssentialsMarketMessageUserPref = true
let twdbEssentialsMarketMessageListenWrapped = false

/**
 * Essentials MarketMessage registers a closed-over `position_change` listener.
 * Wrap `EventHandler.listen` so that callback is gated (works for future + already-queued
 * registrations if we install before Essentials init; also re-wraps via source match).
 */
function twdbIsEssentialsMarketMessagePositionCallback(callback) {
	if (typeof callback !== "function") {
		return false
	}
	try {
		const src = Function.prototype.toString.call(callback)
		return (
			src.indexOf("market_town_id") >= 0 &&
			(src.indexOf("fetch_offers") >= 0 || src.indexOf("get_aucts") >= 0 || src.indexOf("fetch_town") >= 0)
		)
	} catch (_e) {
		return false
	}
}

function twdbEnsureEssentialsMarketMessageListenWrap() {
	if (twdbEssentialsMarketMessageListenWrapped) {
		return true
	}
	if (typeof EventHandler === "undefined" || typeof EventHandler.listen !== "function") {
		return false
	}
	if (EventHandler.listen.__twdbMarketMessageGate) {
		twdbEssentialsMarketMessageListenWrapped = true
		return true
	}
	try {
		const origListen = EventHandler.listen
		EventHandler.listen = function (signal, callback, context, opts) {
			const isPos =
				signal === "position_change" ||
				(Array.isArray(signal) && signal.indexOf("position_change") >= 0)
			if (isPos && twdbIsEssentialsMarketMessagePositionCallback(callback)) {
				const gated = function () {
					if (Settings.get("auto_deposit", false)) {
						return
					}
					return callback.apply(this, arguments)
				}
				gated.__twdbEssentialsMarketMessageOrig = callback
				return origListen.call(this, signal, gated, context, opts)
			}
			return origListen.apply(this, arguments)
		}
		EventHandler.listen.__twdbMarketMessageGate = true
		EventHandler.listen.__twdbOrigListen = origListen
		twdbEssentialsMarketMessageListenWrapped = true
	} catch (_e) {
		return false
	}
	return true
}

/**
 * Strip already-registered Essentials MarketMessage listeners (closure `listener` is private,
 * so walk via a temporary listen/unlisten probe is impossible — instead re-signal is N/A.
 * Best-effort: if Essentials stored nothing public, init-guard + listen wrap cover the common path.
 * When `TWX.MarketMessage` exists and was loaded, force Data off so updateFeat won't re-arm.
 */
function twdbNeutralizeEssentialsMarketMessage() {
	twdbEnsureEssentialsMarketMessageListenWrap()
	try {
		const twx = window.TWX
		if (twx && typeof twx.Data === "object" && twx.Data !== null) {
			twx.Data.MarketMessage = false
		}
	} catch (_e) {
		/* ignore */
	}
}

/**
 * TW Essentials `MarketMessage` duplicates ClothCalc `auto_deposit` town-arrival market pickup.
 */
function twdbMitigateEssentialsMarketMessage() {
	if (!Settings.get("auto_deposit", false)) {
		return
	}
	const attempt = () => {
		const twx = window.TWX
		if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
			twdbEnsureEssentialsMarketMessageListenWrap()
			return !!(typeof EventHandler !== "undefined" && EventHandler.listen?.__twdbMarketMessageGate)
		}
		try {
			twdbEnsureEssentialsFeatureGuards()
			twdbEnsureEssentialsMitigationGetFeatureWrap()
			twdbEnsureEssentialsMitigationUpdateFeatWrap()
			twdbEnsureEssentialsMarketMessageListenWrap()
			if (typeof twx.Data !== "object" || twx.Data === null) {
				twx.Data = {}
			}
			if (!twdbEssentialsMarketMessagePrefCaptured) {
				twdbEssentialsMarketMessageUserPref = twdbReadTwltBool("MarketMessage", true)
				twdbEssentialsMarketMessagePrefCaptured = true
			}
			twx.Data.MarketMessage = false
			twdbEnsureEssentialsFeatureInitGuard("MarketMessage", () => Settings.get("auto_deposit", false))
			const loaded = twx.loaded
			if (Array.isArray(loaded) && loaded.includes("MarketMessage")) {
				loaded.splice(loaded.indexOf("MarketMessage"), 1)
			}
			twdbNeutralizeEssentialsMarketMessage()
			twdbForceEssentialsGatedCheckboxesOff()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbEssentialsMarketMessageRetryTimer !== null) {
			clearInterval(twdbEssentialsMarketMessageRetryTimer)
			twdbEssentialsMarketMessageRetryTimer = null
		}
		return
	}
	if (twdbEssentialsMarketMessageRetryTimer !== null) {
		return
	}
	let attempts = 0
	twdbEssentialsMarketMessageRetryTimer = setInterval(() => {
		attempts++
		if (attempt() || attempts >= 40) {
			clearInterval(twdbEssentialsMarketMessageRetryTimer)
			twdbEssentialsMarketMessageRetryTimer = null
		}
	}, 250)
}

function twdbRestoreEssentialsMarketMessage() {
	try {
		const twx = window.TWX
		if (!twx || typeof twx.Data !== "object" || twx.Data === null) {
			twdbEssentialsMarketMessagePrefCaptured = false
			return
		}
		if (twdbEssentialsMarketMessagePrefCaptured) {
			twx.Data.MarketMessage = twdbEssentialsMarketMessageUserPref
			if (twdbEssentialsMarketMessageUserPref) {
				twdbEssentialsReinitFeature()
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbEssentialsMarketMessagePrefCaptured = false
}

function twdbSyncEssentialsMarketMessage(oursEnabled) {
	if (oursEnabled) {
		twdbMitigateEssentialsMarketMessage()
	} else {
		twdbRestoreEssentialsMarketMessage()
	}
}

let twdbClothcacheBankingAutoHometownPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheBankingAutoHometownUserPref = null
/** @type {ReturnType<typeof setInterval> | null} */
let twdbClothcacheBankingAutoHometownRetryTimer = null

/**
 * Clothcache `banking_auto_hometown` duplicates ClothCalc `auto_deposit` home-arrival deposit prompt.
 * Force the TWDS pref off and unlisten its `position_change` handler.
 */
function twdbMitigateClothcacheBankingAutoHometown() {
	if (!Settings.get("auto_deposit", false)) {
		return
	}
	const attempt = () => {
		if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
			return false
		}
		try {
			if (typeof twdbEnsureClothcacheFeatureGuards === "function") {
				twdbEnsureClothcacheFeatureGuards()
			}
			const twds = window.TWDS
			if (!twds || !twds.settings || typeof twds.settings !== "object") {
				return false
			}
			if (!twdbClothcacheBankingAutoHometownPrefCaptured) {
				const pref = twds.settings.banking_auto_hometown
				twdbClothcacheBankingAutoHometownUserPref = typeof pref === "boolean" ? pref : false
				twdbClothcacheBankingAutoHometownPrefCaptured = true
			}
			twds.settings.banking_auto_hometown = false
			if (twds.banking && typeof twds.banking.autohome_toggle === "function") {
				twds.banking.autohome_toggle(false)
			} else if (twds.banking && typeof twds.banking.autohome_check === "function") {
				EventHandler.unlisten("position_change", twds.banking.autohome_check)
			}
			twdbForceClothcacheGatedCheckboxesOff()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbClothcacheBankingAutoHometownRetryTimer !== null) {
			clearInterval(twdbClothcacheBankingAutoHometownRetryTimer)
			twdbClothcacheBankingAutoHometownRetryTimer = null
		}
		return
	}
	if (twdbClothcacheBankingAutoHometownRetryTimer !== null) {
		return
	}
	let attempts = 0
	twdbClothcacheBankingAutoHometownRetryTimer = setInterval(() => {
		attempts++
		if (attempt() || attempts >= 40) {
			clearInterval(twdbClothcacheBankingAutoHometownRetryTimer)
			twdbClothcacheBankingAutoHometownRetryTimer = null
		}
	}, 250)
}

function twdbRestoreClothcacheBankingAutoHometown() {
	if (twdbClothcacheBankingAutoHometownRetryTimer !== null) {
		clearInterval(twdbClothcacheBankingAutoHometownRetryTimer)
		twdbClothcacheBankingAutoHometownRetryTimer = null
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheBankingAutoHometownPrefCaptured = false
		twdbClothcacheBankingAutoHometownUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheBankingAutoHometownPrefCaptured = false
			twdbClothcacheBankingAutoHometownUserPref = null
			return
		}
		if (twdbClothcacheBankingAutoHometownPrefCaptured) {
			twds.settings.banking_auto_hometown = twdbClothcacheBankingAutoHometownUserPref
			if (
				twdbClothcacheBankingAutoHometownUserPref &&
				twds.banking &&
				typeof twds.banking.autohome_toggle === "function"
			) {
				twds.banking.autohome_toggle(true)
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheBankingAutoHometownPrefCaptured = false
	twdbClothcacheBankingAutoHometownUserPref = null
}

function twdbMitigateAutoDepositExternals() {
	twdbMitigateEssentialsMarketMessage()
	twdbMitigateClothcacheBankingAutoHometown()
}

function twdbSyncAutoDepositExternals(oursEnabled) {
	twdbSyncEssentialsMarketMessage(oursEnabled)
	if (oursEnabled) {
		twdbMitigateClothcacheBankingAutoHometown()
	} else {
		twdbRestoreClothcacheBankingAutoHometown()
	}
}

twdbRegisterExternalMitigation("auto_deposit", twdbMitigateAutoDepositExternals)

let twdbClothcacheBankingDepositButtonPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheBankingDepositButtonUserPref = null
/** @type {ReturnType<typeof setInterval> | null} */
let twdbClothcacheBankingDepositButtonRetryTimer = null
let twdbClothcacheDepositInitWrapped = false

/**
 * Prevent TWDS `banking.depositinit` from reinstalling `#deposit.onclick` while our `deposit` is on.
 */
function twdbEnsureClothcacheDepositInitWrap() {
	const twds = window.TWDS
	if (!twds || !twds.banking || typeof twds.banking.depositinit !== "function") {
		return false
	}
	if (twdbClothcacheDepositInitWrapped || twds.banking.depositinit.__twdbDepositGate) {
		twdbClothcacheDepositInitWrapped = true
		return true
	}
	try {
		const origInit = twds.banking.depositinit
		twds.banking.depositinit = function () {
			if (Settings.get("deposit", true)) {
				try {
					twds.settings.banking_deposit_button = false
				} catch (_e) {
					/* ignore */
				}
				const depositEl = document.querySelector("#deposit")
				if (depositEl) {
					delete depositEl.onclick
				}
				if (typeof bindBankTopbarDepositClick === "function") {
					bindBankTopbarDepositClick()
				}
				return
			}
			return origInit.apply(this, arguments)
		}
		twds.banking.depositinit.__twdbDepositGate = true
		twds.banking.depositinit.__twdbOrig = origInit
		twdbClothcacheDepositInitWrapped = true
	} catch (_e2) {
		return false
	}
	return true
}

/**
 * Clothcache `banking_deposit_button` duplicates ClothCalc `deposit` (top-bar `#deposit` click).
 * Force the TWDS pref off, wrap `depositinit`, and exclusively own `#deposit.onclick`.
 */
function twdbMitigateClothcacheBankingDepositButton() {
	if (!Settings.get("deposit", true)) {
		return
	}
	const attempt = () => {
		if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
			return false
		}
		try {
			if (typeof twdbEnsureClothcacheFeatureGuards === "function") {
				twdbEnsureClothcacheFeatureGuards()
			}
			const twds = window.TWDS
			if (!twds || !twds.settings || typeof twds.settings !== "object") {
				return false
			}
			if (!twdbClothcacheBankingDepositButtonPrefCaptured) {
				const pref = twds.settings.banking_deposit_button
				twdbClothcacheBankingDepositButtonUserPref = typeof pref === "boolean" ? pref : true
				twdbClothcacheBankingDepositButtonPrefCaptured = true
			}
			twds.settings.banking_deposit_button = false
			twdbEnsureClothcacheDepositInitWrap()
			const depositEl = document.querySelector("#deposit")
			if (depositEl) {
				delete depositEl.onclick
			}
			if (twds.banking && typeof twds.banking.depositinit === "function") {
				twds.banking.depositinit()
			}
			if (typeof bindBankTopbarDepositClick === "function") {
				bindBankTopbarDepositClick()
			}
			twdbForceClothcacheGatedCheckboxesOff()
		} catch (_e) {
			/* ignore */
		}
		return twdbClothcacheDepositInitWrapped || !!(window.TWDS && window.TWDS.banking)
	}
	if (attempt() && twdbClothcacheDepositInitWrapped) {
		if (twdbClothcacheBankingDepositButtonRetryTimer !== null) {
			clearInterval(twdbClothcacheBankingDepositButtonRetryTimer)
			twdbClothcacheBankingDepositButtonRetryTimer = null
		}
		return
	}
	if (twdbClothcacheBankingDepositButtonRetryTimer !== null) {
		return
	}
	let attempts = 0
	twdbClothcacheBankingDepositButtonRetryTimer = setInterval(() => {
		attempts++
		if ((attempt() && twdbClothcacheDepositInitWrapped) || attempts >= 40) {
			clearInterval(twdbClothcacheBankingDepositButtonRetryTimer)
			twdbClothcacheBankingDepositButtonRetryTimer = null
		}
	}, 250)
}

function twdbRestoreClothcacheBankingDepositButton() {
	if (twdbClothcacheBankingDepositButtonRetryTimer !== null) {
		clearInterval(twdbClothcacheBankingDepositButtonRetryTimer)
		twdbClothcacheBankingDepositButtonRetryTimer = null
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheBankingDepositButtonPrefCaptured = false
		twdbClothcacheBankingDepositButtonUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheBankingDepositButtonPrefCaptured = false
			twdbClothcacheBankingDepositButtonUserPref = null
			return
		}
		if (twdbClothcacheBankingDepositButtonPrefCaptured) {
			twds.settings.banking_deposit_button = twdbClothcacheBankingDepositButtonUserPref
			if (twds.banking && typeof twds.banking.depositinit === "function") {
				twds.banking.depositinit()
			}
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheBankingDepositButtonPrefCaptured = false
	twdbClothcacheBankingDepositButtonUserPref = null
}

twdbRegisterExternalMitigation("deposit", twdbMitigateClothcacheBankingDepositButton)

/**
 * TWIR `Features` keys gated while overlapping ClothCalc settings are on.
 * `settings`: [settingId, defaultOn][] — blocked if any listed setting is enabled.
 * `warn`: message flavor for UserMessage when the player tries to re-enable in TWIR UI.
 */
function twdbMitigateTwcalcQuestKbLink() {
	if (!Settings.get("quest_util_kb_link", false)) {
		return
	}
	const attempt = () => {
		try {
			return twdbEnsureQuestUtilKbLinkPostRenderDedupe()
		} catch (_e) {
			return false
		}
	}
	if (attempt()) {
		if (twdbTwcalcQuestKbLinkRetryTimer !== null) {
			clearInterval(twdbTwcalcQuestKbLinkRetryTimer)
			twdbTwcalcQuestKbLinkRetryTimer = null
		}
		return
	}
	if (twdbTwcalcQuestKbLinkRetryTimer !== null) {
		return
	}
	let n = 0
	twdbTwcalcQuestKbLinkRetryTimer = setInterval(() => {
		n++
		if (attempt() || n >= 40) {
			clearInterval(twdbTwcalcQuestKbLinkRetryTimer)
			twdbTwcalcQuestKbLinkRetryTimer = null
		}
	}, 250)
}
twdbRegisterExternalMitigation("quest_util_kb_link", twdbMitigateTwcalcQuestKbLink)

function twdbStripTwcalcShopIconFromMinimapHtml(html) {
	if (!html || !Settings.get("quest_util_shop", false)) {
		return html
	}
	return String(html).replace(
		/<span class="tw2gui-iconset tw2gui-icon-home"[^>]*onclick="TW_Calc\.openShopWindowByItemId\(\d+\)"[^>]*>\s*<\/span>/gi,
		""
	)
}

function twdbIsTwcalcQuestGetMinimapLinkMitigationWrap(fn) {
	return (
		fn === twdbTwcalcQuestGetMinimapLinkMitigationFn ||
		fn === twdbTwcalcQuestGetMinimapLinkPostMitigationFn
	)
}

/** Outermost `Quest.getMinimapLink` wrap: TW-Calc home icon vs ClothCalc `quest_util_shop`. */
function twdbEnsureTwcalcQuestGetMinimapLinkMitigationWrap() {
	if (typeof Quest === "undefined" || typeof Quest.getMinimapLink !== "function") {
		return false
	}
	if (!Settings.get("quest_util_shop", false)) {
		return true
	}
	const current = Quest.getMinimapLink
	if (current === twdbTwcalcQuestGetMinimapLinkPostMitigationFn) {
		return true
	}
	if (!twdbTwcalcQuestGetMinimapLinkMitigationFn) {
		twdbTwcalcQuestGetMinimapLinkMitigationFn = function (req) {
			let html = twdbTwcalcQuestGetMinimapLinkMitigationFn.__twdbInner.apply(this, arguments)
			html = twdbStripTwcalcShopIconFromMinimapHtml(html)
			return html
		}
		twdbTwcalcQuestGetMinimapLinkMitigationFn.__twdbTwcalcQuestGetMinimapLinkMitigation = true
		twdbTwcalcQuestGetMinimapLinkMitigationFn.__twdbInner = current
		Quest.getMinimapLink = twdbTwcalcQuestGetMinimapLinkMitigationFn
		return true
	}
	if (current === twdbTwcalcQuestGetMinimapLinkMitigationFn) {
		return true
	}
	if (!twdbTwcalcQuestGetMinimapLinkPostMitigationFn) {
		twdbTwcalcQuestGetMinimapLinkPostMitigationFn = function (req) {
			let html = twdbTwcalcQuestGetMinimapLinkPostMitigationFn.__twdbInner.apply(this, arguments)
			html = twdbStripTwcalcShopIconFromMinimapHtml(html)
			return html
		}
		twdbTwcalcQuestGetMinimapLinkPostMitigationFn.__twdbTwcalcQuestGetMinimapLinkPostMitigation = true
	}
	if (current === twdbTwcalcQuestGetMinimapLinkPostMitigationFn) {
		return true
	}
	if (twdbIsTwcalcQuestGetMinimapLinkMitigationWrap(current)) {
		return true
	}
	twdbTwcalcQuestGetMinimapLinkPostMitigationFn.__twdbInner = current
	Quest.getMinimapLink = twdbTwcalcQuestGetMinimapLinkPostMitigationFn
	return true
}

/** Neutralize TW-Calc `Quest.getMinimapLink` shop icon while `quest_util_shop` is on. */
function twdbMitigateTwcalcQuestShopMinimapLink() {
	if (!Settings.get("quest_util_shop", false)) {
		return
	}
	const attempt = () => {
		try {
			return twdbEnsureTwcalcQuestGetMinimapLinkMitigationWrap()
		} catch (_e) {
			return false
		}
	}
	if (attempt()) {
		if (twdbTwcalcQuestUtilRetryTimer !== null) {
			clearInterval(twdbTwcalcQuestUtilRetryTimer)
			twdbTwcalcQuestUtilRetryTimer = null
		}
		return
	}
	if (twdbTwcalcQuestUtilRetryTimer !== null) {
		return
	}
	let n = 0
	twdbTwcalcQuestUtilRetryTimer = setInterval(() => {
		n++
		if (attempt() || n >= 40) {
			clearInterval(twdbTwcalcQuestUtilRetryTimer)
			twdbTwcalcQuestUtilRetryTimer = null
		}
	}, 250)
}

let twdbClothcacheQuestUtilRetryTimer = null
let twdbClothcacheQuestUtilPrefCaptured = false
/** @type {boolean|null} */
let twdbClothcacheQuestAddUtilButtonsUserPref = null
/** @type {boolean|null} */
let twdbClothcacheQuestShowItemcountUserPref = null

/**
 * Clothcache `quest_add_util_buttons` / `quest_show_itemcount` duplicate ClothCalc row quest utils
 * (craft, market, shop, wear, item count). Force off while any matching `quest_util_*` row feature is on.
 */
function twdbMitigateClothcacheQuestUtilButtons() {
	if (!twdbQuestUtilRowFeatureEnabledForMitigation()) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			return
		}
		if (!twdbClothcacheQuestUtilPrefCaptured) {
			const utilPref = twds.settings.quest_add_util_buttons
			const countPref = twds.settings.quest_show_itemcount
			twdbClothcacheQuestAddUtilButtonsUserPref = typeof utilPref === "boolean" ? utilPref : false
			twdbClothcacheQuestShowItemcountUserPref = typeof countPref === "boolean" ? countPref : false
			twdbClothcacheQuestUtilPrefCaptured = true
		}
		twds.settings.quest_add_util_buttons = false
		twds.settings.quest_show_itemcount = false
	} catch (_e) {
		/* ignore */
	}
}

function twdbRestoreClothcacheQuestUtilButtons() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		twdbClothcacheQuestUtilPrefCaptured = false
		twdbClothcacheQuestAddUtilButtonsUserPref = null
		twdbClothcacheQuestShowItemcountUserPref = null
		return
	}
	try {
		const twds = window.TWDS
		if (!twds || !twds.settings || typeof twds.settings !== "object") {
			twdbClothcacheQuestUtilPrefCaptured = false
			twdbClothcacheQuestAddUtilButtonsUserPref = null
			twdbClothcacheQuestShowItemcountUserPref = null
			return
		}
		if (twdbClothcacheQuestUtilPrefCaptured) {
			twds.settings.quest_add_util_buttons = twdbClothcacheQuestAddUtilButtonsUserPref
			twds.settings.quest_show_itemcount = twdbClothcacheQuestShowItemcountUserPref
		}
	} catch (_e) {
		/* ignore */
	}
	twdbClothcacheQuestUtilPrefCaptured = false
	twdbClothcacheQuestAddUtilButtonsUserPref = null
	twdbClothcacheQuestShowItemcountUserPref = null
}

function twdbMitigateClothcacheQuestUtilButtonsWithRetry() {
	twdbMitigateClothcacheQuestUtilButtons()
	if (twdbClothcacheQuestUtilRetryTimer !== null) {
		return
	}
	let n = 0
	twdbClothcacheQuestUtilRetryTimer = setInterval(() => {
		n++
		twdbMitigateClothcacheQuestUtilButtons()
		if (n >= 40) {
			clearInterval(twdbClothcacheQuestUtilRetryTimer)
			twdbClothcacheQuestUtilRetryTimer = null
		}
	}, 250)
}
function twdbMitigateQuestUtilShopExternalsWithRetry() {
	twdbMitigateTwcalcQuestShopMinimapLink()
	twdbMitigateClothcacheQuestUtilButtonsWithRetry()
}
twdbRegisterExternalMitigation("quest_util_craft", twdbMitigateClothcacheQuestUtilButtonsWithRetry)
twdbRegisterExternalMitigation("quest_util_market", twdbMitigateClothcacheQuestUtilButtonsWithRetry)
twdbRegisterExternalMitigation("quest_util_shop", twdbMitigateQuestUtilShopExternalsWithRetry)
twdbRegisterExternalMitigation("quest_util_wear", twdbMitigateClothcacheQuestUtilButtonsWithRetry)
twdbRegisterExternalMitigation("quest_util_itemcount", twdbMitigateClothcacheQuestUtilButtonsWithRetry)

/** @type {ReturnType<typeof setInterval> | null} */
let twdbActiveFortbattleCountMitigationRetryTimer = null
/**
 * Peel Clothcache `.TWDS_fbcount` + stop its poll; gate TWIR `fb_count` and clear its dock badge.
 */
function twdbMitigateActiveFortbattleCountExternals() {
	if (!Settings.get("active_fortbattle_count", true)) {
		return
	}
	twdbMitigateTwirGatedFeature("fb_count")
	if (typeof twdbIsClothcachePresent === "function" && twdbIsClothcachePresent()) {
		try {
			const twds = window.TWDS
			if (twds && twds.settings && typeof twds.settings === "object") {
				twds.settings.fbmisc_fbcount = false
			}
			if (twds && twds.fbmisc) {
				if (twds.fbmisc.shownumberinterval) {
					window.clearInterval(twds.fbmisc.shownumberinterval)
					twds.fbmisc.shownumberinterval = 0
				}
				if (typeof twds.fbmisc.shownumberstarter === "function") {
					twds.fbmisc.shownumberstarter()
				}
			}
			$(".TWDS_fbcount").remove()
		} catch (_e) {
			/* ignore */
		}
	}
	try {
		$("#ui_bottombar .ui_bottombar_wrapper .button .dock-image > div").filter(function () {
			const bg = this.style && this.style.background
			return bg && bg.indexOf("level_bg.png") !== -1
		}).remove()
	} catch (_e2) {
		/* ignore */
	}
	if (twdbActiveFortbattleCountMitigationRetryTimer !== null) {
		return
	}
	let n = 0
	twdbActiveFortbattleCountMitigationRetryTimer = setInterval(function () {
		n++
		twdbMitigateTwirGatedFeature("fb_count")
		try {
			$(".TWDS_fbcount").remove()
		} catch (_e3) {
			/* ignore */
		}
		if (n >= 24) {
			clearInterval(twdbActiveFortbattleCountMitigationRetryTimer)
			twdbActiveFortbattleCountMitigationRetryTimer = null
		}
	}, 500)
}
twdbRegisterExternalMitigation("active_fortbattle_count", twdbMitigateActiveFortbattleCountExternals)

/**
 * Clothcache `fbmisc_walk` always rewrites waytimes in `showTab` (setting is unused).
 * Restore `TWDS_backup_showTab`, gate TWIR travel button; our snippet strips TWIR createContent.
 */
function twdbMitigateFortbattleWaytimeExternals() {
	if (!Settings.get("fortbattle_waytime", true)) {
		return
	}
	twdbMitigateTwirGatedFeature("fb_travel_button")
	if (typeof twdbIsClothcachePresent === "function" && twdbIsClothcachePresent()) {
		try {
			const twds = window.TWDS
			if (twds && twds.settings && typeof twds.settings === "object") {
				twds.settings.fbmisc_walk = false
			}
			if (
				typeof FortOverviewWindow !== "undefined" &&
				typeof FortOverviewWindow.TWDS_backup_showTab === "function"
			) {
				const cur = FortOverviewWindow.showTab
				const clothFn = twds && twds.fbmisc && twds.fbmisc.fortoverviewshowtab
				if (cur === clothFn || (cur && cur.__twdb_fortbattle_waytime_showtab)) {
					FortOverviewWindow.showTab = FortOverviewWindow.TWDS_backup_showTab
				}
			}
			if (typeof snippetsFortbattleWaytime === "function") {
				snippetsFortbattleWaytime()
			}
		} catch (_e) {
			/* ignore */
		}
	}
	if (typeof snippetsFortbattleWaytime === "function") {
		try {
			snippetsFortbattleWaytime()
		} catch (_e2) {
			/* ignore */
		}
	}
}
twdbRegisterExternalMitigation("fortbattle_waytime", twdbMitigateFortbattleWaytimeExternals)

/**
 * Clothcache `no_jobgroup_animation` replaces Radialmenu open/close; restore backup then re-apply ours.
 */
function twdbMitigateClothcacheNoJobgroupAnimation() {
	if (!Settings.get("no_jobgroup_animation", false)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.settings && typeof twds.settings === "object") {
			twds.settings.no_jobgroup_animation = false
		}
		const proto = window.GameMap && GameMap.Radialmenu && GameMap.Radialmenu.prototype
		if (!proto) {
			return
		}
		const clothOpen = twds && twds.map && twds.map.radialmenu_open
		if (clothOpen && proto.open === clothOpen && typeof proto._TWDS_map_backup_open === "function") {
			proto.open = proto._TWDS_map_backup_open
			proto.close = proto._TWDS_map_backup_close
			delete proto._twdbRadialmenuOpenBackup
			delete proto._twdbRadialmenuCloseBackup
		}
		if (typeof snippetsNoJobgroupAnimation === "function") {
			snippetsNoJobgroupAnimation()
		}
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("no_jobgroup_animation", twdbMitigateClothcacheNoJobgroupAnimation)

/**
 * Clothcache always replaces `QuestWindow.cancelQuest` (setting unused). Peel to `_TWDS_backup_cancelQuest`
 * then re-install ClothCalc confirm dialog.
 */
function twdbMitigateClothcacheQuestCancel() {
	if (!Settings.get("quest_cancel", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.settings && typeof twds.settings === "object") {
			twds.settings.quest_cancel_question = false
		}
		if (typeof QuestWindow !== "undefined" && typeof QuestWindow._TWDS_backup_cancelQuest === "function") {
			QuestWindow.cancelQuest = QuestWindow._TWDS_backup_cancelQuest
		}
		if (typeof injectQuestCancelDialog === "function" && !QuestWindow.cancelQuest.__twdb_quest_cancel) {
			injectQuestCancelDialog()
		}
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("quest_cancel", twdbMitigateClothcacheQuestCancel)

/**
 * Clothcache `upshop_sell_max_minus_1` (mobile trader) + `town_shop_maxminus1` (town shop)
 * add max-1 sell UI. Force both off while ClothCalc `collector_sell` is enabled.
 */
function twdbMitigateClothcacheUpshopSellMaxMinus1() {
	if (!Settings.get("collector_sell", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.settings && typeof twds.settings === "object") {
			twds.settings.upshop_sell_max_minus_1 = false
			twds.settings.town_shop_maxminus1 = false
		}
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("collector_sell", twdbMitigateClothcacheUpshopSellMaxMinus1)

/** Gate Clothcache finishable coloring + TWIR `quest_color`. */
function twdbMitigateColoredQuestExternals() {
	if (!Settings.get("colored_quest", false)) {
		return
	}
	twdbMitigateTwirGatedFeature("quest_color")
	if (typeof twdbIsClothcachePresent === "function" && twdbIsClothcachePresent()) {
		try {
			const twds = window.TWDS
			if (twds && twds.settings && typeof twds.settings === "object") {
				twds.settings.quest_color_finishable = false
			}
		} catch (_e) {
			/* ignore */
		}
	}
}
twdbRegisterExternalMitigation("colored_quest", twdbMitigateColoredQuestExternals)

/** Force Clothcache `questgroup_show_intro` off (wrapper checks the setting). */
function twdbMitigateClothcacheQuestgroupShowIntro() {
	if (!Settings.get("questgroup_show_intro", false)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.settings && typeof twds.settings === "object") {
			twds.settings.questgroup_show_intro = false
		}
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("questgroup_show_intro", twdbMitigateClothcacheQuestgroupShowIntro)

/**
 * Clothcache `misc_tailor_scrollbar_fix` restyles `#trader_bag_pages` — conflicts with town_shop_pages pill.
 */
function twdbMitigateClothcacheTownShopPages() {
	if (!Settings.get("town_shop_pages", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.settings && typeof twds.settings === "object") {
			twds.settings.misc_tailor_scrollbar_fix = false
		}
		document.body.classList.remove("TWDS_fix_tailor_scrollbar")
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("town_shop_pages", twdbMitigateClothcacheTownShopPages)

/**
 * Clothcache town trader filters (`town_shop_collect_switch` + `town_shop_search`) wipe
 * `Trader.inv = {}` and rebuild — conflicts with our display-keys filter. Force both off
 * while either ClothCalc filter owns the trader UI.
 */
function twdbMitigateClothcacheTownShopTraderFilters() {
	const ours =
		!!Settings.get("town_shop_collect_switch", true) || !!Settings.get("town_shop_search", true)
	if (!ours) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	try {
		const twds = window.TWDS
		if (twds && twds.settings && typeof twds.settings === "object") {
			twds.settings.town_shop_collect_switch = false
			twds.settings.town_shop_search = false
		}
		$(".TWDS_trader_filter_collectibles").remove()
		$(".TWDS_trader_town_shop_search").remove()
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("town_shop_collect_switch", twdbMitigateClothcacheTownShopTraderFilters)
twdbRegisterExternalMitigation("town_shop_search", twdbMitigateClothcacheTownShopTraderFilters)

/**
 * Greasyfork WestForts Import Link uses the same `#westforts_js` / `#westforts_link_div` ids.
 * Peel theirs so ClothCalc can inject its button.
 */
let twdbWestfortsImportMitigationRetryTimer = null
function twdbMitigateWestfortsImportLink() {
	if (!Settings.get("import_westforts", true)) {
		return
	}
	const run = function () {
		try {
			const btn = document.getElementById("westforts_link_div")
			const isOurs = btn && (btn.getAttribute("data-twdb_westforts") === "1" || btn.__twdb_westforts)
			if (btn && !isOurs) {
				twdbWestfortsUserscriptSeen = true
				btn.remove()
				const js = document.getElementById("westforts_js")
				if (js) {
					js.remove()
				}
				if (typeof importWestForts === "function") {
					importWestForts()
				}
			} else {
				const js = document.getElementById("westforts_js")
				if (js && js.getAttribute("data-twdb_westforts") !== "1") {
					twdbWestfortsUserscriptSeen = true
				}
			}
		} catch (_e) {
			/* ignore */
		}
	}
	run()
	if (twdbWestfortsImportMitigationRetryTimer !== null) {
		return
	}
	let n = 0
	twdbWestfortsImportMitigationRetryTimer = setInterval(function () {
		n++
		run()
		if (n >= 20) {
			clearInterval(twdbWestfortsImportMitigationRetryTimer)
			twdbWestfortsImportMitigationRetryTimer = null
		}
	}, 500)
}
twdbRegisterExternalMitigation("import_westforts", twdbMitigateWestfortsImportLink)

/** @type {Record<string, boolean>} remembered WTK feature prefs while gated */
const twdbWtkFeatureUserPrefs = Object.create(null)
let twdbWtkGetFeatureWrapped = false
let twdbWtkOpenSettingsWrapped = false
/** @type {ReturnType<typeof setInterval> | null} */
let twdbWtkFeatureGuardsRetryTimer = null

function twdbWtkFeatureGateActive(gate) {
	return twdbCompatSettingOn(gate.settingId, gate.defaultOn)
}

const TWDB_ESSENTIALS_PORTED_FEATURES = [
	["hide_completed_achievements", "AchievHide", true],
	["city_travel_time", "CityTravel", true],
	["chat_profession_icons", "ChatProfessions", true],
	["solved_quest_search", "QuestBookSearch", true],
	["instant_quest", "InstantQuest", false],
	["work_notifications_clear", "HideNotis", true],
	["trader_multi_sell", "TraderSell", true],
]

function twdbEssentialsPortedSettingOn(row) {
	return !!Settings.get(row[0], row[2] !== false)
}

function twdbEssentialsPortedFeatureBlocked(essentialsKey) {
	for (let i = 0; i < TWDB_ESSENTIALS_PORTED_FEATURES.length; i++) {
		const row = TWDB_ESSENTIALS_PORTED_FEATURES[i]
		if (row[1] === essentialsKey && twdbEssentialsPortedSettingOn(row)) {
			return true
		}
	}
	if (essentialsKey === "MoveJobs") {
		return Settings.get("job_queue_bar_offset", true) || Settings.get("userscripts_menubar", true)
	}
	return false
}

function twdbEssentialsAnyPortedFeatureActive() {
	if (Settings.get("job_queue_bar_offset", true) || Settings.get("userscripts_menubar", true)) {
		return true
	}
	for (let i = 0; i < TWDB_ESSENTIALS_PORTED_FEATURES.length; i++) {
		if (twdbEssentialsPortedSettingOn(TWDB_ESSENTIALS_PORTED_FEATURES[i])) {
			return true
		}
	}
	return false
}

function twdbEssentialsApplyPortedFeaturesMitigation(twx) {
	if (!twx || typeof twx.Data !== "object" || twx.Data === null) {
		return
	}
	const loaded = twx.loaded
	for (let i = 0; i < TWDB_ESSENTIALS_PORTED_FEATURES.length; i++) {
		const row = TWDB_ESSENTIALS_PORTED_FEATURES[i]
		const essentialsKey = row[1]
		if (!twdbEssentialsPortedSettingOn(row)) {
			continue
		}
		twx.Data[essentialsKey] = false
		if (Array.isArray(loaded) && loaded.includes(essentialsKey)) {
			loaded.splice(loaded.indexOf(essentialsKey), 1)
		}
	}
	if (Settings.get("job_queue_bar_offset", true) || Settings.get("userscripts_menubar", true)) {
		twx.Data.MoveJobs = false
		if (Array.isArray(loaded) && loaded.includes("MoveJobs")) {
			loaded.splice(loaded.indexOf("MoveJobs"), 1)
		}
	}
}

let twdbEssentialsPortedFeaturesRetryTimer = null

function twdbRemoveWorkNotificationsClearConflicts() {
	try {
		const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
		const notiBar = root.WestUi?.NotiBar
		for (const key of ["main", "work"]) {
			const bar = notiBar?.[key]
			if (!bar?.element) {
				continue
			}
			const host = bar.element
			const $host = host?.jquery ? host : $(host)
			$host.find(".tw2gui_window_buttons_close").not(".twdb_work_notifications_clear").remove()
		}
	} catch (_e) {
		/* ignore */
	}
}

/**
 * TW Essentials `QuestBookSearch` injects `#questbook_search` via a `renderGroupSolved` wrap
 * (`renderGroupSolved_twx`). Data/`getFeature` false alone leaves that wrap live — unwrap it and
 * strip the duplicate UI when our `solved_quest_search` is on.
 */
function twdbNeutralizeEssentialsQuestBookSearch() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const qwv = root.QuestWindowView
	twdbPeelEssentialsTwxHook(qwv, "renderGroupSolved", "renderGroupSolved__twdbSolvedSearch", [
		"renderGroupSolved__twdbSolvedSearch",
		"twdb_solved_quest_search",
	])
	try {
		$("#QuestBookSearch").remove()
		const orphanSearch = $("#questbook_search")
		if (orphanSearch.length) {
			orphanSearch.closest(".tw2gui_textfield").remove()
			$("#questbook_search").remove()
		}
	} catch (_e) {
		/* ignore */
	}
}

/**
 * TW Essentials `InstantQuest` wraps `QuestEmployerView.showQuest` (`showQuest_twx`) — same accept+finish
 * button as ClothCalc `instant_quest`. Peel Essentials; keep our `showQuest_backup` chain.
 */
function twdbNeutralizeEssentialsInstantQuest() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const qev = root.QuestEmployerView
	twdbPeelEssentialsTwxHook(qev, "showQuest", "showQuest_backup", [
		"showQuest_backup",
		"twdb_instant_quest",
		"accept_finish",
	])
	if (typeof addInstantQuests === "function" && Settings.get("instant_quest", false)) {
		try {
			if (qev && qev.showQuest && !qev.showQuest.__twdb_instant_quest) {
				delete qev.showQuest_backup
				addInstantQuests()
			}
		} catch (_e) {
			/* ignore */
		}
	}
}

function twdbNeutralizeEssentialsCityTravel() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const cities = root.west?.window?.Blackboard?.cities
	twdbPeelEssentialsTwxHook(cities, "show", "show__twdbCityTravelTime", [
		"show__twdbCityTravelTime",
		"twdb_city_travel_time",
	])
}

function twdbNeutralizeEssentialsChatProfessions() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const formatter = root.Chat?.Formatter
	twdbPeelEssentialsTwxHook(formatter, "formatContactClient", "formatContactClient__twdbProfessionIcons", [
		"formatContactClient__twdbProfessionIcons",
		"twdbApplyChatProfessionIconTitle",
	])
}

function twdbNeutralizeEssentialsAchievHide() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const aw = root.AchievementWindow
	twdbPeelEssentialsTwxHook(aw, "showTab", "showTab__twdbHideCompleted", [
		"showTab__twdbHideCompleted",
		"twdbHideCompleted",
	])
}

function twdbNeutralizeEssentialsMoveJobs() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	try {
		$("div#ui_bottomright").css("right", "")
		$("div.ui_menucontainer").css("margin-bottom", "")
	} catch (_e) {
		/* ignore */
	}
	twdbPeelEssentialsTwxHook(root.EscapeWindow, "open", "open__twdbUserscriptsMenubar", [
		"open__twdbUserscriptsMenubar",
		"twdb_escape_scripts_btn",
		"twdb_userscripts_menubar",
	])
}

function twdbNeutralizeEssentialsTraderSell() {
	const root = typeof twdbGameRoot === "function" ? twdbGameRoot() : window
	const shop = root.west?.window?.shop
	const inventory = root.Inventory
	const market = root.MarketWindow
	const inventoryItemProto = root.tw2widget?.InventoryItem?.prototype
	twdbPeelEssentialsTwxHook(shop, "openSellInventory", "openSellInventory__twdbTraderMultiSell", [
		"openSellInventory__twdbTraderMultiSell",
		"twdb_trader",
	])
	twdbPeelEssentialsTwxHook(shop, "handleInventoryClick", null, null)
	twdbPeelEssentialsTwxHook(inventory, "setClickHandler", "setClickHandler__twdbTraderMultiSell", [
		"setClickHandler__twdbTraderMultiSell",
		"twdb_trader",
	])
	twdbPeelEssentialsTwxHook(inventory, "undock", "undock__twdbTraderMultiSell", [
		"undock__twdbTraderMultiSell",
		"twdb_trader",
	])
	twdbPeelEssentialsTwxHook(inventory, "open", "open__twdbTraderMultiSell", [
		"open__twdbTraderMultiSell",
		"twdb_trader",
	])
	twdbPeelEssentialsTwxHook(inventoryItemProto, "initDisplay", "initDisplay__twdbTraderMultiSell", [
		"initDisplay__twdbTraderMultiSell",
		"twdb_trader_not_sellable",
	])
	twdbPeelEssentialsTwxHook(market, "onInventoryClick", null, null)
	try {
		$(".TWX_sellable_button, .TWX_auctionable_button, .TWX_sellOptions").remove()
		$(".sellIt, .auctIt").removeClass("sellIt auctIt")
	} catch (_e) {
		/* ignore */
	}
}

function twdbEnsureEssentialsPortedInitGuards() {
	if (Settings.get("hide_completed_achievements", true)) {
		twdbEnsureEssentialsFeatureInitGuard("AchievHide", () => Settings.get("hide_completed_achievements", true))
	}
	if (Settings.get("city_travel_time", true)) {
		twdbEnsureEssentialsFeatureInitGuard("CityTravel", () => Settings.get("city_travel_time", true))
	}
	if (Settings.get("chat_profession_icons", true)) {
		twdbEnsureEssentialsFeatureInitGuard("ChatProfessions", () => Settings.get("chat_profession_icons", true))
	}
	if (Settings.get("solved_quest_search", true)) {
		twdbEnsureEssentialsFeatureInitGuard("QuestBookSearch", () => Settings.get("solved_quest_search", true))
	}
	if (Settings.get("instant_quest", false)) {
		twdbEnsureEssentialsFeatureInitGuard("InstantQuest", () => Settings.get("instant_quest", false))
	}
	if (Settings.get("work_notifications_clear", true)) {
		twdbEnsureEssentialsFeatureInitGuard("HideNotis", () => Settings.get("work_notifications_clear", true))
	}
	if (Settings.get("trader_multi_sell", true)) {
		twdbEnsureEssentialsFeatureInitGuard("TraderSell", () => Settings.get("trader_multi_sell", true))
	}
	if (Settings.get("job_queue_bar_offset", true) || Settings.get("userscripts_menubar", true)) {
		twdbEnsureEssentialsFeatureInitGuard(
			"MoveJobs",
			() => Settings.get("job_queue_bar_offset", true) || Settings.get("userscripts_menubar", true)
		)
	}
}

function twdbNeutralizeEssentialsPortedRuntimeHooks() {
	if (!twdbEssentialsAnyPortedFeatureActive()) {
		return
	}
	try {
		twdbEnsureEssentialsPortedInitGuards()
		if (Settings.get("hide_completed_achievements", true)) {
			twdbNeutralizeEssentialsAchievHide()
		}
		if (Settings.get("chat_profession_icons", true)) {
			twdbNeutralizeEssentialsChatProfessions()
		}
		if (Settings.get("city_travel_time", true)) {
			twdbNeutralizeEssentialsCityTravel()
		}
		if (Settings.get("solved_quest_search", true)) {
			twdbNeutralizeEssentialsQuestBookSearch()
		}
		if (Settings.get("instant_quest", false)) {
			twdbNeutralizeEssentialsInstantQuest()
		}
		if (Settings.get("trader_multi_sell", true)) {
			twdbNeutralizeEssentialsTraderSell()
		}
		if (Settings.get("work_notifications_clear", true)) {
			twdbRemoveWorkNotificationsClearConflicts()
		}
		if (Settings.get("job_queue_bar_offset", true) || Settings.get("userscripts_menubar", true)) {
			twdbNeutralizeEssentialsMoveJobs()
		}
	} catch (_e) {
		/* ignore */
	}
}

function twdbMitigateEssentialsPortedFeaturesBundle() {
	if (!twdbEssentialsAnyPortedFeatureActive()) {
		return
	}
	const attempt = () => {
		const twx = window.TWX
		if (!twx || !twx.Skript || typeof twx.Skript.updateFeat !== "function") {
			return false
		}
		try {
			twdbEnsureEssentialsMitigationGetFeatureWrap()
			twdbEnsureEssentialsMitigationUpdateFeatWrap()
			twdbEnsureEssentialsFeatureGuards()
			if (typeof twx.Data !== "object" || twx.Data === null) {
				twx.Data = {}
			}
			twdbEnsureEssentialsPortedInitGuards()
			twdbEssentialsApplyPortedFeaturesMitigation(twx)
			twdbEssentialsApplyUpdateFeatMitigation(twx)
			twdbNeutralizeEssentialsPortedRuntimeHooks()
		} catch (_e) {
			/* ignore */
		}
		return true
	}
	if (attempt()) {
		if (twdbEssentialsPortedFeaturesRetryTimer !== null) {
			clearInterval(twdbEssentialsPortedFeaturesRetryTimer)
			twdbEssentialsPortedFeaturesRetryTimer = null
		}
		return
	}
	if (twdbEssentialsPortedFeaturesRetryTimer !== null) {
		return
	}
	twdbEssentialsPortedFeaturesRetryTimer = setInterval(() => {
		if (attempt()) {
			clearInterval(twdbEssentialsPortedFeaturesRetryTimer)
			twdbEssentialsPortedFeaturesRetryTimer = null
		}
	}, 250)
}

for (let twdbEssentialsPortedIdx = 0; twdbEssentialsPortedIdx < TWDB_ESSENTIALS_PORTED_FEATURES.length; twdbEssentialsPortedIdx++) {
	twdbRegisterExternalMitigation(
		TWDB_ESSENTIALS_PORTED_FEATURES[twdbEssentialsPortedIdx][0],
		twdbMitigateEssentialsPortedFeaturesBundle
	)
}
twdbRegisterExternalMitigation("job_queue_bar_offset", twdbMitigateEssentialsPortedFeaturesBundle)
twdbRegisterExternalMitigation("userscripts_menubar", twdbMitigateEssentialsPortedFeaturesBundle)

/* --- Clothcache itemusage badges / recruiting window / prebattle center peel --- */

let twdbClothcacheItemusageDomHookRegistered = false
let twdbClothcacheItemusageEventsBound = false
/** @type {MutationObserver | null} */
let twdbClothcacheItemusageObserver = null
/**
 * Clothcache always paints `.TWDS_itemusageinfo` in InventoryItem.initDisplay (no TWDS setting).
 * Setting `clothcache_itemusageinfo` (default off): when ON, strip badges from DOM only.
 * Never wrap `InventoryItem.prototype.initDisplay` — that races TWIR / Essentials / trader_multi_sell
 * and intermittently leaves TWIR `#bag` empty after `addItems` empties it.
 */
function twdbPeelClothcacheItemusageinfoSpans() {
	try {
		if (typeof $ !== "undefined") {
			$(".TWDS_itemusageinfo").remove()
		} else if (typeof document !== "undefined" && document.querySelectorAll) {
			document.querySelectorAll(".TWDS_itemusageinfo").forEach(function (node) {
				node.remove()
			})
		}
	} catch (_e) {
		/* ignore */
	}
}
/** Undo legacy initDisplay wrap from older builds (same page / hot reload). */
function twdbUnwrapClothcacheItemusageInitDisplay() {
	try {
		const proto = window.tw2widget && window.tw2widget.InventoryItem && window.tw2widget.InventoryItem.prototype
		if (!proto || typeof proto.initDisplay !== "function" || !proto.initDisplay.__twdbItemusagePeel) {
			return
		}
		if (typeof proto.__twdb_itemusage_initDisplay_backup === "function") {
			proto.initDisplay = proto.__twdb_itemusage_initDisplay_backup
		}
		try {
			delete proto.__twdb_itemusage_initDisplay_backup
		} catch (_e) {
			/* ignore */
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbClothcacheItemusageSettingOn() {
	return typeof Settings !== "undefined" && !!Settings.get("clothcache_itemusageinfo", false)
}
function twdbEnsureClothcacheItemusageDomObserver() {
	if (twdbClothcacheItemusageObserver || typeof MutationObserver === "undefined") {
		return
	}
	const root = document.body || document.documentElement
	if (!root) {
		return
	}
	twdbClothcacheItemusageObserver = new MutationObserver(function (mutations) {
		if (!twdbClothcacheItemusageSettingOn()) {
			return
		}
		for (let m = 0; m < mutations.length; m++) {
			const added = mutations[m].addedNodes
			for (let i = 0; i < added.length; i++) {
				const node = added[i]
				if (!node || node.nodeType !== 1) {
					continue
				}
				if (node.classList && node.classList.contains("TWDS_itemusageinfo")) {
					node.remove()
					continue
				}
				if (typeof node.querySelectorAll === "function") {
					const spans = node.querySelectorAll(".TWDS_itemusageinfo")
					for (let s = 0; s < spans.length; s++) {
						spans[s].remove()
					}
				}
			}
		}
	})
	twdbClothcacheItemusageObserver.observe(root, { childList: true, subtree: true })
}
function twdbStopClothcacheItemusageDomPeel() {
	if (twdbClothcacheItemusageObserver) {
		try {
			twdbClothcacheItemusageObserver.disconnect()
		} catch (_e) {
			/* ignore */
		}
		twdbClothcacheItemusageObserver = null
	}
}
function twdbSuppressClothcacheItemusageinfo() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	twdbUnwrapClothcacheItemusageInitDisplay()
	const run = function () {
		if (!twdbClothcacheItemusageSettingOn()) {
			return
		}
		twdbEnsureClothcacheItemusageDomObserver()
		twdbPeelClothcacheItemusageinfoSpans()
	}
	run()
	if (!twdbClothcacheItemusageEventsBound && typeof EventHandler !== "undefined" && typeof EventHandler.listen === "function") {
		twdbClothcacheItemusageEventsBound = true
		try {
			EventHandler.listen("inventory_ready", run)
			EventHandler.listen("inventory_loaded", run)
		} catch (_e) {
			twdbClothcacheItemusageEventsBound = false
		}
	}
	if (!twdbClothcacheItemusageDomHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbClothcacheItemusageDomHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbClothcacheItemusageDomHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
/** @param {boolean} disableOn when true, strip Clothcache itemusage badges */
function twdbSyncClothcacheItemusageinfo(disableOn) {
	if (disableOn) {
		twdbSuppressClothcacheItemusageinfo()
	} else {
		twdbStopClothcacheItemusageDomPeel()
		twdbUnwrapClothcacheItemusageInitDisplay()
	}
}
twdbRegisterExternalMitigation("clothcache_itemusageinfo", twdbSuppressClothcacheItemusageinfo)

let twdbClothcacheRecruitLoaderSafe = false
let twdbClothcacheRecruitOpenWrapInstalled = false
let twdbClothcacheRecruitHookRegistered = false
function twdbClothcacheRecruitHideLoader() {
	try {
		const win = window.TWDS && window.TWDS.recruit && window.TWDS.recruit.win
		if (win && typeof win.hideLoader === "function") {
			win.hideLoader()
		}
	} catch (_e) {
		/* ignore */
	}
}
/**
 * Clothcache `TWDS.recruit.load` never calls hideLoader; it relies on Ajax.remoteCall view.
 * Always clear the spinner on settle so Enhanced Recruitment / Ajax wraps cannot leave it stuck.
 */
function twdbEnsureClothcacheRecruitLoaderSafety() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const twds = window.TWDS
	if (!twds || !twds.recruit || typeof twds.recruit.load !== "function") {
		return
	}
	if (twds.recruit.load.__twdbRecruitLoaderSafe) {
		twdbClothcacheRecruitLoaderSafe = true
		return
	}
	const prev = twds.recruit.__twdb_load_backup || twds.recruit.load
	twds.recruit.__twdb_load_backup = prev
	const wrapped = function () {
		let ret
		try {
			ret = twds.recruit.__twdb_load_backup.apply(this, arguments)
		} catch (err) {
			twdbClothcacheRecruitHideLoader()
			throw err
		}
		if (ret && typeof ret.then === "function") {
			return ret.then(
				function (value) {
					twdbClothcacheRecruitHideLoader()
					return value
				},
				function (err) {
					twdbClothcacheRecruitHideLoader()
					throw err
				}
			)
		}
		twdbClothcacheRecruitHideLoader()
		return ret
	}
	wrapped.__twdbRecruitLoaderSafe = true
	twds.recruit.load = wrapped
	twdbClothcacheRecruitLoaderSafe = true
}
function twdbEnsureClothcacheRecruitOpenwindowGate() {
	const twds = window.TWDS
	if (!twds || !twds.recruit || typeof twds.recruit.openwindow !== "function") {
		return
	}
	if (twds.recruit.openwindow.__twdbRecruitOpenGate) {
		twdbClothcacheRecruitOpenWrapInstalled = true
		return
	}
	const prev = twds.recruit.__twdb_openwindow_backup || twds.recruit.openwindow
	twds.recruit.__twdb_openwindow_backup = prev
	const gated = function (fortid) {
		twdbEnsureClothcacheRecruitLoaderSafety()
		if (typeof Settings !== "undefined" && Settings.get("clothcache_recruiting_window", false)) {
			return
		}
		return twds.recruit.__twdb_openwindow_backup.apply(this, arguments)
	}
	gated.__twdbRecruitOpenGate = true
	twds.recruit.openwindow = gated
	twdbClothcacheRecruitOpenWrapInstalled = true
}
function twdbPeelClothcacheRecruitingWindowLinks() {
	try {
		if (typeof $ !== "undefined") {
			$("a").filter(function () {
				const oc = this.getAttribute("onclick") || ""
				return oc.indexOf("TWDS.recruit.openwindow") !== -1
			}).remove()
		}
	} catch (_e) {
		/* ignore */
	}
}
/**
 * Strip Clothcache "Recruiting Window" anchor from getInfoArea HTML without unhooking
 * FortBattleWindow.getInfoArea (preserves fortbattle_recruitment canSetPrivilege + CC/TWIR chain).
 */
function twdbEnsureClothcacheRecruitInfoAreaGate() {
	try {
		const FBW = window.FortBattleWindow
		if (!FBW || typeof FBW.getInfoArea !== "function") {
			return
		}
		if (FBW.getInfoArea.__twdbRecruitInfoGate) {
			return
		}
		const prev = FBW.getInfoArea
		FBW.__twdb_cc_recruit_infoarea_backup = prev
		const gated = function () {
			let htm = FBW.__twdb_cc_recruit_infoarea_backup.apply(this, arguments)
			try {
				if (typeof Settings !== "undefined" && Settings.get("clothcache_recruiting_window", false)) {
					htm = String(htm == null ? "" : htm).replace(
						/<a\b[^>]*\bonclick\s*=\s*(['"])[^'"]*TWDS\.recruit\.openwindow[^'"]*\1[^>]*>[\s\S]*?<\/a>\s*(?:<br\s*\/?>)?/gi,
						""
					)
				}
			} catch (_e) {
				/* ignore */
			}
			return htm
		}
		gated.__twdbRecruitInfoGate = true
		FBW.getInfoArea = gated
	} catch (_e) {
		/* ignore */
	}
}
function twdbSuppressClothcacheRecruitingWindow() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		twdbEnsureClothcacheRecruitLoaderSafety()
		twdbEnsureClothcacheRecruitOpenwindowGate()
		twdbEnsureClothcacheRecruitInfoAreaGate()
		twdbPeelClothcacheRecruitingWindowLinks()
	}
	run()
	if (!twdbClothcacheRecruitHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbClothcacheRecruitHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbClothcacheRecruitHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
/**
 * When allowed: keep loader/openwindow/info gates installed (pass-through when setting on).
 * Do not rewrite FortBattleWindow.getInfoArea to Clothcache — that broke recruitment wraps.
 */
function twdbAllowClothcacheRecruitingWindow() {
	const run = function () {
		twdbEnsureClothcacheRecruitLoaderSafety()
		twdbEnsureClothcacheRecruitOpenwindowGate()
		twdbEnsureClothcacheRecruitInfoAreaGate()
	}
	run()
	if (!twdbClothcacheRecruitHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbClothcacheRecruitHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbClothcacheRecruitHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
	window.setTimeout(run, 2500)
}
/**
 * @param {boolean} disableOn when true, block Clothcache Recruiting Window
 */
function twdbSyncClothcacheRecruitingWindow(disableOn) {
	if (disableOn) {
		twdbSuppressClothcacheRecruitingWindow()
		return
	}
	twdbAllowClothcacheRecruitingWindow()
}
twdbRegisterExternalMitigation("clothcache_recruiting_window", twdbSuppressClothcacheRecruitingWindow)

let twdbTelegramBbCodesClothcacheHeadPeelHookRegistered = false
function twdbTelegramHeadLayoutClothcachePeelOn() {
	if (typeof Settings === "undefined") {
		return false
	}
	return (
		!!Settings.get("enhance_telegrams", true) || !!Settings.get("telegram_bb_codes", true)
	)
}
function twdbTelegramBbCodesClothcacheHeadPeelOn() {
	return twdbTelegramHeadLayoutClothcachePeelOn()
}
/**
 * Clothcache compiles nested telegram-head rules as separate selectors; strip any rule whose
 * selector mentions `.tw2gui_window.telegram` + (add-player|telegram-head).
 */
function twdbStripClothcacheTelegramHeadCssText(css) {
	if (!css || css.indexOf(".tw2gui_window.telegram") === -1) {
		return css
	}
	let out = ""
	let i = 0
	const n = css.length
	while (i < n) {
		const open = css.indexOf("{", i)
		if (open === -1) {
			out += css.slice(i)
			break
		}
		const selector = css.slice(i, open)
		let depth = 1
		let j = open + 1
		while (j < n && depth > 0) {
			const ch = css.charAt(j)
			if (ch === "{") {
				depth++
			} else if (ch === "}") {
				depth--
			}
			j++
		}
		const rule = css.slice(i, j)
		const sel = selector.replace(/\/\*[\s\S]*?\*\//g, "")
		const isTelegramHead =
			/\.tw2gui_window\.telegram/.test(sel) &&
			(/\.add-player\b/.test(sel) || /telegram-head/.test(sel))
		if (!isTelegramHead) {
			out += rule
		}
		i = j
	}
	return out
}
function twdbPeelClothcacheTelegramHeadRulesFromStyleHack() {
	try {
		const el = document.getElementById("TWDS_style_hack")
		if (!el) {
			return
		}
		const css = el.textContent || ""
		const next = twdbStripClothcacheTelegramHeadCssText(css)
		if (next !== css) {
			el.textContent = next
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbUnwrapClothcacheInsertStylesTelegramStrip() {
	try {
		const twds = window.TWDS
		if (!twds || !twds.insertStyles || !twds.insertStyles.__twdbTelegramStrip) {
			return
		}
		if (typeof twds.__twdb_insertStyles_backup === "function") {
			twds.insertStyles = twds.__twdb_insertStyles_backup
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbEnsureClothcacheInsertStylesTelegramStrip() {
	if (!twdbTelegramBbCodesClothcacheHeadPeelOn()) {
		return
	}
	const twds = window.TWDS
	if (!twds || typeof twds.insertStyles !== "function") {
		twdbPeelClothcacheTelegramHeadRulesFromStyleHack()
		return
	}
	if (twds.insertStyles.__twdbTelegramStrip) {
		twdbPeelClothcacheTelegramHeadRulesFromStyleHack()
		return
	}
	const prev = twds.__twdb_insertStyles_backup || twds.insertStyles
	twds.__twdb_insertStyles_backup = prev
	const wrapped = function () {
		prev.apply(this, arguments)
		if (twdbTelegramBbCodesClothcacheHeadPeelOn()) {
			twdbPeelClothcacheTelegramHeadRulesFromStyleHack()
		}
	}
	wrapped.__twdbTelegramStrip = true
	twds.insertStyles = wrapped
	twdbPeelClothcacheTelegramHeadRulesFromStyleHack()
}
/**
 * Clothcache 0.85+ always injects telegram open-window head CSS in `#TWDS_style_hack` (no TWDS setting).
 * When enhanced telegram layout is active, strip those rules so our layout CSS wins.
 */
function twdbMitigateClothcacheTelegramHeadForTelegramBb() {
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	const run = function () {
		twdbEnsureClothcacheInsertStylesTelegramStrip()
	}
	run()
	if (
		!twdbTelegramBbCodesClothcacheHeadPeelHookRegistered &&
		window.TWDS &&
		typeof window.TWDS.registerStartFunc === "function"
	) {
		twdbTelegramBbCodesClothcacheHeadPeelHookRegistered = true
		try {
			window.TWDS.registerStartFunc(run)
		} catch (_e) {
			twdbTelegramBbCodesClothcacheHeadPeelHookRegistered = false
		}
	}
	window.setTimeout(run, 0)
	window.setTimeout(run, 100)
	window.setTimeout(run, 500)
	window.setTimeout(run, 1500)
}
/** @param {boolean} peelOn when true, peel Clothcache 0.85 telegram head CSS */
function twdbSyncTelegramBbCodesClothcacheHeadPeel(peelOn) {
	if (peelOn) {
		twdbMitigateClothcacheTelegramHeadForTelegramBb()
		return
	}
	twdbUnwrapClothcacheInsertStylesTelegramStrip()
	try {
		if (window.TWDS && typeof window.TWDS.insertStyles === "function") {
			window.TWDS.insertStyles()
		}
	} catch (_e) {
		/* ignore */
	}
}
twdbRegisterExternalMitigation("telegram_bb_codes", twdbMitigateClothcacheTelegramHeadForTelegramBb)
twdbRegisterExternalMitigation("enhance_telegrams", twdbMitigateClothcacheTelegramHeadForTelegramBb)

/**
 * Peel Clothcache always-on `a.TWDS_prebattle_scroll` (no TWDS setting).
 */
function twdbPeelClothcachePrebattleScroll() {
	try {
		if (typeof $ !== "undefined") {
			$("a.TWDS_prebattle_scroll").remove()
		} else if (typeof document !== "undefined" && document.querySelectorAll) {
			document.querySelectorAll("a.TWDS_prebattle_scroll").forEach(function (node) {
				node.remove()
			})
		}
	} catch (_e) {
		/* ignore */
	}
}
function twdbMitigateClothcachePrebattleCenter() {
	if (!Settings.get("fortbattle_prebattle_center", true)) {
		twdbPeelClothcachePrebattleScroll()
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	twdbPeelClothcachePrebattleScroll()
}
twdbRegisterExternalMitigation("fortbattle_prebattle_center", twdbMitigateClothcachePrebattleCenter)

/**
 * Clothcache Extras / AchievementWindow overlaps for Collections, Alliance map, Shopsearch.
 * Their `AchievementWindow.open` wrap drops the return value (breaks our Collections tab when
 * Clothcache loads first). Filter `extraList`, gate `registerExtra`, peel/noop the openwindows.
 */
const TWDB_CLOTHCACHE_EXTRA_GATES = [
	{ fn: "TWDS.collections.openwindow", settingId: "achievement_collections_tab", defaultOn: true },
	{ fn: "TWDS.allimap.openwindow", settingId: "alliance_world_map", defaultOn: true },
	{ fn: "TWDS.shopsearch.openwindow", settingId: "shop_search", defaultOn: true },
]

function twdbClothcacheExtraFnBlocked(fn) {
	if (!fn) {
		return false
	}
	for (let i = 0; i < TWDB_CLOTHCACHE_EXTRA_GATES.length; i++) {
		const gate = TWDB_CLOTHCACHE_EXTRA_GATES[i]
		if (gate.fn === fn && twdbCompatSettingOn(gate.settingId, gate.defaultOn)) {
			return true
		}
	}
	return false
}

function twdbFilterClothcacheExtraList() {
	const twds = window.TWDS
	if (!twds || !Array.isArray(twds.extraList)) {
		return
	}
	const next = []
	for (let i = 0; i < twds.extraList.length; i++) {
		const e = twds.extraList[i]
		if (e && twdbClothcacheExtraFnBlocked(e.fn)) {
			continue
		}
		next.push(e)
	}
	twds.extraList = next
}

let twdbClothcacheRegisterExtraGateWrapped = false
function twdbEnsureClothcacheRegisterExtraGate() {
	const twds = window.TWDS
	if (!twds || typeof twds.registerExtra !== "function") {
		return false
	}
	if (twds.registerExtra.__twdbExtraGate) {
		twdbFilterClothcacheExtraList()
		return true
	}
	const prev = twds.registerExtra.__twdbOrigRegisterExtra || twds.registerExtra
	const gated = function (fn, text, help) {
		if (twdbClothcacheExtraFnBlocked(fn)) {
			return
		}
		return prev.apply(this, arguments)
	}
	gated.__twdbExtraGate = true
	gated.__twdbOrigRegisterExtra = prev
	twds.registerExtra = gated
	twdbClothcacheRegisterExtraGateWrapped = true
	twdbFilterClothcacheExtraList()
	return true
}

/**
 * Peel Clothcache `AchievementWindow.open` (drops return; patches Explorer.updateContent).
 * Keep our `twdb_open` chain pointing past Clothcache to the real opener.
 */
function twdbPeelClothcacheAchievementWindowOpen() {
	const AW = typeof AchievementWindow !== "undefined" ? AchievementWindow : null
	if (!AW || typeof AW.open !== "function") {
		return false
	}
	const backup = AW.TWDS_backup_open
	if (typeof backup !== "function") {
		return false
	}
	try {
		const openSrc =
			typeof AW.open === "function" ? Function.prototype.toString.call(AW.open) : ""
		const twdbOpenSrc =
			typeof AW.twdb_open === "function" ? Function.prototype.toString.call(AW.twdb_open) : ""
		const clothcacheOnTop =
			openSrc.indexOf("TWDS_backup_open") >= 0 &&
			(openSrc.indexOf("Explorer") >= 0 || openSrc.indexOf("updateContent") >= 0) &&
			openSrc.indexOf("twdb_open") < 0 &&
			openSrc.indexOf("scheduleEnsureTab") < 0 &&
			openSrc.indexOf("__twdb_ach_tab") < 0
		const clothcacheUnderUs =
			typeof AW.twdb_open === "function" &&
			twdbOpenSrc.indexOf("TWDS_backup_open") >= 0 &&
			(twdbOpenSrc.indexOf("Explorer") >= 0 || twdbOpenSrc.indexOf("updateContent") >= 0)

		if (clothcacheOnTop) {
			AW.open = backup
		} else if (clothcacheUnderUs) {
			AW.twdb_open = backup
		}

		// If Clothcache rebinds AW.open → acwindow.open later, return the instance and skip their Explorer patch.
		const twds = window.TWDS
		if (twds && twds.acwindow && typeof twds.acwindow.open === "function" && !twds.acwindow.open.__twdbCollectionsPeel) {
			const peeled = function (userid, tab) {
				const opener = AW.TWDS_backup_open
				if (typeof opener === "function") {
					return opener.call(this, userid, tab)
				}
				return undefined
			}
			peeled.__twdbCollectionsPeel = true
			twds.acwindow.open = peeled
		}
		return true
	} catch (_e) {
		return false
	}
}

function twdbNoopClothcacheOpenwindow(nsPath) {
	const parts = String(nsPath || "").split(".")
	if (parts.length < 2) {
		return
	}
	let ctx = window
	for (let i = 0; i < parts.length - 1; i++) {
		ctx = ctx && ctx[parts[i]]
	}
	if (!ctx) {
		return
	}
	const method = parts[parts.length - 1]
	if (typeof ctx[method] !== "function") {
		return
	}
	if (ctx[method].__twdbNoop) {
		return
	}
	const prev = ctx["__twdb_openwindow_backup_" + method] || ctx[method]
	ctx["__twdb_openwindow_backup_" + method] = prev
	const noop = function () {
		/* blocked while ClothCalc equivalent is on */
	}
	noop.__twdbNoop = true
	ctx[method] = noop
}

function twdbMitigateClothcacheCollectionsOverlap() {
	if (!twdbCompatSettingOn("achievement_collections_tab", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	twdbEnsureClothcacheRegisterExtraGate()
	twdbFilterClothcacheExtraList()
	twdbPeelClothcacheAchievementWindowOpen()
	twdbNoopClothcacheOpenwindow("TWDS.collections.openwindow")
}

function twdbMitigateClothcacheAllianceMapOverlap() {
	if (!twdbCompatSettingOn("alliance_world_map", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	twdbEnsureClothcacheRegisterExtraGate()
	twdbFilterClothcacheExtraList()
	twdbNoopClothcacheOpenwindow("TWDS.allimap.openwindow")
}

function twdbMitigateClothcacheShopSearchOverlap() {
	if (!twdbCompatSettingOn("shop_search", true)) {
		return
	}
	if (typeof twdbIsClothcachePresent === "function" && !twdbIsClothcachePresent()) {
		return
	}
	twdbEnsureClothcacheRegisterExtraGate()
	twdbFilterClothcacheExtraList()
	twdbNoopClothcacheOpenwindow("TWDS.shopsearch.openwindow")
}

let twdbClothcacheExtrasOverlapHookRegistered = false
function twdbRunAllClothcacheExtrasOverlapMitigations() {
	twdbMitigateClothcacheCollectionsOverlap()
	twdbMitigateClothcacheAllianceMapOverlap()
	twdbMitigateClothcacheShopSearchOverlap()
}
function twdbScheduleClothcacheExtrasOverlapMitigations() {
	twdbRunAllClothcacheExtrasOverlapMitigations()
	if (!twdbClothcacheExtrasOverlapHookRegistered && window.TWDS && typeof window.TWDS.registerStartFunc === "function") {
		twdbClothcacheExtrasOverlapHookRegistered = true
		try {
			window.TWDS.registerStartFunc(twdbRunAllClothcacheExtrasOverlapMitigations)
		} catch (_e) {
			twdbClothcacheExtrasOverlapHookRegistered = false
		}
	}
	window.setTimeout(twdbRunAllClothcacheExtrasOverlapMitigations, 0)
	window.setTimeout(twdbRunAllClothcacheExtrasOverlapMitigations, 100)
	window.setTimeout(twdbRunAllClothcacheExtrasOverlapMitigations, 500)
	window.setTimeout(twdbRunAllClothcacheExtrasOverlapMitigations, 1500)
	window.setTimeout(twdbRunAllClothcacheExtrasOverlapMitigations, 2500)
}

function twdbMitigateClothcacheCollectionsOverlapWithRetry() {
	twdbScheduleClothcacheExtrasOverlapMitigations()
}
function twdbMitigateClothcacheAllianceMapOverlapWithRetry() {
	twdbScheduleClothcacheExtrasOverlapMitigations()
}
function twdbMitigateClothcacheShopSearchOverlapWithRetry() {
	twdbScheduleClothcacheExtrasOverlapMitigations()
}

twdbRegisterExternalMitigation("achievement_collections_tab", twdbMitigateClothcacheCollectionsOverlapWithRetry)
twdbRegisterExternalMitigation("alliance_world_map", twdbMitigateClothcacheAllianceMapOverlapWithRetry)
twdbRegisterExternalMitigation("shop_search", twdbMitigateClothcacheShopSearchOverlapWithRetry)
;(function () {
	try {
		const __fn = eval("twdbMitigateClothcacheMiniChatTabs")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcacheMiniChatTabs", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateClothcacheMinimapBundle")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcacheMinimapBundle", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbStripClothcacheMinimapInputHandlers")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbStripClothcacheMinimapInputHandlers", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbStripClothcacheDelegatedMinimapHandlers")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbStripClothcacheDelegatedMinimapHandlers", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateClothcacheFortbattleBetterControlButtons")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcacheFortbattleBetterControlButtons", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateClothcacheFortbattleBetterControlButtonsBundle")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcacheFortbattleBetterControlButtonsBundle", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateClothcacheFortbattlePopupMove")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcacheFortbattlePopupMove", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateClothcacheNotificationsMaxCount")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcacheNotificationsMaxCount", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateClothcachePrebattleCenter")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateClothcachePrebattleCenter", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbPeelClothcachePrebattleScroll")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbPeelClothcachePrebattleScroll", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbPeelClothcacheTelegramHeadRulesFromStyleHack")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbPeelClothcacheTelegramHeadRulesFromStyleHack", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbEnsureClothcacheRecruitLoaderSafety")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbEnsureClothcacheRecruitLoaderSafety", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbScheduleClothcacheSlashCoexistence")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbScheduleClothcacheSlashCoexistence", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbStripClothcacheOnlyChatOperations")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbStripClothcacheOnlyChatOperations", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheAvoidNuggets")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheAvoidNuggets", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheDailyTasksWarning")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheDailyTasksWarning", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheEventCurrencyClickSendAll")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheEventCurrencyClickSendAll", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheFortbattleBetterControlButtons")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheFortbattleBetterControlButtons", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheFortbattleChatHealth")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheFortbattleChatHealth", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheFortbattlePopupMove")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheFortbattlePopupMove", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheFriendrequestCounter")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheFriendrequestCounter", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheFriendslistWindow")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheFriendslistWindow", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheItemusageinfo")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheItemusageinfo", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheJobShowCollectibles")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheJobShowCollectibles", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheJobwindowShowLuck")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheJobwindowShowLuck", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheMarketSellstat")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheMarketSellstat", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheMiscProfileTextClick")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheMiscProfileTextClick", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheQuestTrackerWarning")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheQuestTrackerWarning", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheRecruitingWindow")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheRecruitingWindow", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheSheriffMinbounty")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheSheriffMinbounty", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheTaskqueueFavicon")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheTaskqueueFavicon", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheTaskqueueLogs")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheTaskqueueLogs", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheUnreadTelegramsHighlightSetting")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheUnreadTelegramsHighlightSetting", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheVipendtimeShow")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheVipendtimeShow", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheWofOktoberfestSpeedup")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheWofOktoberfestSpeedup", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncClothcacheWofRewardsCount")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncClothcacheWofRewardsCount", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncTelegramBbCodesClothcacheHeadPeel")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncTelegramBbCodesClothcacheHeadPeel", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbTelegramHeadLayoutClothcachePeelOn")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbTelegramHeadLayoutClothcachePeelOn", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncFortbattlePrebattleCenter")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncFortbattlePrebattleCenter", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateEssentialsEquipManagerPlus")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateEssentialsEquipManagerPlus", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbNeutralizeEssentialsPortedRuntimeHooks")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbNeutralizeEssentialsPortedRuntimeHooks", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbRemoveWorkNotificationsClearConflicts")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbRemoveWorkNotificationsClearConflicts", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncEssentialsEquipManagerPlus")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncEssentialsEquipManagerPlus", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateTwirShopCollectionBadges")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateTwirShopCollectionBadges", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateTwirFbCharIcons")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateTwirFbCharIcons", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateTwirFbCharIconsBundle")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateTwirFbCharIconsBundle", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbMitigateFortbattleChatTopicExternalsBundle")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbMitigateFortbattleChatTopicExternalsBundle", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbRestoreFortbattleChatTopicExternals")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbRestoreFortbattleChatTopicExternals", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncTwirFbCharIcons")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncTwirFbCharIcons", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncFortbattleChatTopic")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncFortbattleChatTopic", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncTwirEnhanceRecruitlistDedupe")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncTwirEnhanceRecruitlistDedupe", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbRestoreTwirEnhanceRecruitlistDedupe")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbRestoreTwirEnhanceRecruitlistDedupe", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncTownwindowAllianceExternals")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncTownwindowAllianceExternals", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncProfileCraftPointsExternals")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncProfileCraftPointsExternals", __fn)
		}
	} catch (_e) {}
	try {
		const __fn = eval("twdbSyncFortbattlePopupExternals")
		if (typeof __fn === "function") {
			TWDB.Compat.install("twdbSyncFortbattlePopupExternals", __fn)
		}
	} catch (_e) {}
	TWDB.Compat.markPackLoaded("features")
})()
