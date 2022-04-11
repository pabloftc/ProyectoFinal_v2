import React, { useContext, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table, Modal, Form, Row, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
import ModalEditUsers from "./modalEditUsuario";

export const ListaDeUsuario = () => {
    const {store, actions} = useContext(Context);

    const [modalShow, setModalShow] = useState(false);
    
    const [data, setData] =useState('');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");
    // setRol(store.rol)
    const modalData = (e) => {
        setData(store.lista_usuarios[e]);
        setModalShow(true)
    }
     useEffect(() => {
			
         actions.getusuarios();
     }, []);

    return (
                <>
                <Container>
                    { }
                    
                    <br />

                    <Table>
                        <thead>
                        <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Contrasena</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                                
                        </tr>
                        </thead>
                        <tbody>
                        {store.lista_usuarios.map((e, id) => {
                            return(
                                <tr key={id}>
                                        <td>{e.id}</td>
                                        <td>{e.username}</td>
                                        <td>{e.email}</td>
                                        <td>{e.password}**********</td>
                                        <td>{e.rol}</td>
                                        <td>
                                        <Button variant="info" onClick={(e) => {modalData(e); console.log(e)}}>Editar</Button> 
                                        {'  '}
                                        <Button variant="danger" onClick={() => {actions.borrarUsuario(e);}} href="/usuarios"> Eliminar</Button>
                                        </td>
                                    
                                </tr>
                            );
                        })}   
                        </tbody>
                    </Table>
                <ModalEditUsers show={modalShow} onHide= {() => setModalShow(false)}/>
                </Container>

                </>
)
}