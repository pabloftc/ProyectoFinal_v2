import React from "react";
import { useState, useContext } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Context } from "../store/appContext";

const ModalCursos = (props) => {
  const { store, actions } = useContext(Context);
  const [nombre,setNombre] = useState();
  const [categoria,  setCategoria] = useState();
  const [descripcion ,setDescripcion] = useState();
  const [precio ,setPrecio] = useState();
  const [duracion ,setDuracion] = useState();
  const [URL ,setURL] = useState();
  const [URLPortada ,setURLPortada] = useState();
  const [modalShow, setModalShow] = useState(false);
  
  const crearCurso = () => {
    actions.crearCurso(nombre, categoria, descripcion, precio, duracion, URL, URLPortada);
  };

    return(
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
                 <Form.Group as={Col} controlId="formGridNombre">
                    <Form.Label>Nombre del Curso</Form.Label>
                    <Form.Control 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>

                 <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder="$" 
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridURLVideo">
                    <Form.Label>URL Video</Form.Label>
                    <Form.Control value={URL}
                    onChange={(e) => setURL(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridURLImagenPortada">
                    <Form.Label>URL Imagen Portada</Form.Label>
                    <Form.Control value={URLPortada}
                    onChange={(e) => setURLPortada(e.target.value)}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCategoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select defaultValue="Seleccionar"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option>Seleccionar</option>
                        <option>Programacion</option>
                        <option>Ciencias Naturales</option>
                        <option>Idioma</option>
                        <option>PSU</option>
                        <option>Matematica</option>
                        <option>Fisica</option>
                        <option>Teatro</option>
                        <option>Quimica</option>
                        <option>Biologia</option>
                        <option>Filosofia</option>
                        
                    </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDuracion">
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}/>
                    </Form.Group>
                </Row>

                </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="primary" type="submit" onClick={crearCurso}>
                    Guardar
                </Button>{'  '}
                
        </Modal.Footer>
      </Modal>
      </>
    )
  }

  export default ModalCursos;