import React, { useState, useContext } from 'react';
import { Container, Image } from "react-bootstrap";
import logo2 from '../../img/logo2.png';
import "../../styles/compra.css";
import "../../styles/carritodecompra.css";
import { Carritodecompra } from '../component/carritodecompra';
import { useHistory, Link } from "react-router-dom";
import { Context } from '../store/appContext';
import swal from 'sweetalert';


export const Compra = () => {
    const { store, actions } = useContext(Context);
    const [carrito, setCarrito] = useState([
        // {
        //     name: "Hacer llover 1",
        //     description: "Curso para aprender a hacer llover",
        //     precio: "19990"
        // },
        // {
        //     id: `${store.curso_actual.id}`,
        //     name: `${store.curso_actual.name}`,
        //     description: `${store.curso_actual.description}`,
        //     precio: `${store.curso_actual.precio}`
        // }
    ]);


    const [errormessage, setErrormessage] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [pago, setPago] = useState("");
    const history = useHistory();
    const precio_total = `${store.curso_actual.precio}`;
    const fecha = new Date();
    const idcurso = `${store.curso_actual.id}`

    const onSubmit = async (e) => {
        e.preventDefault();
        if (firstname != 0 && lastname != 0 && email != 0 && pago != 0) {
            const data = await actions.compra(pago, fecha, precio_total, idcurso)
            console.log(data, "data")
            if (data === 200) {
                history.push('/payment-form')
            } else {
                swal('¡Ups!', 'Según nuestros registros ya tienes este curso', 'warning')
            }
        } else {
            swal('¡Algo salió mal!', 'Debes rellenar todos los datos', 'error')
        }
    }

    const borrarCurso = (e, carrito) => {
        e.preventDefault;
        if (carrito == carrito) {
            e.preventDefault;
            return swal("Oh ho", "no seas pollo", "error");
        } else {
            return <div>Hay cursos</div>
        }
    }

    return (
        <Container>
            <>

                <div className="container">
                    <div className="row">
                        <div className="col-1">

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
                                                        <div className="carro-grande" style={{ width: "20vh", marginBottom: "8px" }}>
                                                            <Carritodecompra />

                                                            {/* <ul className="lista-carrito" >
                                                                <div className="carro-grande" style={{ width: "20vh", marginBottom: "8px" }}>
                                                                    <ul className="lista-carrito" >
                                                                        <div className="card" style={{ width: "30rem" }}>
                                                                            <div className="card-body">
                                                                                <h5 className="card-title">{carrito.name}</h5>
                                                                                <hr />
                                                                                <p className="card-text">{carrito.description}</p>
                                                                                <p className="precio">{carrito.precio} CLP</p>
                                                                            </div>

                                                                            <button style={{ width: "10rem" }} id="eliminar" className="btn btn-danger">Eliminar del carrito</button>
                                                                        </div>
                                                                    </ul> */}
                                                            {/* </div> <div>No hay items en el carrito</div>
                                                            </ul> */}
                                                        </div>
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
                                                            value="1"
                                                            onChange={(e) => setPago(e.target.value)}
                                                        />
                                                        <label htmlFor="mercadopago" className="pagar">MercadoPago</label>
                                                        <input
                                                            type="radio"
                                                            id="webpay"
                                                            name="pago"
                                                            value="2"
                                                            onChange={(e) => setPago(e.target.value)}
                                                        />
                                                        <label htmlFor="webpay" className="pagar">Webpay</label>
                                                        <input
                                                            type="radio"
                                                            id="paypal"
                                                            name="pago"
                                                            value="3"
                                                            onChange={(e) => setPago(e.target.value)}
                                                        />
                                                        <label htmlFor="paypal" className="pagar">Paypal</label>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary mb-3" onClick={(e) => onSubmit(e)}>Confirmar la compra</button>

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

                        </div>
                    </div>
                </div >



            </>
        </Container >
    );
}