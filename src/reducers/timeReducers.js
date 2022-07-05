import {
    TIME_REQUEST,
    TIME_SUCCESS,
    TIME_FAIL,
}
from '../constants/timeConstants';

export const timeReducer = (state = {timeInfo: []}, action) => {
    switch (action.type) {
        case TIME_REQUEST:
            return {
                loading: true,
                timeInfo: []
            }

        case TIME_SUCCESS:
            return {
                loading: false, timeInfo: action.payload
            }

        case TIME_FAIL:
            return {
                loading: false, error: action.payload
            }

            default:
                return state
    }
}