import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function CourseDetail() {
  const { store, actions } = useContext(Context);
  const [cart, setCart] = useState([]);

  const handleClick = (id) => {
    actions.courseToStore(id);
    history.push(`/compra`);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="m-5 p-5">
          <h1 className="m-0">{store.curso_actual.name}</h1>
          <h3 className="m-0">Descripción: {store.curso_actual.description}</h3>
          <h4 className="m-0">Fecha: {store.curso_actual.categoria}</h4>
          <h4 className="m-0">Precio: {store.curso_actual.precio}</h4>
          <Link to="/compra">
            <Button variant="primary" style={{ marginRight: '5px' }}>Comprar curso</Button>
          </Link>
          <Button variant="outline-primary" style={{ marginRight: '5px' }} onClick={(id) => handleClick(cursoItem.id)}>Agregar a mis favoritos</Button>
        </Col>
        <Col>
          <Image fluid src="https://picsum.photos/600/400" />
        </Col>
      </Row>
    </Container>
  );
}

/* fetch(process.env.BACKEND_URL + `/api/detalle_curso/${id}`)
      .then((res) => res.json())
      .then((data) => setDetail(data)); */
