import React, { useState } from "react";
import "../../styles/carritodecompra.css";

export const Carritodecompra = () => {
    const [carrito, setCarrito] = useState([
        {
            nombre: "Excel básico 1",
            description: "Curso para aprender Excel",
            precio: 15000
        },
        {
            nombre: "Javascript 2",
            description: "Curso para aprender Javascript",
            precio: 30000
        },
        {
            nombre: "Artes plásticas III",
            description: "Curso para aprender a realizar proyectos de artes",
            precio: 10000
        }
    ]);

    return (
        <div className="carro-grande" style={{ width: "20vh", marginBottom: "8px" }}>
            <ul className="lista-carrito" >
                {carrito.length > 0 ? carrito.map((carrito, index) => {
                    return (
                        <>
                            <div className="producto-carrito" key={index}>
                                <p className="nombre-producto">{carrito.nombre}</p>
                                <p>{carrito.description}</p>
                                <p className="precio">{carrito.precio} CLP</p>
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