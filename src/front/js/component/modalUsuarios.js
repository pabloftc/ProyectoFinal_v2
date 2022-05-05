import React, { useState, useContext } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Context } from "../store/appContext";

const ModalUsers = (props) => {

  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rol, setRol] = useState();
  
  const [confirmPassword, setConmfirmPassword] = useState();

  const validatePassword = (e) => {
      if ( password == e.target.value){
        setConmfirmPassword(e.target.value)
      }
      else {
        alert("La Contrasena no es igual")
      }
      
  };
  const crearUsuario = () => {
      actions.crearUser(username, password, rol, email)
  }
  return (
      <>
      <Modal
       {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
    
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
            <Row className="mb-3">
                 <Form.Group as={Col} controlId="formGridUsername">
                    <Form.Label>Nombre del Usuario</Form.Label>
                    <Form.Control placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>

                 <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  
                    type="Password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control  
                    type="Password"
                    placeholder=" Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConmfirmPassword(e.target.value)}
                    />
                </Form.Group>

                </Row>
                
                
                    <Form.Group as={Col} controlId="formGridRol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select defaultValue="Seleccionar"
                    value={rol }
                    onChange={(e) => setRol(e.target.value)}
                    >
                          <option>Rol</option>
                          <option>User</option>
                          <option>Admin</option>
                  
                    </Form.Select>
                    </Form.Group>

                    
                

                </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="primary" type="submit" href="/usuarios"  onClick={(e) => {
                  if ( password == confirmPassword){
                    crearUsuario(e)
                  }
                  else {
                    alert("La Contrasena no es igual")
                  }
                  }}>
                    Crear Usuario
                </Button>{'  '}
                
        </Modal.Footer>
      </Modal>
      
      </>
  )
}

export default ModalUsers