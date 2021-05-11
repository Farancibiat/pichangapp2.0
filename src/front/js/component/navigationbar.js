import React, { useContext } from "react";
import logo from "../../img/logo_navbar.png";
import "../styles/navigationbar.css";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { LinkContainer } from "react-router-bootstrap";

export const NavigationBar = () => {
	const { store, actions } = useContext(Context);
	function cerrarSesion() {
		actions.cerrarSesion();
	}

	return (
		<>
			<Navbar bg="warning" expand="lg">
				<div className="container">
					<LinkContainer to="/">
						<Link className="navbar-brand" to="/">
							<img src={logo} alt="" width="150" />
						</Link>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{store.loginStatus ? (
								<>
									<p className="mr-4 mt-3">
										<strong>¡Bienvenid@ {store.logedUser.firstName}!</strong>
									</p>
									<LinkContainer to="/">
										<button type="button" className="btn mr-3 mt-2 btn-primary">
											Home
										</button>
									</LinkContainer>
									<LinkContainer to="/">
										<button
											type="button"
											className="btn mr-3 mt-2 btn-danger"
											onClick={cerrarSesion}>
											Cerrar Sesion
										</button>
									</LinkContainer>
								</>
							) : (
								<>
									<LinkContainer to="/">
										<button type="button" className="btn mr-3 mt-2 btn-primary">
											Home
										</button>
									</LinkContainer>
									<LinkContainer to="/login">
										<button type="button" className="btn mr-3 mt-2 btn-info">
											Login
										</button>
									</LinkContainer>
									<LinkContainer to="/account">
										<button type="button" className="btn mr-3 mt-2 btn-success">
											Registrate
										</button>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>
		</>
	);
};
