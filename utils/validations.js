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

function required(value) {
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

function email(email) {
	if (typeof email == 'string' && email === '') {
		return true
	}
	let emailRegex = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@([a-z\d]{1,}[a-z+\d_-]*)(([.][a-z]{2,}){1,})$/i
	)
	return emailRegex.test(email)
}

function mobile(mobile) {
	if (typeof mobile == 'string' && mobile === '') {
		return true
	}
	let mobileRegex = new RegExp(/^[6-9][\d]{9}$/)
	return mobileRegex.test(mobile)
}

function integer(integer) {
	let IntegerRegex = new RegExp(/^\d+$/g)
	return IntegerRegex.test(integer)
}

export const ValidationMessages = {
	required: 'Please enter this value',
	email: 'Invalid email id',
	mobile: 'Invalid mobile no',
	integer: 'Please enter a valid intege value',
}


export function validationHandler(value, validationArray) {
	let validationObject = { isValid: true, message: '' }

	if (Object.prototype.toString.call(validationArray) !== '[object Array]') {
		throw new Error('validationArray should be an array (In Validations.ts)')
		return
	} else {
		for (let i = 0; i < validationArray.length; i++) {
			if (typeof validationArray[i] == 'string') {
				validationObject.isValid = validationRules[validationArray[i]](value)
				validationObject.message = ''
				if (validationObject.isValid == false) {
					validationObject.message = ValidationMessages[validationArray[i]]
				}
			} else if (typeof validationArray[i] == 'object') {
				if (validationArray[i].hasOwnProperty('name')) {
					validationObject.isValid = callValidator(
						validationArray[i].name,
						validationArray[i],
						value
					)
					validationObject.message = ''
					if (validationObject.isValid == false) {
						// checking if custom message is passed if not then use standard msgs
						if (validationArray[i].hasOwnProperty('message')) {
							validationObject.message = validationArray[i].message
						} else {
							validationObject.message =
								ValidationMessages[validationArray[i].name]
						}
					}
				} else {
					throw new Error('Validation object must have name key')
					return
				}
			} else {
				throw new Error('Valdiation rules can only be of type string or object')
				return
			}

			// breaking if any one validation is false
			if (validationObject.isValid == false) {
				break
			}
		}
		return validationObject
	}
}


//
function callValidator(validationName, validationObj, value) {
	let isValid = true
	switch (validationName) {
		default:
			if (validationRules[validationName]) {
				isValid = validationRules[validationName](value)
			}
			break
	}
	return isValid
}


const validationRules = {
	integer,
	email,
	mobile,
	required,
}