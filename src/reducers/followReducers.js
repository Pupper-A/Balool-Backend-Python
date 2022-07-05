import {
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
}
from '../constants/followConstants';

export const followReducer = (state = { }, action) => {
    switch (action.type) {
        case FOLLOW_REQUEST:
            return {
                loading: true,
            }

        case FOLLOW_SUCCESS:
            return {
                loading: false, followInfo: action.payload
            }

        case FOLLOW_FAIL:
            return {
                loading: false, error: action.payload
            }

            default:
                return state
    }
}

export const getFollowReducer = (state = { }, action) => {
    switch (action.type) {
        case FOLLOW_REQUEST:
            return {
                loading: true,
            }

        case FOLLOW_SUCCESS:
            return {
                loading: false, allFollowInfo: action.payload
            }

        case FOLLOW_FAIL:
            return {
                loading: false, error: action.payload
            }

            default:
                return state
    }
}