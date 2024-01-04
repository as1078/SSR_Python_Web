function range(end) {
	const arr = []
	for (let i = 0; i < end; i++) {
		arr.push(i)
	}
	return arr
}

module.exports = { range }
