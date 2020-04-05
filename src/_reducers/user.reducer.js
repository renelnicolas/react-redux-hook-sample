import { getItem as storageGetItem, removeItem as storageRemoveItem } from '../_helpers/storage'

const user = storageGetItem('user');
const initialState = user ? { loggedIn: true, user } : {};

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                loggedIn: true
            }
        case "LOG_OUT":
            storageRemoveItem('user');
            return {}
        default:
            return state
    }
}

export default currentUser;
