import axios from 'axios';
import {
    PEOPLE_REQUEST,
    PEOPLE_SUCCESS,
    PEOPLE_FAIL,
}
from '../constants/peopleConstants';

export const people = (startWith) => async (dispatch) => {
    try{
        dispatch({
            type: PEOPLE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json "
            }
        }

        const {data} = await axios.post(
            "/api/users/people/",
            {"startWith": startWith},
            config
            )

        dispatch({
            type: PEOPLE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PEOPLE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}