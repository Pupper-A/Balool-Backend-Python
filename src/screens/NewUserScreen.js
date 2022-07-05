import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, ButtonGroup} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { sendToggle } from '../actions/toggleActions';
import axios from 'axios';

function NewUserScreen() {
    const [userName, setUserName] = useState("")
    const [mood, setMood] = useState("")

    const history= useNavigate();

    const dispatch = useDispatch()

    let redirect = ""

    let token = null

    useEffect(() =>{
        if(localStorage.getItem("userInfo")){
            const user = JSON.parse(localStorage.getItem("userInfo"))

            token = "Bearer " + user.token

            setUserName(user.first_name)

        }else{
            redirect = "/"
            history(redirect)
        }

        async function getToggleInfo(){
            const config = {
                headers: {
                    "Authorization": token
                }
            }
            
            await axios.get("/api/users/toggle/", config).then((response) => {
                if(response.data){
                    redirect = "/dashboard"
                    history(redirect)
                }else if(!localStorage.getItem("userInfo")){
                    redirect = "/"
                    history(redirect)
                }else{
                    redirect = "/new-user"
                    history(redirect)
                }
                
            })
        }

        getToggleInfo()
        
    },[mood])

    const onClickHandler = (e) => {
        setMood(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("userInfo"))
        if (mood == "happy"){
            dispatch(sendToggle(user.id, 1))
        }else{
            dispatch(sendToggle(user.id, 0))
        }

        redirect = "/dashboard"
        history(redirect)
    }

  return (
    <FormContainer>
        <h1>Hey {userName}!</h1>
        <h3>What is Your Mood?</h3>
        <Form onSubmit={submitHandler} className="my-5">
            <ButtonGroup aria-label="Basic example" size="lg">
                <Button onClick={(e)=>{onClickHandler(e)}} variant="success" value="happy">Happy</Button>
                <Button onClick={(e)=>{onClickHandler(e)}} variant="info" value="sad">Sad</Button>
            </ButtonGroup>
            <div className="d-grid gap-2">
                {mood && (<Button type='submit' variant='primary' className="my-5" size="sx">I am {mood=="happy" ? mood + " :)" : mood + " :("}</Button>)}
            </div>
        </Form>
    </FormContainer>
  )
}

export default NewUserScreen