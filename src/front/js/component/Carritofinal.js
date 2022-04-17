import React from "react";
import { useHistory } from "react-router-dom";
import { useCart } from "react-use-cart";
import "../../styles/carritofinal.css"

export const Cart = () => {
    let history = useHistory();
    const {
        isEmpty,
        cartTotal,
        removeItem,
        emptyCart,
        totalItems,
        totalUniqueItems,
        items } = useCart();


    //dirigirse a la página de compra
    const IraPago = (e) => {
        e.preventDefault;
        history.push(`/compra`)
    }


    if (isEmpty) return <h3 id="carritovacio" className="text-center"> El carrito está vacío</h3>
    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-9 md-6">
                    <h5>Carrito ({totalUniqueItems}) total Items: ({totalItems})</h5>
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={item.img} style={{ height: '6rem' }} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button
                                                id="botonborrar"
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
                <div className="col-3 md-2">
                    <h3>Total Price: $ {cartTotal}</h3>
                    <button id="botonlimpiar" className="btn btn-danger" onClick={() => emptyCart()}>Limpiar carrito</button>
                </div>
            </div>
            <button id="botonparacomprar" className="btn btn-primary" onClick={(e) => { IraPago(e) }}>Ir al pago</button>
        </section>
    );
    if (!isEmpty) return <button id="botonparacomprar" className="btn btn-primary" onClick={(e) => { IraPago(e) }}>Ir al pago</button>

};


export const BotonPagoDummy = () => {
    //dirigirse a la página de compra
    const IraPago = (e) => {
        e.preventDefault;
        history.push(`/compra`)
    }

    return (
        <div>
            <button id="botonparacomprar" className="btn btn-success" onClick={(e) => { IraPago(e) }}>Ir al pago</button>
        </div>
    );
}