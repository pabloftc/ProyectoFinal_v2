import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { data } from "../component/Datafake";

export default function CourseDetailv2() {
  const { store, actions } = useContext(Context);
  const [carrito, setCarrito] = useState([]);
  const isLoggedIn = store.isLoggedIn;
  let history = useHistory();


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

  const url = window.location.href;
  const char = url.slice(-1);
  const detail = data.cursosData[char - 1]

  //función dummy solo para pruebas
  const noCheckLogin = (e) => {
    e.preventDefault;
    history.push(`/compra`);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="m-5 p-5">
          <h1 className="mb-2">{detail.name}</h1>
          <h3 className="mb-2">Descripción: {detail.description}</h3>
          <h4 className="mb-2">Categoría: {detail.categoría}</h4>
          {/* <h4 className="mb-2">
            Duración: {data.cursosData.duracion} Horas
          </h4> */}
          <h4 className="mb-3">Precio: ${detail.price}</h4>
          <Button
            onClick={(e) => {
              checkLogin(e);
            }}
            variant="primary"
            style={{ marginRight: "5px" }}
          >
            Comprar curso
          </Button>
          <Button
            variant="outline-primary"
            style={{ marginRight: "5px" }}
            onClick={(e) => {
              checkLogin(e);
            }}
          >
            Agregar al carrito
          </Button>
        </Col>
        <Col>
          <Image fluid src="https://picsum.photos/600/400" />
        </Col>
      </Row>
    </Container>
  );
}
