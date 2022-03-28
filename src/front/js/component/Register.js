import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../../styles/register.css";
import logo2 from '../../img/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { Formik, ErrorMessage } from 'formik';

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errormessage, setErrormessage] = useState(false)
    const { handleSubmit } = useForm();

    //const onSubmit = evento => {
    // console.log(evento);
    // }

    const onSubmitHandler = async () => {
        sessionStorage.setItem("username", username);
        const response = await fetch(process.env.BACKEND_URL + "api/register", {
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log("_".repeat(100));
        console.log(data);
        if (response.ok == false) {
            setErrormessage(
                "El usuario no existe en la plataforma"
            );
        } else {
            sessionStorage.setItem("token", data.access_token);
        }
    }


    const checkPassword = () => {
        let pass = password;
        let pass2 = password2;
        console.log(pass, pass2);

        if (pass != 0) {
            if (pass == pass2) {
                console.log("Contraseñas iguales");
            }
            else {
                console.log("Contraseñas diferentes");
                swal('Oops', 'Las contraseñas no coinciden. ¡Vuelve a intentarlo!', 'error');
                setErrormessage(true)
            }
        }

    }

    if (errormessage) {
        return (
            <div>
                Faltan campos por completar
            </div>
        );
    }


    return (
        <Formik
            validate={() => {
                let errores = {};

                //Validación usuario
                if (!username) {
                    errores.username = 'Ingresa un nombre, por favor';
                } else if (!/^[a-zA-ZÀ-ÿ0-9\s]{6,20}$/.test(username)) {
                    errores.username = 'El nombre de contener entre 6 y 20 caracteres';
                }

                //Validación correo
                if (!email) {
                    errores.email = 'Ingresa un correo, por favor';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(email)) {
                    errores.email = 'Ingresa el correo en el formato correcto';
                }

                //Validación contraseña
                if (!password) {
                    errores.password = 'Ingresa una contraseña, por favor';
                } else if (!/^[a-zA-ZÀ-ÿ0-9\s]{8,40}$/.test(password)) {
                    errores.password = 'La contraseña debe contener mínimo 8 caracteres';
                }

                return errores;
            }}
        >
            {({ handleBlur, errors, touched }) => (
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form className="p-5">
                                <Form.Group className="mb-3" //</Form>controlId="formBasicEmail">
                                >

                                    <div className="logosignup">
                                        <Form.Label className="logosinguptwo">
                                            <Image className="imagenlogo" src={logo2} rounded />
                                            <h2>Sign up</h2>
                                        </Form.Label>
                                    </div>

                                    <div className="grupoInput">
                                        <Form.Control
                                            type="username"
                                            nombre="usuario"
                                            placeholder="Username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage nombre="usuario" component={() => (
                                            <span className="error">{errors.username}</span>
                                        )} />
                                    </div>

                                    <div className="grupoInput">
                                        <Form.Control
                                            type="email"
                                            nombre='correo'
                                            placeholder="Email address"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage nombre="correo" component={() => (
                                            <span className="error">{errors.email}</span>
                                        )} />
                                    </div>

                                    <div className="grupoInput">
                                        <Form.Control
                                            nombre="password"
                                            type="password"
                                            placeholder="Password"
                                            id="pass"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage nombre="password" component={() => (
                                            <span className="error">{errors.password}</span>
                                        )} />
                                    </div>

                                    <div className="grupoInput">
                                        <Form.Control
                                            name="password2"
                                            type="password"
                                            placeholder="Confirm Password"
                                            id="confirmPass"
                                            onChange={(e) => setPassword2(e.target.value)}
                                            value={password2}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <div className="signupboton">
                                    <Button variant="primary"
                                        type="submit"
                                        className="w-100"
                                        onClick={checkPassword}
                                        onSubmit={onSubmitHandler}>
                                        Sign up
                                    </Button>
                                    <p className="mensajexito">
                                        ¡Registro realizado de forma exitosa!
                                    </p>
                                </div>
                                {false && <div className="w-100" id="exclamationerror">
                                    <p className="w-100" id="exclamationerror2">
                                        <FontAwesomeIcon className="exclamacion" icon={faExclamationTriangle} />
                                        <b>Error:</b> Por favor rellena el formulario correctamente.
                                    </p>
                                </div>}
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            )}
        </Formik>
    );
};