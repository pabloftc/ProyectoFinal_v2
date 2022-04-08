import React, { useState, useContext } from 'react';
import { Container, Image } from "react-bootstrap";
import logo2 from '../../img/logo2.png';
import "../../styles/compra.css";
import { Carritodecompra } from './carritodecompra';




export const Compra = () => {
    //const { store, actions } = useContext(Context);
    const [errormessage, setErrormessage] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [pago, setPago] = useState("");


    return (
        <Container>
            <>

                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            1 of 3
                        </div>
                        <div className="col">
                            <form>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <Container>
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '30vh', marginBottom: "8px" }}>
                                                    <div style={{ width: "800px" }}>
                                                        <Image className="imagenlogo" src={logo2} rounded />
                                                        <h2>Comprar curso</h2>

                                                    </div>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>
                                </div>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-auto pt-2">
                                            <Container>
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '30vh', marginBottom: "30px", marginTop: "8px" }}>
                                                    <div style={{ width: "600px" }}>
                                                        <h2>Información de usuario</h2>


                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                                                                        <label htmlFor="first_name">First name</label>
                                                                        <input
                                                                            name="first_name"
                                                                            id="first_name"
                                                                            type="text"
                                                                            placeholder="Ingresa tu nombre"
                                                                            value={firstname}
                                                                            onChange={(e) => setFirstname(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                                                                        <label htmlFor="last_name">Last name</label>
                                                                        <input
                                                                            name="last_name"
                                                                            id="last_name"
                                                                            type="text"
                                                                            placeholder="Ingresa tu apellido"
                                                                            value={lastname}
                                                                            onChange={(e) => setLastname(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                                                            <label htmlFor="email">Email</label>
                                                            <input
                                                                name="email"
                                                                id="email"
                                                                type="email"
                                                                value={email}
                                                                placeholder="Ingresa tu correo"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </Container>
                                        </div>
                                        <div className="col-md-auto pt-2" id="columna2">
                                            <Container>
                                                <div className="componente-carritos" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: '30vh', width: '20vh', marginBottom: "30px", marginTop: "15px" }}>
                                                    <div>
                                                        <h2>Carrito de compra</h2>
                                                        <Carritodecompra />
                                                    </div>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <Container>
                                                <div style={{ display: "flex", flexDirection: "column", marginBottom: "100px" }}>
                                                    <h2>Método de pago</h2>
                                                    <div style={{ flexDirection: "column", marginBottom: "30px" }}>
                                                        <input
                                                            type="radio"
                                                            id="mercadopago"
                                                            name="pago"
                                                            value="MercadoPago"
                                                            onChange={(e) => setPago(e.target.value)}
                                                        />
                                                        <label htmlFor="mercadopago" className="pagar">MercadoPago</label>
                                                        <input
                                                            type="radio"
                                                            id="webpay"
                                                            name="pago"
                                                            value="Webpay"
                                                            onChange={(e) => setPago(e.target.value)}
                                                        />
                                                        <label htmlFor="webpay" className="pagar">Webpay</label>
                                                        <input
                                                            type="radio"
                                                            id="paypal"
                                                            name="pago"
                                                            value="paypal"
                                                            onChange={(e) => setPago(e.target.value)}
                                                        />
                                                        <label htmlFor="paypal" className="pagar">Paypal</label>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mb-3">Confirmar la compra</button>
                                                </div>
                                            </Container>
                                        </div>
                                        <div className="col">

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-1">
                            3 of 3
                        </div>
                    </div>
                </div>



            </>
        </Container >
    );
};