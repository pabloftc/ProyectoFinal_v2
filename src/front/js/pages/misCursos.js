import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table } from 'react-bootstrap'
import ModalCursos from "../component/modalCursos";


export const MisCursos = () => {
    let history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    
    function createCourse() {
        history.push('/courseInscription')
    }

return (
        <>
        <Container>
             <Button variant="success" onClick={() => createCourse()}>Crea un Nuevo Curso</Button>
             {/* () => setModalShow(true) */}
             <br />


             <Table>
                 <thead>
                     <tr>
                         <th>Curso</th>
                         <th>Categoria</th>
                         <th>Profesor</th>
                         <th>Fecha de Creacion</th>
                         <th>Descripcion</th>
                         <th>Precio</th>
                     </tr>
                 </thead>
                 <tbody>
                 <tr>
                         <td>Calculo 1</td>
                         <td>Matematica</td>
                         <td>Felipe</td>
                         <td>20/03/2022</td>
                         <td>Principios de Cal....</td>
                         <td>$8.990</td>
                         <td><Button variant="info" onClick={() => setModalShow(true) }>Editar</Button> {'  '}
                         <Button variant="danger"> Eliminar</Button></td>

                     </tr>
                 </tbody>
             </Table>

             <ModalCursos show={modalShow} onHide= {() => setModalShow(false)}/>
        </Container>
        
        </>
        
)
}
