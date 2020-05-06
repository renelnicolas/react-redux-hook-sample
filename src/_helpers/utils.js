const REGEX_EMAIL = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD_STRENGTH = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
const REGEX_URL_START = /^https?:\/\//

export const isEmpty = (data) => {
    return undefined === data || Object.keys(data).length === 0;
}

export const getFormValidationFromObject = (obj, defaultValue, forceValid = false) => {
    let formValidation = {};
    const notRequired = obj.hasOwnProperty('notRequired') ? (typeof obj.notRequired === 'function' ? obj.notRequired() : obj.notRequired) : {}
    const rules = obj.hasOwnProperty('rulesConvertor') ? obj.rulesConvertor() : {}
    const validators = obj.hasOwnProperty('validators') ? obj.validators() : {}

    for (const [key, val] of Object.entries(obj)) {
        if (typeof obj[key] !== 'function' && 'notRequired' !== key) {
            let oForm = { value: rules[key] ? rules[key](val) : val, required: notRequired.hasOwnProperty(key) ? false : true, changed: 0 < obj.id ? false : true };

            if (defaultValue && defaultValue.hasOwnProperty(key)) {
                oForm = { ...oForm, value: defaultValue[key], error: '', isValid: true }
            }

            if (forceValid) {
                oForm = { ...oForm, error: '', isValid: true }
            }

            if (validators[key]) {
                oForm = { ...oForm, validator: validators[key] }
            }

            formValidation[key] = oForm;
        }
    }

    return formValidation;
}

export const getObjectFromFormValidation = (objVal) => {
    let obj = {};

    for (const key of Object.keys(objVal)) {
        obj[key] = objVal[key].value;
    }

    return obj;
}

export const emailValidator = (email) => {
    return REGEX_EMAIL.test(email);
}

export const passwordStrengthValidator = (password) => {
    return REGEX_PASSWORD_STRENGTH.test(password);
}

export const urlChecker = (url) => {
    return REGEX_URL_START.test(url);
}
