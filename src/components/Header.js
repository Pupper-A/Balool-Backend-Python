import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
      dispatch(logout())
      window.location.reload()
    }

    return (
        <header>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>

              <LinkContainer to="/">
                <Navbar.Brand>ToggleMedia</Navbar.Brand>
              </LinkContainer>
              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                  {userInfo ? (
                    <>
                      {userInfo.is_private ? <i class="fa-solid fa-lock lock"></i> : <i class="fa-solid fa-lock-open lock"></i>}
                      <NavDropdown title={userInfo.username} id="username">
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                      <LinkContainer to="/stats">
                        <Nav.Link><i className="fa fa-line-chart" aria-hidden="true"></i>Stats</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/people">
                        <Nav.Link>Find People</Nav.Link>
                      </LinkContainer>
                    </>
                    

                  ) : (
                    
                    <>
                      <LinkContainer to="/login">
                        <Nav.Link><i className="fa fa-sign-in" aria-hidden="true"></i>Log In</Nav.Link>
                      </LinkContainer><LinkContainer to="/signup">
                        <Nav.Link><i className="fa fa-user-plus" aria-hidden="true"></i>Sign Up</Nav.Link>
                      </LinkContainer>
                    </>
                    
                  )}

                  <LinkContainer to="/contact-us">
                    <Nav.Link><i className="fa fa-address-book" aria-hidden="true"></i>Contact Us</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/about-us">
                    <Nav.Link><i className="fa fa-info-circle" aria-hidden="true"></i>About Us</Nav.Link>
                  </LinkContainer>

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    );
  }
  
export default Header;