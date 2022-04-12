import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/compras.css";
import { useHistory } from 'react-router-dom';

export const Pagobueno = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();

    const submitChange = async () => {
        e.preventDefault();
        const res = await fetch(
            //url Rigo + /api/endpoint
            "process.env.BACKEND_URL + /api/payment_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${store.curso_actual.name}`,
                description: `${store.curso_actual.description}`,
                //categoria: `${store.curso_actual.categoria}`,
                precio: `${store.curso_actual.precio}`
            }),
        }
        );
        let data = await res.json();
        console.log(data);
    };

    const handleClick = () => {
        history.push('/');
    };

    return (
        <div className='cuadrocorrecto'>
            <div>
                <h1>
                    Tu compra fue exitosa. ¡Ya tienes el curso en tu poder!
                </h1>
            </div>
            <div>
                <form onSubmit={(e) => submitChange(e)}>
                    <div>
                        <h1 className='h1'>
                            ¿Quieres enviar los datos de tu compra por Email?
                        </h1>
                        <label className='label'>
                            Envía la confirmación por correo:
                        </label>
                        <input className='form-control' type="email" placeholder="Escribe el correo aquí" name="correo" />
                    </div>
                    <div>
                        <button id="botoncorrecto" type="submit" className='btn btn-primary'>
                            Enviar
                        </button>
                    </div>
                </form>
                <div>
                    <button id="botonvolver" className='btn btn-success' onClick={() => { handleClick() }}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
}