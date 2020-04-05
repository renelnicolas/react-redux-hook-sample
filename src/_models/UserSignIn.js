import Company from "./Company";
import Country from "./Country";

import { isEmpty } from '../_helpers/utils'

export default class EntityUserSignIn {
    id = null;
    firstName = null;
    lastName = null;
    token = null;
    company = new Company();
    country = new Country();
    roles = ['USER'];

    constructor(user) {
        if (!isEmpty(user)) {
            this.id = user.id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.token = user.token;
            this.company = user.company;
            this.country = user.country;
            this.roles = user.roles;
        }

        this.storage_at = new Date();
    }
}
