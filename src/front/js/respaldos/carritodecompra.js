import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useCart } from "react-use-cart";

import "../../styles/carritodecompra.css";

export const Carritodecompra = () => {
    const {
        isEmpty,
        //totalUniqueItems,
        //items,
        // totalItems,
        // cartTotal,
        // updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
    const { store, actions } = useContext(Context);
    const [total, setTotal] = useState(0);
    const [item, setCarrito] = useState([
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

    if (!isEmpty) return <h4 className="text-center">No hay cursos en el carrito</h4>
    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-3">
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {item.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.precio}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => removeItem(item.id)}
                                            >Remove Item</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="co-auto">
                    <button
                        className="btn btn-danger m-2"
                        onClick={() => emptyCart()}
                    >Clear cart</button>
                </div>
            </div>
        </section>








        // <div className="carro-grande" style={{ width: "20vh", marginBottom: "8px" }}>
        //     <ul className="lista-carrito" >
        //         <div className="card" style={{ width: "30rem" }}>
        //             <div className="card-body">
        //                 <h5 className="card-title">{store.curso_actual.name}</h5>
        //                 <hr />
        //                 <p className="card-text">{store.curso_actual.description}</p>
        //                 <p className="precio">{store.curso_actual.precio} CLP</p>
        //             </div>

        //             <button style={{ width: "10rem" }} id="eliminar" className="btn btn-danger">Eliminar del carrito</button>
        //         </div>

        //         <div className='precioapagar' style={{ width: "20vh", marginBottom: "8px" }}>
        //             <h2>precio a pagar: {store.curso_actual.precio} (CLP)</h2>
        //         </div>
        //     </ul>
        // </div>
    )
}