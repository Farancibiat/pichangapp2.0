// import Tools
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Datepicker from "react-datepicker";
import emailjs from "emailjs-com";
import { Link, Redirect } from "react-router-dom";

// import css
import "../styles/agendar.css";
import "react-datepicker/dist/react-datepicker.css";

export const ReservationFields = () => {
	const { store, actions } = useContext(Context);
	const [polera, setPolera] = useState(0);
	const [pelota, setPelota] = useState(0);
	const [arbitro, setArbitro] = useState(0);
	const [hour, setHour] = useState(0);
	const [fecha, setFechaString] = useState("");
	const array24Horas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

	useEffect(
		() => {
			if (store.complexId != "") {
				actions.cargarComplejo();
			}
			if (store.selectDate.getMonth < 10) {
				setFechaString(
					store.selectDate.getDate() +
						"/0" +
						(store.selectDate.getMonth() + 1) +
						"/" +
						store.selectDate.getFullYear()
				);
			} else {
				setFechaString(
					store.selectDate.getDate() +
						"/0" +
						(store.selectDate.getMonth() + 1) +
						"/" +
						store.selectDate.getFullYear()
				);
			}
		},
		[store.selectDate]
	);

	function handlerSubmit(e) {
		e.preventDefault();
		console.log("fecha: " + fecha, "hour: " + hour);
		actions.createReserve(fecha, hour);
		emailjs
			.send(
				"pichangapp_s26kmmb",
				"rent_u94nq7m",
				{
					complex_name: store.complejo.nameRecinto,
					to_name: `${store.logedUser.firstName} ${store.logedUser.lastName}`,
					id_reserva: store.reserve.reserveId,
					fecha: fecha,
					hora: hour,
					precio: "20000",
					tshirts_price: `${polera ? 3000 : 0}`,
					ball_price: `${pelota ? 2000 : 0}`,
					referee_price: `${arbitro ? 15000 : 0}`,
					precio_final: `${(polera ? 3000 : 0) + (pelota ? 2000 : 0) + (arbitro ? 15000 : 0) + 20000}`,
					complex_mail: store.complejo.email,
					complex_phone: store.complejo.phone,
					user_mail: store.logedUser.email,
					reply_to: "pichangapp.corp@gmail.com"
				},
				"user_F3htLlSg7bVzumwkoOdNw"
			)
			.then(actions.setReservationToast(true), actions.setRedirect(true));
	}
	function handleChange(event) {
		const input = event.target;
		const value = input.type === "checkbox" ? input.checked : input.value;
		if (event.target.id == "polera") {
			setPolera(value);
		} else if (event.target.id == "pelota") {
			setPelota(value);
		} else {
			setArbitro(value);
		}
	}

	return (
		<>
			<div className="fondo text-center d-flex flex-column justify-content-center">
				{store.redirect ? <Redirect to="/" /> : ""}
				<div className="container py-5">
					<h5 className="display-4 lead encabezado_pichanga">Reserva tu cancha</h5>
					<p className="lead">
						Selecciona la fecha, horario y si necesitas algún accesorio, puedes selecionarlo:
					</p>

					<form onSubmit={handlerSubmit}>
						<div className="row">
							<div className="col-12 col-md-4">
								<div className="contenedor_verde">
									<h5 className="mb-3">Reserva tu Cancha</h5>
									<div className="container">
										<h5>Día:</h5>
										<Datepicker
											className="fecha"
											selected={store.selectDate}
											onChange={date => actions.setSelectDate(date)}
											dateFormat="dd/MM/yyyy"
											minDate={new Date()}
										/>
										<h5 className="mt-2">Hora:</h5>
										<div className="row">
											<div className="col-12">
												<select
													className="custom-select"
													id="hour"
													defaultValue="Seleccione Hora"
													onChange={e => setHour(e.target.value)}>
													<option key="-1" value="Seleccione Hora">
														Selecione Hora
													</option>
													{store.horasReservadas[fecha]
														? array24Horas.map((element, index) => {
																if (
																	element >= store.complejo["openHour"] &&
																	element <= store.complejo["closeHour"] &&
																	!store.horasReservadas[fecha].some(
																		elemento => elemento == element
																	)
																) {
																	return (
																		<option key={index} value={element}>
																			{element}
																			:00
																		</option>
																	);
																}
														  })
														: array24Horas.map((element, index) => {
																if (
																	element >= store.complejo["openHour"] &&
																	element <= store.complejo["closeHour"]
																) {
																	return (
																		<option key={index} value={element}>
																			{element} :00
																		</option>
																	);
																}
														  })}
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-4">
								<div className="contenedor_amarillo">
									<h5 className="mb-3">Servicios Adicionales</h5>
									<div className="container pt-6">
										<div className="row">
											<div className="col-3" />
											<div className="col-6">
												<div className="row">
													<input
														name="arbitro"
														checked={arbitro}
														onChange={e => handleChange(e)}
														type="checkbox"
														id="arbitro"
													/>
													<h6 className="ml-3">Árbitro</h6>
												</div>
												<div className="row">
													<input
														name="polera"
														checked={polera}
														onChange={e => handleChange(e)}
														type="checkbox"
														id="polera"
													/>
													<h6 className="ml-3">Camiseta</h6>
												</div>
												<div className="row">
													<input
														name="pelota"
														checked={pelota}
														onChange={e => handleChange(e)}
														type="checkbox"
														id="pelota"
													/>
													<h6 className="ml-3">Balon</h6>
												</div>
											</div>
											<div className="col-3" />
										</div>
									</div>
								</div>
							</div>

							<div className="col-12 col-md-4">
								<div className="contenedor-azul bg-info">
									<h5 className="mb-3">Costo Total</h5>
									<hr />
									<div className="container">
										<div className="row">
											<div className="col-6">
												<h6 className="ml-3">Cancha</h6>
											</div>
											<div className="col-6">$20.000</div>
										</div>
										<div className="row">
											<div className="col-6">
												<h6 className="ml-3">Árbitro</h6>
											</div>
											<div className="col-6">{arbitro ? `$15.000` : `$0`}</div>
										</div>
										<div className="row">
											<div className="col-6">
												<h6 className="ml-3">Camiseta</h6>
											</div>
											<div className="col-6">{polera ? `$3.000` : `$0`}</div>
										</div>
										<div className="row">
											<div className="col-6">
												<h6 className="ml-3">Balon</h6>
											</div>
											<div className="col-6">{pelota ? `$2.000` : `$0`}</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-6">
												<h6 className="ml-3">Total</h6>
											</div>
											<div className="col-6">{`$${(polera ? 3 : 0) +
												(pelota ? 2 : 0) +
												(arbitro ? 15 : 0) +
												20}.000`}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<p className="lead mt-4">
							Haz click en reservar y te haremos llegar un correo con los detalles de tu reserva:
						</p>
						<div className="row my-3 mx-1 justify-content-center">
							<button type="submit" className="btn btn-primary btn-lg">
								Reservar
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ReservationFields;
