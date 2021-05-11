import React, { useContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "../styles/header.css";

export const Header = () => {
	const { store, actions } = useContext(Context);
	const [redirect, setRedirect] = useState(null);
	const [selRegion, setRegion] = useState(0);
	const [selComuna, setComuna] = useState(0);
	const [selComplejo, setComplejo] = useState("");
	const [comunas, setComunas] = useState(["-"]);
	const [complejos, setComplex] = useState(["-"]);
	const [url, setUrl] = useState("");

	// Se usa useEffect para activar useState asociados a selRegion y selComuna, de lo contrario
	// cambian de valor al segundo llamado de su función y el código falla.

	const submitHandler = e => {
		e.preventDefault();
		if (selRegion != "Región" && selComuna != "Comuna" && selComplejo != "Cancha" && selComplejo != "") {
			const aux = window.location.pathname.split("/");
			if (aux[1] == "reserve") {
				setUrl(`${selComplejo}`);
				actions.setComplexId(selComplejo);
			} else {
				setUrl(`reserve/${selComplejo}`);
				actions.setComplexId(selComplejo);
			}
			setRedirect(true);
		} else {
			toast.error(" ¡Complete los campos correctamente!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		}
	};
	useEffect(
		() => {
			// action required when a diferent Region it's selected
			if (selRegion != "Región") {
				setComunas(store.searchEng[selRegion].communes);
				actions.setComplexId("");

				// action required when a diferent Commune it's selected

				if (parseInt(selComuna) < store.searchEng[selRegion].communes.length) {
					setComplex(store.searchEng[selRegion].communes[selComuna].complex);
				}
			}
			if (store.reservationToast) {
				toast.success("¡Reserva exitosa! Revisa tu correo ", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
				actions.setReservationToast(false);
			}

			if (store.closeSessionToast) {
				toast.success("¡Sesión cerrada con éxito! ", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
				actions.setCloseSessionToast(false);
			}
			actions.setRedirect(false);
			if (store.validateState == 1) {
				toast.success("¡Correo enviado exitosamente! ", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
				actions.setValidateState(0);
			}
			if (store.LoginToast) {
				actions.setLoginToast(false);
				toast.success("¡Login exitoso! ", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			}
		},
		[selRegion, selComuna, selComplejo, store.closeSessionToast]
	);
	function change_commune(event) {
		setRegion(event.target.value);
	}

	function change_complex(event) {
		setComuna(event.target.value);
	}
	function change_url(e) {
		setComplejo(e.target.value);
	}
	return (
		<div className="fondo_header d-flex">
			<ToastContainer />
			{redirect ? <Redirect to={`${url}`} /> : ""}
			<div className="card text-center formulario w-50 mx-auto my-auto">
				<form>
					<div className="form-group mb-0 p-2">
						<div className="card-body p-3">
							<div className="row">
								<div className="col-12 col-sm-4 px-1">
									<select
										className="custom-select"
										id="selectRegion"
										defaultValue="Región"
										onChange={e => change_commune(e)}>
										<option key="-1" value="Región">
											Región
										</option>
										{// Renderizado de regiones desde Store
										store.searchEng.map((region, index) => {
											return (
												<option key={index} value={index}>
													{region.name}
												</option>
											);
										})}
									</select>
								</div>
								<div className="col-12 col-sm-4 px-1">
									<select
										className="custom-select"
										id="selectComuna"
										defaultValue="Comuna"
										onChange={e => change_complex(e)}>
										<option key="-1" value="Comuna">
											Comuna
										</option>
										{// Renderizado de comunas desde Store
										comunas.map((commune, index) => {
											return (
												<option key={index} value={index}>
													{commune.name}
												</option>
											);
										})}
									</select>
								</div>
								<div className="col-12 col-sm-4 px-1">
									<select
										className="custom-select"
										id="selectCancha"
										defaultValue="Cancha"
										onChange={e => change_url(e)}>
										<option key="-1" value="Cancha">
											Cancha
										</option>
										{// Renderizado de complejos(recintos) desde store
										complejos[0] != "-"
											? complejos.map((cancha, index) => {
													return (
														<option key={index} value={index}>
															{cancha.name}
														</option>
													);
											  })
											: ""}
									</select>
								</div>
							</div>
							<div className="row pt-3">
								<div className="col-12 col-sm-12 px-0">
									<button
										type="submit"
										id="reservePage"
										className="btn btn-success my-0"
										onClick={submitHandler}>
										Reservar
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Header;
