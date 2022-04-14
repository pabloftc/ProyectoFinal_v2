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
  useEffect( () => {
    if(curso==""){ // cada palabra contiene un string vacío
      finderHandler()
    }
  }, [curso])
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
          alignItems: "center",
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
            style={{margin:"0px", marginRight:"10px", fontSize:"10pt"}}
          />
          <Button variant="outline-secondary" onClick={finderHandler} style={{width:"50px", height:"50px"}}>
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
                <Button
                  variant="primary"
                  size="lg"
                  onClick={(id) => handleClick(cursoItem.id)}
                >
                  Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
