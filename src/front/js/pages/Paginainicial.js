import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Login from "./login.js";
import { Row, Card, Col, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Paginainicial = () => {
  const { store, actions } = useContext(Context);

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
            type="search"
            placeholder="Search . . ."
            className="me"
            aria-label="Search"
          />
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Form>
      </div>
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Col>
            <Card>
              <Card.Img
                style={{ height: "200px", objectFit: "cover" }}
                variant="top"
                src={`https://picsum.photos/id/${Math.floor(Math.random() * 230)}/200/300`}
              />
              <Card.Body>
                <Card.Title>Curso SayanDevelopers {idx + 1 }</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Login />
    </>
  );
};
export default Paginainicial;
