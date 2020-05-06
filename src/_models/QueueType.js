/**
 *
 */
export default class QueueType {
    id = null;
    name = null;
    config = '';
    external_id = null;
    enabled = false;

    constructor(initial = {}) {
        Object.keys(initial).filter(key => key in this).forEach(key => {
            this[key] = initial[key];
        });
    }

    notRequired = _ => {
        return {
            id: true,
            external_id: true,
            enabled: true,
        }
    }

    rulesConvertor = _ => {
        return {
            config: (config) => JSON.stringify("" === config ? {} : config),
        }
    }

    validators = _ => {
        return {
            name : (newField) => {
                if ('' === newField.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                return newField;
            },
            config : (newField) => {
                if ('' === newField.value || '{}' === newField.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                    return newField;
                }

                try {
                    JSON.parse(newField.value);
                } catch (e) {
                    newField.error = 'Not a valid JSON';
                    newField.isValid = false;
                    return newField;
                }

                return newField;
            }
        }
    }
}
