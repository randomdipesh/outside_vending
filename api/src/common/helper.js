exports.isEmpty = (val) => {
	val = String(val)
	if (
		!val ||
		val === "" ||
		val === null ||
		val === undefined ||
		val.length < 1
	) {
		return true;
	} else {
		return false;
	}
};
