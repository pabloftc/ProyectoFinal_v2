import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo2 from '../../img/logo2.png';
import "../../styles/home.css";
// import SayanImageUrl from "../../img/logo.jpeg";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");

  let history = useHistory();
  const { store, actions } = useContext(Context);
  const isLoggedIn = store.isLoggedIn
  useEffect(() => {
    if (isLoggedIn == true) {
      //Código para enviar a otra vista  
      history.push("/miscursos");
    }
  }, [isLoggedIn]);
  const onSubmitHandler = () => {
    actions.createToken(email, password);
     } 
    
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div style={{ width: "600px" }}>
          {/* <img src={SayanImageUrl} style={{ width: '300px', height: "70px"}}/>     */}
          <Image className="imagenlogo" src={logo2} rounded />
          <h2 style={{ color: "#191B1E", textAlign: "center" }}>Log in</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p>{errormessage}</p>
            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={onSubmitHandler}
            >
              Log in
            </Button>
          </Form>
        </div>
      </div>
      <div className="registroconnosotros" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh"
      }}>
        <Form.Group>
          <Form.Label>¿No tienes cuenta? Regístrate con nosotros</Form.Label>
          <Link to="/register">
            <button id="botonregistrologin" className="btn btn-primary">¡Regístrate!</button>
          </Link>
        </Form.Group>
      </div>
    </>
  );
};
export default Login;
