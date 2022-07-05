import axios from 'axios';
import {
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
}
from '../constants/followConstants';

export const followRequest = (followed_by, followed, action) => async (dispatch) => {
    try{
        dispatch({
            type: FOLLOW_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json "
            }
        }

        const {data} = await axios.post(
            "/api/users/follow/",
            {
                "followed_by": followed_by,
                "followed": followed,
                "action": action,
            },
            config
            )

        dispatch({
            type: FOLLOW_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: FOLLOW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getFollow = (token) => async (dispatch) => {
    try{
        dispatch({
            type: FOLLOW_REQUEST
        })

        const config = {
            headers: {
                "Authorization": token
            }
        }

        const {data} = await axios.get(
            "/api/users/follow/",
            config
            )

        dispatch({
            type: FOLLOW_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: FOLLOW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}