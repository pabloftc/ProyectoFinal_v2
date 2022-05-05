import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import YouTube from "../component/youTube";
import { Link } from "react-router-dom";

export default function CourseDetail() {
  const { store, actions } = useContext(Context);
  const [carrito, setCarrito] = useState([]);
  const isLoggedIn = store.isLoggedIn;
  let history = useHistory();
  window.scrollTo(0, 0);

  const handleClick = (id) => {
    actions.courseToStore(id);
    history.push(`/compra`);
  };

  //función que agrega al carro
  const handleCart = (item) => {
    console.log(item);
  };

  //función que chequea si el usuario está conectado o no y lo manda a una página u otra
  const checkLogin = (e) => {
    e.preventDefault;
    if (isLoggedIn == true) {
      history.push(`/compra`);
    } else {
      swal("No estás conectado", "Loguéate para continuar", "warning");
      history.push(`/login`);
    }
  };

  //función dummy solo para pruebas
  const noCheckLogin = (e) => {
    e.preventDefault;
    history.push(`/compra`);
  };

  return (
    <Container fluid>
      <Row className="mb-5 bg-primary bg-gradient text-white">
        <Col className="m-5 p-5" md={6}>
          <h1 className="mb-5 display-1">{store.curso_actual.name}</h1>
          <h3 className="mb-4">
            <strong>Descripción: {store.curso_actual.description}!</strong>
            <p className="mt-3 fs-4 lh-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              sint in totam temporibus fugit culpa vel similique, corporis aut
              iste obcaecati at quam rerum odit expedita assumenda officiis
              iusto facilis.
            </p>
          </h3>
          <h4 className="mb-4">
            <strong>Categoría:</strong> {store.curso_actual.categoria}
          </h4>
          <h4 className="mb-4">
            <strong>Duración:</strong> {store.curso_actual.duracion} Horas
          </h4>
          <h4 className="mb-5"><strong>Precio:</strong> ${store.curso_actual.precio}</h4>
          <Button
            className="fs-4"
            onClick={(e) => {
              checkLogin(e);
            }}
            variant="warning"
            size="lg"
            style={{ marginRight: "5px" }}
          >
            Comprar curso
          </Button>
          <Button
            className="fs-4"
            variant="outline-warning"
            size="lg"
            style={{ marginRight: "5px" }}
            onClick={(e) => {
              checkLogin(e);
            }}
          >
            Agregar al carrito
          </Button>
        </Col>
        <Col className="m-5 p-5 bg-primary bg-gradient bg-opacity-25">
          <Image
            fluid
            // style={{ weight: "320px", objectFit: "cover", width: "570px" }}
            src={store.curso_actual.url_portada}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="container justify-content-center text-center mt-5 w-50">
            <h3 className="display-5 fw-bold mb-4">Preview</h3>
            <YouTube url={store.curso_actual.url} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
