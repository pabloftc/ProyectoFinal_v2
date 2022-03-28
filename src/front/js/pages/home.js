import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import PaginaInicial from "./paginaInicial";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Hero from "../../img/foto-fome.jpg";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <Container>
      <Row className="p-5">
        <Col className="pt-5">
          <h1 className="pb-3">Cursos SayanDevelopers</h1>
          <p className="pb-3">
            Ven y danos tu dinero por ver videos de YouTube que podrías ver
            gratis
          </p>
          <Button variant="primary">
            <Link to={`/Signup`} className="btn-signup">
              Sign up
            </Link>
          </Button>{" "}
          <Button variant="outline-primary">
            <Link to={`/Login`} className="btn-login">
              Login
            </Link>
          </Button>
        </Col>
        <Col>
          <Image fluid src={Hero} />
        </Col>
      </Row>
      <PaginaInicial />
    </Container>
  );
};
