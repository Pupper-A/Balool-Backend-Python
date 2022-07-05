import axios from "axios";
import { USER_TOGGLE_REQUEST,
         USER_TOGGLE_SUCCESS,
         USER_TOGGLE_FAIL    
        }
        from '../constants/toggleConstants';

export const sendToggle = (userId, isToggled) => async (dispatch) => {
    try{
        dispatch({
            type: USER_TOGGLE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json "
            }
        }

        const {data} = await axios.post(
            "/api/users/toggle/",
            {"user_id": userId, "is_toggled": isToggled},
            config
            )

        dispatch({
            type: USER_TOGGLE_SUCCESS,
            payload: data
        })

        localStorage.setItem("toggleInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_TOGGLE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}