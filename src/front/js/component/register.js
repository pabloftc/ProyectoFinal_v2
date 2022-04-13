import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import "../../styles/register.css";
import logo2 from '../../img/logo2.png';
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import { Context } from "../store/appContext";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [errormessage, setErrormessage] = useState(false);
    const [todo, setTodo] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    function refreshPage() {
        window.location.reload(false);
    }

    const registerClick = async (e) => {
        e.preventDefault()
        let pass = password;
        let pass2 = password2;
        let user = username;
        let mail = email;
        let todoHere = (user != 0 && mail != 0 && pass != 0 && pass2 != 0);
        let todoPass = (pass == pass2);

        console.log('todoHere', todoHere)
        if (todoHere && todoPass) {
            //console.log('user.length', user.length, 'pass.length', pass.length)
            if (user.length > 4 && pass.length > 4) {
                const data = await actions.register(username, email, password)
                console.log(data, "data")
                if (data === 200) {
                    setTodo(true)
                } else {
                    swal("¡No me lo vas a creer!", "Este usuario y/o correo ya están en uso. Intenta con otro", "warning")
                    //setErrormessage(true), 3000
                }
            } else {
                swal("¡Oops!", "Error en el usuario y/o contraseña. Deben tener como mínimo 4 caracteres de largo", "error")
                //setErrormessage(true)
            }
        } else if (todoHere && !todoPass) {
            swal("¡Oh oh!", "Las contraseñas deben coincidir", "error")
        }
        else {
            swal("¡Ojo!", "Debes rellanar todos los campos", "warning")
        }
    }

    if (errormessage && !todo) {
        return (
            <div>
                <h1 className="mensajeError2">¡Ups! Ocurrió un error durante el registro, ya sea que ese correo está en uso o el usuario ya fue tomado. ¡Inténtalo de nuevo</h1>
                <Button variant="primary" type="button" onClick={refreshPage}>
                    ¡Vuelve a intentarlo!
                </Button>
            </div>
        );
    } else if (!errormessage && todo) {
        return (
            swal("¡Muy bien", "¡Registrado con éxito!", "success"),
            <Redirect to='/login' />
        );
    }

    return (
        <Container className="containerregistro">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '60vh' }}>
                <div style={{ width: "600px" }}>
                    <Image className="imagenlogo" src={logo2} rounded />
                    <h2>Sign up</h2>
                    <form >
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <label htmlFor="username">Usuario</label>
                            <input
                                className="inputregistro"
                                name="username"
                                id="username"
                                type="text"
                                placeholder="Enter a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <label htmlFor="email">Email</label>
                            <input
                                className="inputregistro"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <label htmlFor="password">Password</label>
                            <input
                                className="inputregistro"
                                name="password"
                                id="password"
                                type="password"
                                value={password}
                                placeholder="Enter a password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <label htmlFor="password2">Confirmacion password</label>
                            <input
                                className="inputregistro"
                                name="password2"
                                id="password2"
                                type="password"
                                placeholder="Enter password confirmation"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <button type="submit" className="btn btn-primary mb-3" onClick={(e) => registerClick(e)}>Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};