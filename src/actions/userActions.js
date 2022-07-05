import axios from "axios";
import { USER_LOGIN_REQUEST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAIL,

         USER_LOGOUT,

         USER_REGISTER_REQUEST,
         USER_REGISTER_SUCCESS,
         USER_REGISTER_FAIL,
        } from '../constants/userConstants';

export const login = (username, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json "
            }
        }

        const {data} = await axios.post(
            "/api/users/login/",
            {"username": username, "password": password},
            config
            )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem("userInfo")
    localStorage.removeItem("toggleInfo")
    dispatch({type: USER_LOGOUT})
}

export const register = (first_name, last_name, username, email, avatar, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const {data} = await axios.post(
            "/api/users/signup/",
            {
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "email": email,
                "avatar": avatar,
                "password": password,
            },
            config
            )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}