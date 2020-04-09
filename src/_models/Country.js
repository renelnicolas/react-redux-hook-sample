export default class Country {
    id = null;
    name = null;
    iso = null;
    flag = null;
    created_at;
    updated_at;

    constructor(initial = {}) {
        Object.assign(this, initial);
    }
}
