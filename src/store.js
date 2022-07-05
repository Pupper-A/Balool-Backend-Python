import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { toggleReducer } from './reducers/toggleReducers';
import { timeReducer } from './reducers/timeReducers';
import { peopleReducer } from './reducers/peopleReducers';
import { profileReducer } from './reducers/profileReducers';
import { followReducer, getFollowReducer } from './reducers/followReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    toggle: toggleReducer,
    time: timeReducer,
    people: peopleReducer,
    profile: profileReducer,
    follow: followReducer,
    getFollow: getFollowReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;