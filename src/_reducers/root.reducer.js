import { combineReducers } from 'redux';

import layoutDrawer from './layoutDrawer.reducer'
import currentUser from './user.reducer'
import breadcrumb from './breadcrumb.reducer'

const rootReducer = combineReducers({
    layoutDrawer,
    currentUser,
    breadcrumb,
});

export default rootReducer;
