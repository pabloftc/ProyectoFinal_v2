import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Login from "./login.js";
import {Row, Card, Col} from "react-bootstrap";

const Paginainicial = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		{/* // <div className="text-center mt-5">
		// 	<h1>Hello Rigo!!</h1>
		// 	<p>
		// 		<img src={rigoImageUrl} />
		// 	</p>
		// 	<div className="alert alert-info">
		// 		{store.message || "Loading message from the backend (make sure your python backend is running)..."}
		// 	</div>
		// 	<p>
		// 		This boilerplate comes with lots of documentation:{" "}
		// 		<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
		// 			Read documentation
		// 		</a>
		// 	</p>
		// </div>
		// <Login /> */}

        <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }).map((_, idx) => (
    <Col>
      <Card>
        <Card.Img variant="top" src="https://picsum.photos/id/233/100/100" />
        <Card.Body>
          <Card.Title>Curso SayanDevelopers</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
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
