import React, { useContext } from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
    <header>
            <Navbar expand="md">
                <Container>
                    <Navbar.Brand className='font-weight-bold' as={Link}  to="/">Online Book Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto mr-3 mt-2 snip1284">
                            <Nav.Link as={Link} className='current'  to="/home">Home</Nav.Link>
                            <Nav.Link as={Link}  to="/order">Order</Nav.Link>
                            <Nav.Link as={Link}  to="/checkout">CheckOut</Nav.Link>
                        </Nav>
                        <Button as={Link}  to="/admin/addbook" className ="mr-2" variant="dark">Admin</Button>
                        {
                            loggedInUser.isSignIn ?  <Image style={{cursor:"pointer"}} width='55px' src={loggedInUser.photo}roundedCircle />
                            : <Button as={Link}  to="/login" className ="mr-2" variant="success">Log In</Button>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </header>
    );
};

export default Header;