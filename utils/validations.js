export const MOBILE_REGEX = new RegExp(/^[6-9][\d]{9}$/)

export const isRequired = (value) => {
	if (value == undefined) {
		return false
	} else if (typeof value === 'object' && !Object.keys(value).length) {
		return false
	} else if (typeof value == 'string' && value.trim() == '') {
		return false
	} else if (value.constructor === Array && value.length <= 0) {
		return false
	} else {
		return true
	}
}

export const isEmail = (email) => {
	if (typeof email == 'string' && email === '') {
		return true
	}
	let emailRegex = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@([a-z\d]{1,}[a-z+\d_-]*)(([.][a-z]{2,}){1,})$/i,
	)
	return emailRegex.test(email)
}

export const isMobileNumber = (mobile) => {
	if (typeof mobile == 'string' && mobile === '') {
		return true
	}
	return MOBILE_REGEX.test(mobile)
}
