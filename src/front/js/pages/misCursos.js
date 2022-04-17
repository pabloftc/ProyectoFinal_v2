import React, { useEffect } from "react";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table } from 'react-bootstrap'
import ModalCursos from "../component/modalCursos";
import { Context } from "../store/appContext";


export const MisCursos = () => {
    const [modalShow, setModalShow] = useState(false);
    const {store, actions} = useContext(Context);

    useEffect(() => {
        // Update the document title using the browser API
        actions.getCursosUser(store.user_id);
      }, []);
    
      const borrarCursoUser = () => {
          actions.borrarCurso();
      }
    console.log(store.lista_mis_cursos)

return (
        <>
        <Container>
             <Button variant="success" onClick={() => setModalShow(true) }>Crea un Nuevo Curso</Button>
             <br />


             <Table>
                 <thead>
                     <tr>
                         <th>Curso</th>
                         <th>Categoria</th>
                         <th>Descripcion</th>
                         <th>Duracion</th>
                         <th>Precio</th>
                         <th>Portada</th>
                         <th>Video Url</th>
                         <th>Creado</th>
                         <th>Acciones</th>
                     </tr>
                 </thead>
                 <tbody>
                 {store.lista_mis_cursos.map((e, id) => {
                            return(
                                    <tr key={id}>
                                            <td>{e.name}</td>
                                            <td>{e.categoria}</td>
                                            <td>{e.description}</td>
                                            <td>{e.duracion}</td>
                                            <td>${e.precio}</td>
                                            <td><img src={e.url_portada} height="50" width="50">
                                                </img>
                                            </td>
                                            <td><a href={e.url} target="_blank">Video</a></td>
                                            <td>{e.created_at}</td>
                                            <td><Button variant="info" onClick={() => setModalShow(true) }>Editar</Button> {'  '}
                                            <Button variant="danger" onClick={() => borrarCursoUser() }> Eliminar</Button></td>

                                    </tr>
                            )}
                    )}
                 </tbody>
             </Table>

             <ModalCursos show={modalShow} onHide= {() => setModalShow(false)}/>
        </Container>
        
        </>
        
)
}
