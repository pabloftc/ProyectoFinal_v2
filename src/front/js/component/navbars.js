import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar, Container, Form, Button, Nav, FormControl } from 'react-bootstrap';

import SayanImageUrl from "../../img/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

import "../../styles/home.css";
import { LogoutButton } from "./logoutButton";
// import state from "sweetalert/typings/modules/state";

export const Navbars = () => {
  const { store, actions } = useContext(Context);
  const isLoggedIn = store.isLoggedIn;
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
    <Navbar.Brand><img src={SayanImageUrl} style={{ width: '200px', height: "50px"}}/></Navbar.Brand>
	</Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/" className="navpaginas">Home</Nav.Link>
        <Nav.Link href="/cursos" className="navpaginas"><p>Cursos</p></Nav.Link>
        { isLoggedIn ? <> <Link to="/miscursos">
        <Nav.Link href="/miscursos" className="navpaginas"><p>MisCursos</p></Nav.Link>
         </Link>
        </>
        : <></>
        }
        {sessionStorage.getItem("rol") == "Admin" ? <>
        <Nav.Link href="usuarios" className="navpaginas">Usuarios</Nav.Link>
        <Nav.Link href="todosloscursos" className="navpaginas">All Cursos</Nav.Link>
        </>
      : <></>}
      
      </Nav>
    {/* ! significa contrario al valor del booleano  */}
     { ! isLoggedIn ? <Link to="/login">
      <Button variant="outline-primary btn-lg" style={{marginRight: '5px'}}>Log In
      </Button> 
      </Link> :<></> }
      {! isLoggedIn ? <Link to="/register"> 
        <Button className="me-5" variant="primary btn-lg" style={{marginRight: '5px'}}>Sign Up</Button>
      </Link> : <></> }
     { ! isLoggedIn ? <></> : <LogoutButton /> }
        
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
	);
};
