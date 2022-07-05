import {
    TIME_REQUEST,
    TIME_SUCCESS,
    TIME_FAIL,
}
from '../constants/timeConstants';
import axios from 'axios';

export const time = (token) => async (dispatch) => {
    try{
        dispatch({
            type: TIME_REQUEST
        })

        const config = {
            headers: {
                "Authorization": token
            }
        }

        const {data} = await axios.get("/api/users/time/", config)

        dispatch({
            type: TIME_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: TIME_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}