import React from "react";
import { useContext, useState } from "react";

import { ListaDeUsuario } from '../component/listaDeUsuario';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table } from 'react-bootstrap'

export const Usuarios = () => {

    return (
        <>
        <ListaDeUsuario />
        </>
    )

}