import QueueType from "./QueueType";
import { urlChecker } from "./../_helpers/utils"

/**
 *
 */
export default class QueueScheduler {
    id = null;
    name = null;
    url = null;
    url_hash = null;
    enabled = false;
    config = {};
    last_schedule_at = null;
    external_id = null;
    queue_type = new QueueType();

    constructor(initial = {}) {
        Object.keys(initial).filter(key => key in this).forEach(key => {
            this[key] = initial[key];
        });
    }

    notRequired = _ => {
        return {
            id: true,
            external_id: true,
            url_hash: true,
            last_schedule_at: true,
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
            name: (newField) => {
                if ('' === newField.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                return newField;
            },
            url: (newField) => {
                if ('' === newField.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                    return newField;
                }

                if (!urlChecker(newField.value)) {
                    newField.error = 'It\'s not a valid url';
                    newField.isValid = false;
                    return newField;
                }
                return newField;
            },
            queue_type: (newField) => {
                if(null === newField.value.id) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                return newField;
            },
            config: (newField) => {
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
