import { USER_TOGGLE_REQUEST,
         USER_TOGGLE_SUCCESS,
         USER_TOGGLE_FAIL    
        }
        from '../constants/toggleConstants';

export const toggleReducer = (state={ }, action ) => {
    switch(action.type){
        case USER_TOGGLE_REQUEST:
            return {loading: true}

        case USER_TOGGLE_SUCCESS:
            return {loading: false, toggleInfo: action.payload}
        
        case USER_TOGGLE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}
