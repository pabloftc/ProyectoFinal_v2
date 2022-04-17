import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar, Container, Form, Button, Nav, FormControl } from 'react-bootstrap';

import SayanImageUrl from "../../img/logo.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

import '../../styles/home.css';
import { LogoutButton } from "./logoutButton";
// import state from "sweetalert/typings/modules/state";


export const Navbars = () => {
  const { store, actions } = useContext(Context);
  const isLoggedIn = store.isLoggedIn
  //  const token = sessionStorage.getItem("token");
  //Manejo de estado para el renderizado del botón login y logout 
  //  const [isLoggedIn, setIsLoggedIn] = useState(False);
  //  useEffect(() => {
  //    state.actions.getIsLoggedIn();
  //  }, []);
  //  console.log('TOKEN: ', token)
	return (
		<>
		<Navbar bg="light" expand="lg">
  	<Container fluid>
  	<Link to="/">
    <Navbar.Brand><img src={SayanImageUrl} style={{ width: '300px', height: "70px"}}/></Navbar.Brand>
	</Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/" className="navpaginas">Home</Nav.Link>
        <Nav.Link href="cursos" className="navpaginas"><p>Cursos</p></Nav.Link>
        <Nav.Link href="precios" className="navpaginas"><p>Precios</p></Nav.Link>
        <Nav.Link href="favoritos" className="navpaginas"><p>Favoritos</p></Nav.Link>
        <Nav.Link href="sobrenosotros" className="navpaginas"><p>Sobre Nosotros</p></Nav.Link>
      
      </Nav>
    {/* ! significa contrario al valor del booleano  */}
     { ! isLoggedIn ? <Link to="/login">
      <Button variant="outline-primary" style={{marginRight: '5px'}}>Log In
      </Button> 
      </Link> :<></> }
      {! isLoggedIn ? <Link to="/register"> 
        <Button variant="primary" style={{marginRight: '5px'}}>Sign Up</Button>
      </Link> : <></> }
     { ! isLoggedIn ? <></> : <LogoutButton /> }
        <Link to="/compra">
             <FontAwesomeIcon icon={faBagShopping} className="bagshopping" />
        </Link>
         <span className="productosencarrito">0</span>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
	);
};
