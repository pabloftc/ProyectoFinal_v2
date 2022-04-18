import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table } from 'react-bootstrap'
import ModalCursos from "../component/modalCursos";
import { Context } from "../store/appContext";
import ModalEditCurso from "../component/modalEditCurso";


export const MisCursos = () => {
    let history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalEditShow, setModalEditShow] = useState(false);
    const [data, setData] = useState("");
    const { store, actions } = useContext(Context);
    const userId = sessionStorage.getItem("user_id");

    function createCourse() {
        history.push('/courseInscription');
    }
    useEffect(() => {
        // Update the document title using the browser API
        actions.getCursosUser(userId);
      }, []);
    
      const borrarCursoUser = (id) => {
          actions.borrarCurso(id);
      }
      const actualizarCursoUser = (e) => {
        setData(e);
        console.log(e);
        setModalEditShow(true)  
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
                                            <td><Button variant="info" onClick={() => { actualizarCursoUser(e)} }>Editar</Button> {'  '}
                                            <Button variant="danger" onClick={() => borrarCursoUser(e.id) } href="miscursos"> Eliminar</Button></td>

                                    </tr>
                            )}
                    )}
                 </tbody>
             </Table>
             <ModalEditCurso show={modalEditShow} onHide= {() => setModalEditShow(false)} data={data}/>                  
             <ModalCursos show={modalShow} onHide= {() => setModalShow(false)}/>
        </Container>
        
        </>
        
)
}
