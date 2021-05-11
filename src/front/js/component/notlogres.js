import React, { useState, useContext, useEffect } from "react";
import Cancha from "../../img/img_reserva.jpg";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../store/appContext";
import "react-toastify/dist/ReactToastify.css";

export const NotLogRes = () => {
	const { store, actions } = useContext(Context);
	useEffect(
		() => {
			if (store.closeSessionToast) {
				toast.success("¡Seción cerrada con éxito! ", {
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
		},
		[store.closeSessionToast]
	);
	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-sm-4" />
				<div className="col-12 col-sm-4 text-center">
					<p>
						<strong>Estimado Usuario</strong>
					</p>
					<p>Para poder reservar una cancha debes estar registrado.</p>
				</div>
				<div className="col-sm-4" />
			</div>
			<div className="row">
				<div className="col-sm-4" />
				<div className="col-12 col-sm-4 text-center">
					<LinkContainer to="/login">
						<button type="button" className="btn mr-3 mt-2 btn-info">
							Login
						</button>
					</LinkContainer>
					<LinkContainer to="/">
						<button type="button" className="btn mr-3 mt-2 btn-primary">
							Home
						</button>
					</LinkContainer>
				</div>
				<div className="col-sm-4" />
			</div>
			<div className="row">
				<div className="col-sm-4" />
				<div className="col-12 col-sm-4 text-center">
					<img src={Cancha} alt="Small Court" />
				</div>
				<div className="col-sm-4" />
			</div>
		</div>
	);
};
export default NotLogRes;
