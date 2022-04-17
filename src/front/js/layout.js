import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useCart } from "react-use-cart";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbars } from "./component/navbars";
import { Footer } from "./component/footer";
import Login from "./pages/login";
import { MisCursos } from "./pages/misCursos";
import Cursos from "./pages/cursos";
import CourseDetail from "./pages/courseDetail";
import { Usuarios } from "./pages/usuarios";
import { Register } from "./component/register";
import { Compra } from "./component/compra";
import { PaymentForm } from "./component/Formulariopago";
import { Pagobueno } from "./pages/Pagocorrecto";
import { Pagomalo } from "./pages/Pagoinfallido";

import { CarroFuncional } from "./component/Datafake";
import { CartProvider } from "react-use-cart";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbars />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/compra">
              <CartProvider>
                <Compra />
              </CartProvider>
            </Route>
            <Route exact path="/payment-form">
              <PaymentForm />
            </Route>
            <Route exact path="/pagocorrecto">
              <Pagobueno />
            </Route>
            <Route exact path="/pagofallido">
              <Pagomalo />
            </Route>
						<Route exact path="/miscursos">
							<MisCursos />
						</Route>
						<Route exact path="/usuarios">
							<Usuarios />
						</Route>
						<Route exact path="/cursos">
							<Cursos />
						</Route>        
            <Route exact path="/courseDetail/:id">
              <CourseDetail />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/Cursos">
              <CarroFuncional />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
