export const getValue = (key) => {
	try {
		const data = localStorage.getItem(key)
		return data
	} catch (e) {
		return
	}
}

export const setValue = (key, value) => {
	try {
		const data = localStorage.setItem(key, value)
		return data
	} catch (e) {
		return
	}
}
