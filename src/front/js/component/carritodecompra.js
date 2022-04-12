import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/carritodecompra.css";

export const Carritodecompra = () => {
    const { store, actions } = useContext(Context);
    const [carrito, setCarrito] = useState([
        //{
        //    nombre: "Excel básico 1",
        //    description: "Curso para aprender Excel",
        //    precio: 15000
        //},
        {
            name: `${store.curso_actual.name}`,
            description: `${store.curso_actual.description}`,
            //categoria: `${store.curso_actual.categoria}`,
            precio: `${store.curso_actual.precio}`
        }
    ]);

    return (
        <div className="carro-grande" style={{ width: "20vh", marginBottom: "8px" }}>
            <ul className="lista-carrito" >
                {carrito.length > 0 ? carrito.map((carrito, index) => {
                    return (
                        <>
                            <div className="producto-carrito" key={index}>
                                <p className="nombre-producto">{carrito.name}</p>
                                <p>{carrito.description}</p>
                                <p className="precio">{carrito.precio} CLP</p>
                            </div>
                            <div>
                                <button className="btn btn-danger">Eliminar del carrito</button>
                            </div>
                            <div>
                                <p className="precio">Total (CLP) { }</p>
                            </div>
                        </>
                    );
                })
                    : <p className="sin-cursos">No hay cursos agregados al carrito</p>
                }
            </ul>
        </div>
    )
}