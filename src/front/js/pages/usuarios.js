import React, { useEffect } from "react";
import { useContext, useState } from "react";

import { ListaDeUsuario } from '../component/listaDeUsuario';
import ModalUsers from "../component/modalUsuarios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container} from 'react-bootstrap'
import ModalEditUsers from "../component/modalEditUsuario";
import { Context } from "../store/appContext";

export const Usuarios = () => {
 const {store, actions} = useContext(Context)
console.log(sessionStorage.getItem("rol"))

const userRol = sessionStorage.getItem("rol");

    const [modalShow, setModalShow] = useState(false);


    return (
        <>
        <Container>
            { userRol == "Admin" ? (<><Button variant="success" onClick={() => setModalShow(true) } >Crea un Nuevo Usuario</Button>
                <ListaDeUsuario />
                <ModalUsers show={modalShow} onHide= {() => setModalShow(false)}/></>)
            :   
            (<h1>You are not an Allowed Here, get out!</h1>)
     }
        
        </Container>
        </>
    )

}