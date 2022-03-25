import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table, Modal, Form, Row, Col } from "react-bootstrap";


export const ListaDeUsuario = () => {

    return (
                <>
                <Container>
                    <Button variant="success" >Crea un Nuevo Usuario</Button>
                    <br />

                    <Table>
                        <thead>
                        <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Contrasena</th>
                                <th>Fecha de Creacion</th>
                                <th>Cursos Creados</th>
                                <th>Cursos Adquiridos</th>
                                
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>1</td>
                                <td>Felipe Contreras</td>
                                <td>pipecontreras2@gmail.com</td>
                                <td>***********</td>
                                <td>20/03/2022</td>
                                <td>31</td>
                                <td>2</td>
                                <td><Button variant="info" >Editar</Button> {'  '}
                                <Button variant="danger"> Eliminar</Button></td>

                        </tr>
                        </tbody>
                    </Table>
                </Container>

                </>
)
}