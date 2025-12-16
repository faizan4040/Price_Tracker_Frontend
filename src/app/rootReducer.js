import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../feature/authSlice.js';
import { authApi } from '../feature/api/authapi.js';

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer,
});
 
export default rootReducer;