import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { sendToggle } from '../actions/toggleActions';
import axios from "axios";

function DashboardScreen() {
    const [toggle, setToggle] = useState("")
    const [time, setTime] = useState("")
    const [message, setMessage] = useState("")
    const [limit, setLimit] = useState("")

    const history = useNavigate();
    
    let redirect = ""
    
    const dispatch = useDispatch()
    
    const userToggle = useSelector(state => state.toggle)

    const {error, loading} = userToggle

    let token = null
    
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")

        if(userInfo){
            token = "Bearer " + JSON.parse(userInfo).token
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
                    a = new Date(response.data.toggled_time)
                    setToggle(response.data.is_toggled)
                    
                }else if(!localStorage.getItem("userInfo")){
                    redirect = "/"
                    history(redirect)
                }else{
                    redirect = "/new-user"
                    history(redirect)
                }
                
            })
        }
        
        let a = null

        getToggleInfo()

        if(time<10){
            setLimit(false)
            setToggle(toggle)
        }

        setInterval(() => {
            let b = new Date()
            let def = Math.round((b-a)/60000)
            setTime(String(def))

        }, 1000);

    }, [limit])

    const toggleHandler = (checked) => {
        if(time < 10 ){
            setLimit(true)
            setMessage("For your goodness and our database, stay on your mood at least 10 minutes ;)")
        }else{
            setTime(0)
            var bool = 0
            setToggle(checked)
            if(toggle === ""){
                bool = 1
            }else if(toggle == true){
                bool = 0
            }else{
                bool = 1
            }
            const userId = JSON.parse(localStorage.getItem("userInfo")).id
            dispatch(sendToggle(userId, bool))
            window.location.reload()
        }
  }

  return (
      <Container>
        {loading && <Loader />}
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
        <Row>
        <Col></Col>
        <Col className="my-5 py-5 text-center">
            <p>What is your MOOD?</p>
            <BootstrapSwitchButton
             checked={toggle} 
             width={200} 
             height={100} 
             onlabel="Happy" 
             offlabel='Sad' 
             onstyle='success' 
             offstyle='info' 
             style="border" 
             onChange={toggleHandler}
             onClick={toggleHandler}
             />
             <p>{time && (time < 60 ? time + " Minutes" : Math.round(time/60) + " Hours")}</p>
        </Col>
        <Col></Col>
        </Row>
      </Container>
      
  )
}

export default DashboardScreen