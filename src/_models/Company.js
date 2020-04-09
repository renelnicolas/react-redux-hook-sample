import Country from "./Country";

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

    constructor(initial = {}) {
        Object.assign(this, initial);

        this.storage_at = new Date();
    }
}
