import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/login.css";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RecoverPass = () => {
	const { store, actions } = useContext(Context);
	const [pass2, setPass2] = useState("");
	const [token, setToken] = useState(location.pathname.split("/")[2]);
	const [pass1, setPass1] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handlerSubmit = e => {
		e.preventDefault();
		if (pass2 == pass1) {
			actions.recoverPass(pass2, token);
			actions.setRecoveryToast(true);
			setRedirect(true);
		} else {
			toast.error("Las claves ingresadas no son iguales", {
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

	return (
		<div className="fondo-login justify-content-center">
			<ToastContainer />
			{redirect ? <Redirect to="/login" /> : ""}
			<div className="con1">
				<div className="d-flex justify-content-center h-100">
					<div className="card-login rounded-lg">
						<div className="card-header">
							<h3>Crear Contraseña</h3>
						</div>
						<div className="card-body">
							<form onSubmit={e => handlerSubmit(e)}>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fas fa-key" />
										</span>
									</div>
									<input
										type="password"
										value={pass1}
										className="form-control"
										placeholder="Contraseña"
										onChange={e => setPass1(e.target.value)}
									/>
								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fas fa-key" />
										</span>
									</div>
									<input
										type="password"
										value={pass2}
										className="form-control"
										placeholder="Reingrese Contraseña"
										onChange={e => setPass2(e.target.value)}
									/>
								</div>
								<div className=" form-group">
									<input type="submit" value="Crear" className="btn float-right login_btn" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecoverPass;
