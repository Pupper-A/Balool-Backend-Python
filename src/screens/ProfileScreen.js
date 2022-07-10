import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Alert, Image, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { profile } from '../actions/profileActions';

function ProfileScreen() {
    const [id, setId] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [currentAvatar, setCurrentAvatar] = useState('')
    const [color, setColor] = useState('')
    const [isPrivate, setIsPrivate] = useState("");

    const history = useNavigate()

    const dispatch = useDispatch()
    
    const userSelector = useSelector(state => state.profile)

    const {error, loading, userInfo} = userSelector
    
    const user = localStorage.getItem("userInfo")

    let redirect = ""
    
    useEffect(()=>{
        if(user){
            const jsonUserInfo = JSON.parse(user)
            setFirstName(jsonUserInfo.first_name)
            setLastName(jsonUserInfo.last_name)
            setUsername(jsonUserInfo.username)
            setEmail(jsonUserInfo.email)
            setCurrentAvatar(jsonUserInfo.avatar)
            setId(jsonUserInfo.id)
            
        }else{
            redirect = "/"
            history(redirect)
        }

        if(userInfo){
            setFirstName(userInfo.first_name)
            setLastName(userInfo.last_name)
            setUsername(userInfo.username)
            setEmail(userInfo.email)
            setCurrentAvatar(userInfo.avatar)
            setId(userInfo.id)
        }

    },[userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        setUsername(username.trim())
        setFirstName(first_name.trim())
        setLastName(last_name.trim())
        setPassword(password.trim())
        setConfirmPassword(confirmPassword.trim())


        if(password != confirmPassword){
            setMessage("Passwords do not match!")
            setColor("danger")

        }else if(password.length < 8 && password.length > 0){
            setMessage("Password must be at least 8 characters!")
            setColor("danger")
        }else{
            dispatch(profile(id, username, first_name, last_name, avatar, password, isPrivate))
            setMessage("Your Profile info changed successfuly.")
            setColor("success")
        }
    }

    const handleImageChange = (e) => {
        let newAvatar = avatar;
        newAvatar = e.target.files[0];
        setAvatar(newAvatar);
    };

    const handleChange = (e) => {
        const value = e.target.value
        setIsPrivate(value)
    }



    return (
        <FormContainer>
            {loading && <Loader />}
            <Image src={currentAvatar && currentAvatar} width={60} roundedCircle></Image>
            {message && <Alert variant={color} className="my-3">{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={submitHandler} className="my-4">
                <Row>
                    <Col>
                        <Form.Group controlId='first_name'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder='Firstname'
                                value = {first_name}
                                onChange = {(e) => setFirstName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='last_name' >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder='Lastname'
                                value = {last_name}
                                onChange = {(e) => setLastName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId='username' className="my-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder='Username'
                                value = {username}
                                onChange = {(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='email' className="my-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                required
                                type = "email"
                                placeholder='Email'
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId='avatar' className="my-3">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                        type = "file"
                        onChange={(e) => {handleImageChange(e);}}
                    >
                    </Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId='password' className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type = "password"
                                placeholder='Password'
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='conf_password' className="my-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type = "password"
                                placeholder='Confirm Password'
                                value = {confirmPassword}
                                onChange = {(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <ToggleButtonGroup type="checkbox" className="" >
                <ToggleButton id="tbg-btn-1" size="sm" value={0} onChange={(e) => handleChange(e)} variant="warning"  >
                    Public
                </ToggleButton>
                <ToggleButton id="tbg-btn-2 py-2" size="sm" value={1} onChange={(e) => handleChange(e)} variant="info">
                    Private
                </ToggleButton>
            </ToggleButtonGroup><br></br>
                <Button type='submit' variant='primary' className='my-2'>Change</Button>
            </Form>
        </FormContainer>
    )
    }

export default ProfileScreen