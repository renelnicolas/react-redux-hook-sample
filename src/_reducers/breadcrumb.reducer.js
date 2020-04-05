import BreadcrumbPath from '../_models/BreadcrumbPath'

const initialState = new BreadcrumbPath("/", []);

const breadcrumb = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_VIEW":
            return { ...state, ...action.path }
        default:
            return state
    }
}

export default breadcrumb;
