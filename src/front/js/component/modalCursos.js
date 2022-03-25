import React from "react";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const ModalCursos = (props) => {
  
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
            Aca va el Nombre del Curso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
            <Row className="mb-3">
                 <Form.Group as={Col} controlId="formGridNombre">
                    <Form.Label>Nombre del Curso</Form.Label>
                    <Form.Control />
                </Form.Group>

                 <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder="$" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridURLVideo">
                    <Form.Label>URL Video</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridURLImagenPortada">
                    <Form.Label>URL Imagen Portada</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCategoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select defaultValue="Seleccionar">
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
                    <Form.Control />
                    </Form.Group>
                </Row>

                </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>{'  '}
                <Button variant="secondary" type="button">
                    Cancelar
                </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }

  export default ModalCursos;