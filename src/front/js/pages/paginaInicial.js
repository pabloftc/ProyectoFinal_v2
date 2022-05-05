import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Row, Card, Col, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PaginaInicial = () => {
  const { store, actions } = useContext(Context);
  const [curso, setCurso] = useState("");

  const finderHandler = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/detalle_curso" + `?name=${curso}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await response.json();
    actions.setCursos(data);
  };
  useEffect(() => {
    if (curso == "") {
      // cada palabra contiene un string vacío
      finderHandler();
    }
  }, [curso]);

  let history = useHistory();

  function handleClick(id) {
    actions.courseToStore(id);
    history.push(`/courseDetail/${id}`);
  }

  return (
    <div className="bg-secondary bg-gradient bg-opacity-10">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <h2 className="display-6 fw-bold fst-italic">
          Últimos Cursos agregados
        </h2>{" "}
        <Form className="d-flex" style={{ marginRight: "5px" }}>
          <FormControl
            value={curso}
            onChange={(e) => {
              setCurso(e.target.value);
            }}
            type="search"
            placeholder="Busca un Curso . . ."
            className="me"
            aria-label="Search"
            style={{ margin: "0px", marginRight: "10px", fontSize: "10pt" }}
          />
          <Button
            variant="outline-secondary"
            onClick={finderHandler}
            style={{ width: "50px", height: "50px" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Form>
      </div>
      <Row xs={1} md={3} className="g-4">
        {store.cursos.map((cursoItem, idx) => (
          <Col key={idx}>
            <Card className="mb-3 mx-2">
              <Card.Img
                style={{ height: "200px", objectFit: "cover" }}
                variant="top"
                src={cursoItem.url_portada}
              />
              <Card.Body>
                <Card.Title className="fs-4"> {cursoItem.name} </Card.Title>
                <Card.Text className="fs-5">{cursoItem.description}</Card.Text>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={(id) => handleClick(cursoItem.id)}
                >
                  Más Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default PaginaInicial;
