import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import PaginaInicial from "./paginaInicial";
import CourseInscription from "./courseInscription";
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
      <Row className="p-5 mb-3">
        <Col className="pt-5">
          <h1 className="pb-3 display-2">Cursos SayanDevelopers</h1>
          <h4 className="pb-3">
            Aprende lo que quieras y a tu ritmo!
          </h4>
          <Link to={`/register`}>
            <Button variant="primary" size="lg">
              Sign up
            </Button>
          </Link>{" "}
          <Link to={`/Login`}>
            <Button variant="outline-primary" size="lg">
              Login
            </Button>
          </Link>
        </Col>
        <Col>
          <Image fluid src={Hero} />
        </Col>
      </Row>
      <PaginaInicial className="mb-3" />
    </Container>
  );
};
