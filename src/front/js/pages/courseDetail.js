import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

export default function CourseDetail() {
  const { store, actions} = useContext(Context)
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    actions.courseToStore(id);
    setDetail(store.curso_actual)
    console.log(store.curso_actual)
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="m-5 p-5">
          <h1 className="m-0">{detail.name}</h1>
          <h3 className="m-0">Descripción: {detail.description}</h3>
          <h4 className="m-0">Fecha: {detail.created_at}</h4>
        </Col>
        <Col>
          <Image fluid src="https://picsum.photos/600/300" />
        </Col>
      </Row>
    </Container>
  );
}





/* fetch(process.env.BACKEND_URL + `/api/detalle_curso/${id}`)
      .then((res) => res.json())
      .then((data) => setDetail(data)); */
