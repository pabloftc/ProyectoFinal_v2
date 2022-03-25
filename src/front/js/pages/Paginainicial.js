import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Container, Row, Card, Col } from "react-bootstrap";

const Paginainicial = () => {
  const { store, actions } = useContext(Context);

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src="https://picsum.photos/id/233/100/100"
              />
              <Card.Body>
                <Card.Title>Curso SayanDevelopers</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Paginainicial;
