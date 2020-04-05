import Company from "./Company";
import Country from "./Country";

export default class EntityUser {
    id = null;
    firstName = null;
    lastName = null;
    email = null;
    company = new Company()
    country = new Country();
    phone = null;
    enabled = false;
    password = '';
    password_validation = '';
    registred_at;
    created_at;

    notRequired = {
        phone: true,
        enabled: true,
        password: true,
        password_validation: true,
    }
}
