import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import "../../styles/compra.css";
import 'react-credit-cards/es/styles-compiled.css';
//import { Context } from '../store/appContext';
import { Carritodecompra } from './carritodecompra';
import { useHistory } from 'react-router-dom';

export const PaymentForm = () => {
    //const { store, actions } = useContext(Context);
    const history = useHistory();
    //const [carrito, setCarrito] = useState([
    //    {
    //
    //        name: `${store.curso_actual.name}`,
    //        description: `${store.curso_actual.description}`,
    //        categoria: `${store.curso_actual.categoria}`,
    //        precio: `${store.curso_actual.precio}`
    //    }
    //]);

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focused: ""
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleFocusChange = (e) => {
        setState({
            ...state,
            focused: e.target.name
        })
    }

    const processPayment = (e) => {
        e.preventDefault();
        if (state.name != 0 && state.number != 0 && state.expiry != 0 && state.cvc != 0) {
            history.push(`/Pagocorrecto`);
        } else {
            history.push(`/Pagofallido`)
        }
        console.log(state)
    }


    return (
        <div className='form-row' id="superdiv">
            <div className='form-group col-md-4' id="card-form">
                <div className='card-body'>
                    <Cards
                        number={state.number}
                        name={state.name}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        focused={state.focused}
                        pattern="[0-9]{0,13}"
                    />
                    <form>
                        <div className='form-group'>
                            <label htmlFor="number">Número de la tarjeta</label>
                            <input
                                type="text"
                                name="number"
                                id="number"
                                className='form-control'
                                onChange={handleChange}
                                onFocus={handleFocusChange}
                                maxLength="16"
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Nombre del titular</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className='form-control'
                                onChange={handleChange}
                                onFocus={handleFocusChange}
                                maxLength="30"
                            />
                        </div>
                        <div className='form-row' style={{ display: "flex" }}>
                            <div className='form-group col-md-5'>
                                <label htmlFor="expiry">Fecha de expiración</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    id="expiry"
                                    className='form-control'
                                    onChange={handleChange}
                                    onFocus={handleFocusChange}
                                    maxLength="4"
                                />
                            </div>
                            <div className='form-group col-md-4'>

                            </div>
                            <div className='form-group col-md-3'>
                                <label htmlFor="cvc">CVC</label>
                                <input
                                    type="text"
                                    name="cvc"
                                    id="cvc"
                                    className='form-control'
                                    onChange={handleChange}
                                    onFocus={handleFocusChange}
                                    maxLength="4"
                                />
                            </div>
                        </div>

                        <button type="button" onClick={processPayment} className='boton-pago'>
                            Pagar
                        </button>
                    </form>
                </div >
            </div >
            <div className='form-group col-md-4' id="card-form">
                <h1>Estás comprando en este momento:</h1>
                <div className="producto-carrito">
                    <Carritodecompra />
                </div>
            </div>
        </div >
    )
}

