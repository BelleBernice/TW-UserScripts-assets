try {
	const R = 0
	const M = 40
	const F = 4
	TWDB.Updater.check(`${R}.${M}.${F}`)
} catch (error) {
	TWDB.Error.report(error, TWDB.lang._("errors.updater_check_version"))
}
