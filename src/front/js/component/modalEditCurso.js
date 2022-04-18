import React from "react";
import { useState, useContext } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const ModalEditCurso = (props, data) => {
  const { store, actions } = useContext(Context);
  const [nombre,setNombre] = useState();
  const [categoria,  setCategoria] = useState();
  const [descripcion ,setDescripcion] = useState();
  const [precio ,setPrecio] = useState();
  const [duracion ,setDuracion] = useState();
  const [URL ,setURL] = useState();
  const [URLPortada ,setURLPortada] = useState();
  const id = props.data.id;
  const [modalShow, setModalShow] = useState(false);
  console.log(id);
;  const actualizarCurso = () => {
    
    actions.actualizarCurso(id, nombre, categoria, descripcion, precio, duracion, URL, URLPortada);

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
                    <Form.Control placeholder={props.data.name}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>

                 <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder={ "$ " + props.data.precio} 
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    placeholder ={props.data.description}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridURLVideo">
                    <Form.Label>URL Video</Form.Label>
                    <Form.Control value={URL}
                    placeholder ={props.data.url}
                    onChange={(e) => setURL(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridURLImagenPortada">
                    <Form.Label>URL Imagen Portada</Form.Label>
                    <Form.Control value={URLPortada}
                    placeholder ={props.data.url_portada}
                    onChange={(e) => setURLPortada(e.target.value)}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCategoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select defaultValue="Seleccionar"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    > <option> Categoria</option>
                      {store.categorias.map((e, id) => {
                        return (
                          <option key={id}>{e}</option>
                        )
                      })

                      }
                        
                    </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDuracion">
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control value={duracion}
                    placeholder ={props.data.duracion}
                    onChange={(e) => setDuracion(e.target.value)}/>
                    </Form.Group>
                </Row>

                </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="primary" type="submit" onClick={(e) => {actualizarCurso(e)}} href="miscursos">
                    Actualizar Curso
                </Button>{'  '}
                
        </Modal.Footer>
      </Modal>
      </>
    )
  }

  export default ModalEditCurso;