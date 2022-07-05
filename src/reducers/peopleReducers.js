import {
    PEOPLE_REQUEST,
    PEOPLE_SUCCESS,
    PEOPLE_FAIL,
}
from '../constants/peopleConstants';

export const peopleReducer = (state = { }, action) => {
    switch (action.type) {
        case PEOPLE_REQUEST:
            return {
                loading: true,
            }

        case PEOPLE_SUCCESS:
            return {
                loading: false, peopleInfo: action.payload
            }

        case PEOPLE_FAIL:
            return {
                loading: false, error: action.payload
            }

            default:
                return state
    }
}