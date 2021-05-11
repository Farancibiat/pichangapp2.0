import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../styles/login.css";
import { Link, Redirect } from "react-router-dom";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RecoverField = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");

	useEffect(
		() => {
			if (store.validateState == 1) {
				actions.setRedirect(true);
			}

			if (store.validateState == 2) {
				toast.error("Error intente nuevamente", {
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
			if (store.validateState == 3) {
				toast.error("Error de conexión con servidor", {
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
		},
		[store.validateState]
	);

	const handlerSubmit = e => {
		e.preventDefault();
		actions.validate(email);
	};

	return (
		<div className="fondo-login justify-content-center">
			<ToastContainer />
			{store.redirect ? <Redirect to="/" /> : ""}
			<div className="con1">
				<div className="d-flex justify-content-center h-100">
					<div className="card-login rounded-lg">
						<div className="card-header">
							<h3>Recuperar</h3>
						</div>
						<div className="card-body">
							<form onSubmit={e => handlerSubmit(e)}>
								<div className="input-group form-group py-5">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fas fa-envelope" />
										</span>
									</div>
									<input
										type="email"
										value={email}
										className="form-control"
										placeholder="Email"
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
								<div className=" form-group">
									<input type="submit" value="Enviar" className="btn float-right login_btn" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecoverField;
