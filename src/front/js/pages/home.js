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
        <Col className="pt-5" md={6}>
          <h1 className="pb-3 display-1 fw-bold mt-4 mb-4 home-title">
            Cursos SayanDevelopers
          </h1>
          <h4 className="pb-3 mb-5">Aprende lo que quieras, a tu ritmo!</h4>
          <Link to={`/register`}>
            <Button className="fs-4" variant="primary" size="lg">
              Sign up
            </Button>
          </Link>{" "}
          <Link to={`/Login`}>
            <Button className="fs-4" variant="outline-primary" size="lg">
              Log In
            </Button>
          </Link>
        </Col>
        <Col>
          <Image fluid src={Hero} />
        </Col>
      </Row>
      <div>
        <PaginaInicial className="mb-3" />
      </div>
    </Container>
  );
};
