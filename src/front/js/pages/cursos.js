import React, { useEffect } from "react";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Table } from 'react-bootstrap'
import ModalCursos from "../component/modalCursos";
import { Context } from "../store/appContext";


const Cursos = () => {
    const [modalShow, setModalShow] = useState(false);
    const {store, actions} = useContext(Context);
    const user = store.rol;
    useEffect(() => {
        // Update the document title using the browser API
        actions.getCursos();
      }, []);
      console.log(store.cursos)
return (
    <>
        <Container>

        { user == "Admin" ? (<>
             {/* <Button variant="success" onClick={() => setModalShow(true) }>Crea un Nuevo Curso</Button> */}
             <br />


             <Table>
                 <thead>
                     <tr>
                         <th>Profesor Idi</th>
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
                 {store.cursos.map((e, id) => {
                            return(
                                    <tr key={id}>
                                            <td>{e.user_id}</td>
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
                                            <Button variant="danger" onClick ={()=> {}}> Eliminar</Button></td>

                                    </tr>
                            )}
                    )}
                 </tbody>
             </Table>
             </>
            ): (<h1>You are not an Allowed Here, get out!</h1>)}            
        </Container>
            
    </>
)
}

export default Cursos