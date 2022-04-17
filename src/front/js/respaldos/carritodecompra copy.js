import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/carritodecompra.css";

export const Carritodecompra = () => {
    const { store, actions } = useContext(Context);
    const [total, setTotal] = useState(0);
    const [carrito, setCarrito] = useState([
        // {
        //     name: "Excel básico 1",
        //     description: "Curso para aprender Excel",
        //     precio: 15000
        // },
        {
            id: `${store.curso_actual.id}`,
            name: `${store.curso_actual.name}`,
            description: `${store.curso_actual.description}`,
            precio: `${store.curso_actual.precio}`
        }
    ]);

    return (
        <div className="carro-grande" style={{ width: "20vh", marginBottom: "8px" }}>
            <ul className="lista-carrito" >
                {carrito && carrito.map((carrito, index) => {
                    return (
                        <div className="card" style={{ width: "30rem" }}>
                            <div className="card-body" key={index}>
                                <h5 className="card-title">{carrito.name}</h5>
                                <hr />
                                <p className="card-text">{carrito.description}</p>
                                <p className="precio">{carrito.precio} CLP</p>
                            </div>

                            <button style={{ width: "10rem" }} id="eliminar" className="btn btn-danger" onClick={() => removeItem(curso.id)}>Eliminar del carrito</button>
                        </div>
                    )
                })}
                <div className='precioapagar' style={{ width: "20vh", marginBottom: "8px" }}>
                    <h2>precio a pagar: {store.curso_actual.precio} (CLP)</h2>
                </div>
            </ul>
        </div>
    )
}