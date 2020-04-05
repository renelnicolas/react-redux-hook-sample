import { isEmpty } from '../_helpers/utils'

export default class Country {
    id = null;
    name = null;
    iso = null;
    flag = null;
    created_at;
    updated_at;

    constructor(entity) {
        if (!isEmpty(entity)) {
            this.id = entity.id;
            this.name = entity.name;
            this.iso = entity.iso;
            this.flag = entity.flag;
        }
    }
}
