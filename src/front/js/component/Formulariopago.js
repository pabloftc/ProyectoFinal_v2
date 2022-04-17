import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import "../../styles/compra.css";
import 'react-credit-cards/es/styles-compiled.css';
//import { Context } from '../store/appContext';
import { Carritodecompra } from '../respaldos/carritodecompra';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

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
    //b, c, d, etc.: son los argumentos que se pasan en el body, excepto el preventDefault
    const onSubmit = (a, b, c) => {
        a.preventDefault();
        fetch("https://3001-4geeksacademy-reactflask-tliugxuopuj.ws-us39a.gitpod.io/api/payment_form",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //lo que se pasa aquí debe coincidir con la base da datos
                body: JSON.stringify({
                    number: "",
                    name: "",
                    expiry: "",
                    cvc: "",
                    focused: null
                })
            })
            .then(res => res.json())
            //Dentro de lo que viene se pone lo que se quiere hacer con el método POST
            //.then((data)=>{})
            .catch(error => {
                console.error("Este es el error", error)
            })
    }


    const processPayment = (e) => {
        e.preventDefault();
        let nombre = state.name;
        let numero = state.number;
        let expiracion = state.expiry;
        let serial = state.cvc;
        let todoHere = (nombre.length !== 0 && numero.length !== 0 && expiracion.length !== 0 && serial.length !== 0);

        if (todoHere) {
            if (serial == 1111) {
                history.push(`/Pagofallido`)
            } else {
                history.push(`/Pagocorrecto`)
            }
        } else {
            swal("¡Ups!", "Debes llenar todos los campos", "error")
        }
    }


    return (
        <div className='form' id="superdiv">
            <div className='form-group' id="card-form">
                <div className='card-body'>
                    <Cards
                        number={state.number}
                        name={state.name}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        focused={state.focused}
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
                                pattern="^[0-9]{0,16}"
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
        </div >
    )
}

