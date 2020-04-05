export default class QueryFilter {
    offset = 0;
    limit = 50;
    page = 0;
    count = 0;
    sort = "asc";
    order = "name";
    search = "";

    constructor(initial = {}) {
        Object.assign(this, initial);
    }
}
