import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import "../../styles/register.css";
import logo2 from '../../img/logo2.png';
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [errormessage, setErrormessage] = useState(false);
    const [error, setError] = useState(false);
    const [todo, setTodo] = useState();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const history = useHistory();
    //const [state, setState] = useState({
    //    username: "",
    //    email: "",
    //     password: "",
    //     password2: ""
    //   })

    //function handleChange(e) {
    //   setState({
    //       ...state,
    //        [e.target.name]: e.target.value
    //
    //    })
    //  }


    //const handleSubmit = async (e) => {
    //   e.preventDefault()
    //    console.log(state, "state")
    //
    //    const bodyContent = JSON.stringify(state)
    //
    //     const response = await fetch(process.env.BACKEND_URL + "/api/register", {
    //         body: bodyContent,
    //         method: "POST",
    //           headers: {
    //              "Content-Type": "application/json",
    //          }
    //       })
    //
    //       const data = await response.json()
    //       console.log(data)
    //   }

    const registerClick = () => {
        let pass = password;
        let pass2 = password2;
        let user = username;
        let mail = email;
        let todoHere = (pass != 0 && user != 0 && mail != 0 && pass == pass2);

        if (todoHere) {
            if (user.length > 3 && pass > 4) {
                actions.register(username, email, password).then((data) => {
                    console.log(data, "data")
                    setTodo(true)
                });

            } else {
                alert("Debes rellenar todos los campos")
                //setErrormessage(true)
            }
        }
    }


    //Otro


    const checkPassword = () => {
        let pass = password;
        let pass2 = password2;
        let user = username;
        let mail = email;
        let todoHere = (pass != 0 && user != 0 && mail != 0 && pass == pass2);

        console.log(pass, pass2);

        if (todoHere) {
            console.log("Están todos los datos ingresados")
            return (
                setTodo(true)
            )
        }
        else {
            console.log("Debes introducir un usuario, un correo y una contraseña")
            setErrormessage(true)
        };
    }

    if (errormessage) {
        return (
            <div>
                <h1>Faltan campos por completar</h1>
                <Button variant="primary" type="button" onClick={refreshPage}>
                    ¡Vuelve a intentarlo!
                </Button>
            </div>
        );
    }

    if (todo) {
        return (
            <div>
                <h1>¡Muy bien! Te has registrado en la plataforma</h1>
                <Button variant="primary" type="button">
                    <Link to={`/login`} className="btn-signup">
                        Inicia sesión
                    </Link>
                </Button>
            </div>
        );
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
                <div style={{ width: "600px" }}>
                    <Image className="imagenlogo" src={logo2} rounded />
                    <h2>Sign up</h2>
                    <form >
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <label htmlFor="username">Usuario</label>
                            <input
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
                                name="password2"
                                id="password2"
                                type="password"
                                placeholder="Enter password confirmation"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                            <button type="submit" className="btn btn-primary mb-3" onClick={registerClick}>Sign in</button>
                            <button type="button" className="btn btn-primary" onClick={() => actions.logout()} >Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};