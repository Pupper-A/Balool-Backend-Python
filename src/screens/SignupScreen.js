import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

function SignupScreen(location) {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const history= useNavigate();
    
    const redirect = location.search ? location.search.split("=")[1] : "/"

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage("Passwords do not match!")
        }else if(first_name.trim() == ""){
            setMessage("First name can not be blank!")
        }else if(last_name.trim() == ""){
            setMessage("Last name can not be blank!")
        }else if(username.trim() == ""){
            setMessage("Username can not be blank!")
        }else if(password.length < 8){
            setMessage("Password must be at least 8 characters!")
        }else{
            dispatch(register(first_name, last_name, username, email, avatar, password))
        }
    }

    const handleImageChange = (e) => {
        let newAvatar = avatar;
        newAvatar = e.target.files[0];
        setAvatar(newAvatar);
    };
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="my-4">
            <Form.Group controlId='first_name'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    required
                    type = "text"
                    placeholder='Firstname'
                    value = {first_name}
                    onChange = {(e) => setFirstName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='last_name' className="my-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    required
                    type = "text"
                    placeholder='Lastname'
                    value = {last_name}
                    onChange = {(e) => setLastName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='username' className="my-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    required
                    type = "text"
                    placeholder='Username'
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type = "email"
                    placeholder='Email'
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='avatar' className="my-3">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                    type = "file"
                    onChange={(e) => {handleImageChange(e);}}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type = "password"
                    placeholder='Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='conf_password' className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type = "password"
                    placeholder='Confirm Password'
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Sign Up</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Have an Account? <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                >Log In
                            </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default SignupScreen