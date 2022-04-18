import React from "react";
import { useCart } from "react-use-cart";
import { useHistory } from "react-router-dom";
import "../../styles/carritofinal.css";

export const Itemcard = (props) => {
  let history = useHistory();
  const { addItem } = useCart();

  function detailCourse(id) {
    history.push(`/courseDetailv2/${id}`);
  }

  return (
    <div className="row col-md-6 col-lg-3 mb-4" id="listadecursos">
      <div class="card " id="tarjetasdecursos">
        <img
          src={props.img}
          id="imagendetarjeta"
          class="card-img-top img-fluid h-50 w-50"
        />
        <div class="card-body text-center">
          <h5 class="card-title">{props.name}</h5>
          <p class="card-text">{props.description}</p>
          <h5 class="card-title">$ {props.price}</h5>
          {/* Botón detalle */}
          <button
            className="btn btn-outline-primary mb-2"
            onClick={() => detailCourse(props.id)}
          >
            Más Detalles
          </button>
          <button class="btn btn-primary" onClick={() => addItem(props.item)}>
            Agregar al carro
          </button>
        </div>
      </div>
    </div>
  );
};
