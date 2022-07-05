import { PROFILE_REQUEST,
        PROFILE_SUCCESS,
        PROFILE_FAIL    
   }
   from '../constants/profileConstants';

   export const profileReducer = (state={ }, action ) => {
    switch(action.type){
        case PROFILE_REQUEST:
            return {loading: true}

        case PROFILE_SUCCESS:
            return {loading: false, userInfo: action.payload}
        
        case PROFILE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}