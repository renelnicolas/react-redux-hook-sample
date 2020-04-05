export default class BreadcrumbPath {
    path = null;
    depth = [];

    constructor(path, depth) {
        this.path = path;
        this.depth = depth;
    }
}
