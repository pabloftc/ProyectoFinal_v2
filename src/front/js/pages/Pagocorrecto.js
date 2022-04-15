import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import "../../styles/compras.css";
import { useHistory } from 'react-router-dom';

export const Pagobueno = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState([
        {
            name: `${store.curso_actual.name}`,
            description: `${store.curso_actual.description}`,
            precio: `${store.curso_actual.precio}`
        }
    ]);

    const history = useHistory();

    //funcion para mandar la request
    // const submitRequest = async (e) => {
    //     e.preventDefault();
    //     console.log({ email, message });
    //     const response = await fetch("process.env.BACKEND_URL + /api/pagocorrecto", {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ email, message })
    //     });
    //     const res = await response.json();
    //     if (res.status === 'success') {
    //         alert("Mensaje enviado.");
    //         this.resetForm()
    //     } else if (res.status === 'fail') {
    //         alert("Mensaje fallido")
    //     }
    // };

    //submit 1 de prueba
    const submitRequest = async () => {
        //e.preventDefault();
        console.log({ email });
        const response = await fetch("process.env.BACKEND_URL + /api/email_sent", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const res = await response.json();
        if (res.status === 'success') {
            alert("Mensaje enviado.");
            this.resetForm()
        } else if (res.status === 'fail') {
            alert("Mensaje fallido")
        }
    };


    //submit 2 de prueba con SENDGRID
    const manejarSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `https://3001-4geeksacademy-reactflask-tliugxuopuj.ws-us40.gitpod.io/api/enviarcorreo`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: e.target.elements.correo.value,
                }),
            }
        );
        let data = await response.json();
        alert("Confirmación enviada con éxito");
        console.log(data);
    }



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
                <form onSubmit={(e) => manejarSubmit(e)}>
                    <div>
                        <h1 className='h1'>
                            ¿Quieres enviar los datos de tu compra por Email?
                        </h1>
                        <label htmlFor="formFile" className='form-label'>
                            Envía la confirmación por correo:
                        </label>
                        <input
                            className='form-control'
                            type="email"
                            placeholder="Escribe el correo aquí"
                            name="correo"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            id="botoncorrecto"
                            type="submit"
                            className='btn btn-primary'
                        >
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