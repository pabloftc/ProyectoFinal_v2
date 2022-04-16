import React from 'react';
import { useHistory } from 'react-router-dom';
import "../../styles/compras.css";

export const Pagomalo = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    };

    return (
        <div className='superdiv'>
            <div>
                <h1>
                    ¡Oh no, tu pago no se pudo realizar! Presiona el botón para volver al inicio
                </h1>
            </div>
            <div>
                <button id="botonfallido" className='btn btn-primary' onClick={() => { handleClick() }}>
                    Inicio
                </button>
            </div>
        </div>
    );
}