import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbars } from "./component/navbars";
import { Footer } from "./component/footer";
import Login from "./pages/login";
import Paginainicial from "./pages/Paginainicial";
import { MisCursos } from "./pages/misCursos"
import { Usuarios } from "./pages/usuarios";


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
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/Paginainicial">
							<Paginainicial />
						</Route>
						
						<Route exact path="/Login">
						<Login />	
						</Route>
						<Route exact path="/miscursos">
							<MisCursos />
						</Route>
						<Route exact path="/usuarios">
							<Usuarios />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
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
