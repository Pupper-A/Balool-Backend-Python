import axios from "axios";
import { PROFILE_REQUEST,
         PROFILE_SUCCESS,
         PROFILE_FAIL    
        }
        from '../constants/profileConstants';

export const profile = (userId, username, first_name, last_name, avatar, password, is_private) => async (dispatch) => {
    try{
        dispatch({
            type: PROFILE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const {data} = await axios.post(
            "/api/users/profile/",
            {
                "id": userId,
                "username": username,
                "avatar": avatar,
                "firstName": first_name,
                "lastName": last_name,
                "password": password,
                "is_private": is_private,
            },
            config
            )

        dispatch({
            type: PROFILE_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}