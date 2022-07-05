import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Card, Button, Image, Alert } from 'react-bootstrap';
import { MDBCol } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { people } from '../actions/peopleActions';
import { followRequest, getFollow } from '../actions/followActions';

import axios from 'axios';

function FindPeople() {

    const [message, setMessage] = useState("")
    const [variant, setVariant] = useState("")

    const dispatch = useDispatch()

    
    const peopleSelector = useSelector(state => state.people)
    
    const followSelector = useSelector(state => state.follow)
    
    const getFollowSelector = useSelector(state => state.getFollow)
    
    const redirect = "/"
    
    const history = useNavigate()

    const OnChangeHandler = (e) => {
        const value = e.target.value
        dispatch(people(value))
    }

    let token = ""
    
    let jsonUser = ""
    
    let followStatus = ""
    
    let color = ""
    
    let following_list = []

    if(localStorage.getItem("userInfo")){
        jsonUser = JSON.parse(localStorage.getItem("userInfo"))

    }
    
    useEffect(()=>{
        const user = localStorage.getItem("userInfo")

        if(!user){
            history(redirect)
        }

        token = "Bearer " + jsonUser.token
        
        dispatch(getFollow(token))
    },[])

    const followHandler = (id) => {
        window.scrollTo(0, 0);
        const action = id.target.innerHTML
        id = id.target.value
        const user_id = JSON.parse(localStorage.getItem("userInfo")).id

        dispatch(followRequest(user_id, id, action))
        window.location.reload()

        if (action == "Follow"){
            setMessage("Followed!")
            setVariant("success")
        }else if(action == "Unfollow"){
            setMessage("Unfollowed!")
            setVariant("danger")
        }else{
            setMessage("Canceled Follow Request!")
            setVariant("warning")
        }
    }
    
  return (
      
      <Container>
          {getFollowSelector.loading && <Loader />}<br></br>
          {message && <Alert variant={variant}>{message}</Alert>}
            {
                getFollowSelector.allFollowInfo ? getFollowSelector.allFollowInfo[0].map((element)=>{
                    following_list.push([element.followed_user, element.status])
                }) : ""
            }
        <Row>
            <Col></Col>
                <MDBCol md="6">
                    <div className="active-pink-3 active-pink-4 mb-4">
                        <input onChange={(e) => OnChangeHandler(e)} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                </MDBCol>
            
            <Col></Col>
        </Row>
        
        {peopleSelector.peopleInfo && peopleSelector.peopleInfo.map((e)=>{
            const id = e[0].id
            return(
                <Row key={e[0].id}>
                    <Col className='col-md-6 mx-auto' >
                        <Card className="text-center my-3" >
                            <Card.Header style={{ backgroundColor: "#cadbda", boxShadow: "0px 0px 6px 1px gray"}}>
                                {e[0].username}
                            </Card.Header>
                            <Card.Body>
                                {e[0].avatar && (<Card.Title><Image src={(e[0].avatar)} roundedCircle width={40} alt=""></Image></Card.Title>)}
                                <Card.Text>{e[0].first_name} {e[0].last_name}</Card.Text>
                                <Card.Text className={(e[1]=="Private" ? "bg-warning py-2 text-primary" : (e[1]===true ? "bg-success py-2 text-primary": "bg-info py-2 text-primary"))} style={{boxShadow: "0px 1px 3px 1px gray"}}>{(e[1] == "Private" ? e[1] : e[1]===true ? "Happy": "Sad")}</Card.Text>
                                
                                    {
                                        following_list.find(element => element[0] == e[0].id) ?
                                            
                                            (
                                                    following_list.find(element => element[1] == "pending" & element[0] == e[0].id) ?
                                                    (jsonUser.id == e[0].id ? <></> :
                                                    <Button value={id} onClick={followHandler}
                                                    variant="warning">Pending</Button>)

                                                :
                                                    (jsonUser.id == e[0].id ? <></> :
                                                    <Button value={id} onClick={followHandler}
                                                    variant="danger">Unfollow</Button>)
                                            )
                                                
                                            :

                                            (
                                                (jsonUser.id == e[0].id ? <></> :
                                                <Button value={id} onClick={followHandler}
                                                variant="primary">Follow</Button>)
                                            )
                                        }

                                        
                                    
                                     
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        })}
    </Container>
  )
}

export default FindPeople