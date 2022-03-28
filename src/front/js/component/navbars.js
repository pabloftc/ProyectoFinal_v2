import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Form, Button, Nav, FormControl } from 'react-bootstrap';

import SayanImageUrl from "../../img/logo.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import '../../styles/home.css';


export const Navbars = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link to="/">
            <Navbar.Brand><img src={SayanImageUrl} style={{ width: '300px', height: "70px" }} /></Navbar.Brand>
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
            <Form className="d-flex" style={{ marginRight: '5px' }}>
              <FormControl
                type="search"
                placeholder="Search . . ."
                className="me"
                aria-label="Search"
              />
              <Button variant="outline-secondary"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
            </Form>
            <Link to="/login">
              <Button variant="outline-primary" style={{ marginRight: '5px' }}>Log In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" style={{ marginRight: '5px' }}>Sign Up</Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};