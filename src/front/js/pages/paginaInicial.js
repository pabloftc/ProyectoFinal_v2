import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Login from "./login.js";
import { Row, Card, Col, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PaginaInicial = () => {
  const { store, actions } = useContext(Context);
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);

  const finderHandler = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/detalle_curso" + `?name=${curso}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await response.json();
    setCursos(data);
  };
  
  let history = useHistory();
  
  function handleClick(id) {
    actions.courseToStore(id);
    history.push(`/courseDetail/${id}`);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <h1>Cursos o categoría de cursos</h1>{" "}
        <Form className="d-flex" style={{ marginRight: "5px" }}>
          <FormControl
            value={curso}
            onChange={(e) => {
              setCurso(e.target.value);
            }}
            type="search"
            placeholder="Search . . ."
            className="me"
            aria-label="Search"
          />
          <Button variant="outline-secondary" onClick={finderHandler}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Form>
      </div>
      <Row xs={1} md={3} className="g-4">
        {store.cursos.map((cursoItem, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                style={{ height: "200px", objectFit: "cover" }}
                variant="top"
                src={`https://picsum.photos/id/${Math.floor(
                  Math.random() * 230
                )}/200/300`}
              />
              <Card.Body>
                <Card.Title> {cursoItem.name} </Card.Title>
                <Card.Text>{cursoItem.description}</Card.Text>
                {/* <Link to={`/courseDetail/${cursoItem.id}`}> */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={(id) => handleClick(cursoItem.id)}
                >
                  Detalles
                </Button>
                {/* </Link> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Login />
    </>
  );
};
export default PaginaInicial;

{
  /* <Link to={`/courseDetail/${cursoItem.id}`}></Link> */
}

// console.log(store)
/* actions.getCourses()}, []) */
/* useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/detalle_curso" + `?name=${curso}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setCursos(data));
  }, []); */

// function handleClick() {
//   let history = useHistory();
//   history.push("/courseDetail");
// } /* useHistory -- crear "actions" -- quitar <Link> */
