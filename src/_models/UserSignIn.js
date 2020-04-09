import Company from "./Company";
import Country from "./Country";

export default class EntityUserSignIn {
    id = null;
    firstName = null;
    lastName = null;
    token = null;
    company = new Company();
    country = new Country();
    roles = ['USER'];

    constructor(initial = {}) {
        Object.assign(this, initial);

        this.storage_at = new Date();
    }
}
