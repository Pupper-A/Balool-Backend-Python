import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

function LoginScreen(location) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history= useNavigate();
    
    const redirect = location.search ? location.search.split("=")[1] : "/"

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

  return (
      
    <FormContainer>
        <h1>Log In</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="my-4">
            <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='Username'
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

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

            <Button type='submit' variant='primary'>Log In</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New User? <Link
                            to={redirect ? `/signup?redirect=${redirect}` : '/signup'}

                            >Sign Up
                          </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen