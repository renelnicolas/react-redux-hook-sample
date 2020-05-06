import { combineReducers } from 'redux';

import layoutDrawer from './layoutDrawer.reducer'
import currentUser from './user.reducer'
import breadcrumb from './breadcrumb.reducer'
import entity from './entity.reducer'


const rootReducer = combineReducers({
    layoutDrawer,
    currentUser,
    breadcrumb,
    entity,
});

export default rootReducer;
