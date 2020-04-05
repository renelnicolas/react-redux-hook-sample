const REGEX_EMAIL = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD_STRENGTH = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/

export const isEmpty = (data) => {
    return undefined === data || Object.keys(data).length === 0;
}

export const getFormValidationFromObject = (obj, defaultValue, forceValid = false) => {
    let formValidation = {};
    const notRequired = obj.hasOwnProperty('notRequired') ? obj.notRequired : {}

    for (const [key, val] of Object.entries(obj)) {
        if (typeof obj[key] !== 'function' && 'notRequired' !== key) {
            let oForm = { value: val, required: notRequired.hasOwnProperty(key) ? false : true };

            if (defaultValue && defaultValue.hasOwnProperty(key)) {
                oForm = { ...oForm, value: defaultValue[key], error: '', isValid: true }
            }

            if (forceValid) {
                oForm = { ...oForm, error: '', isValid: true }
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
