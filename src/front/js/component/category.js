import React, { useContext } from "react";
import { Form } from "react-bootstrap"; 
import {Context} from "../store/appContext";

export const Category = () => {
  const { store, actions } = useContext(Context);
  const categorias = store.categorias
  console.log(store)
  console.log(actions)
  // const categorias = ["Programación", "Idiomas", "Sobrevivencia", "Cosas varias", "Aprendizaje", "Salud", "Alimentación" ];
return (   
<div style={{marginLeft:"100px", marginRight:"100px", padding: "20px"}}>
<Form.Select aria-label="Default select example">
  <option>Categorías de curso</option>
  {categorias.map((cursoTipo, idx) => {
  return (
    <option value="2">{cursoTipo}</option>
    );
  })
};
</Form.Select>
</div>
);
};