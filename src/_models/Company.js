import Country from "./Country";
import { isEmpty } from '../_helpers/utils'

export default class Company {
    id = null;
    name = null;
    contact_email = null;
    rcs = null;
    vat = null;
    address = null;
    city = null;
    zip_code = null;
    country = new Country();
    phone = null;
    enabled = false;
    created_at;
    updated_at;

    notRequired = {
        phone: true,
        enabled: true
    }

    constructor(company) {
        if (!isEmpty(company)) {
            this.id = company.id;
            this.name = company.name;
            this.contact_email = company.contact_email;
            this.rcs = company.rcs;
            this.vat = company.vat;
            this.address = company.address;
            this.city = company.city;
            this.zip_code = company.zip_code;
            this.country = company.country;
            this.phone = company.phone;
            this.enabled = company.enabled;
        }

        this.storage_at = new Date();
    }
}
