import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/account.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Account = () => {
	const { store, actions } = useContext(Context);
	const [firstName, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(null);

	const handleSubmit = e => {
		e.preventDefault();
		if (firstName != "" && lastName != "" && email != "" && password != "" && phone != "") {
			actions.createUser({
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: parseInt(phone),
				password: password
			});
			actions.setRegisterToast(true);
			actions.setToast(true);

			setRedirect(true);
		} else {
			toast.error(" ¡Complete todos los campos!", {
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
		<div className="fondo-account">
			{redirect ? <Redirect to="/login/" /> : ""}
			<div className="card-account card ">
				<article className="account-style card-body mx-auto rounded-lg">
					<h4 className="card-title mt-3 text-center">Crea Tu Cuenta</h4>
					<p className="text-center" />
					<p className="divider-text">
						<span className="bg-transparent" />
					</p>
					<form>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{" "}
									<i className="fa fa-user" />{" "}
								</span>
							</div>
							<input
								name="Nombre"
								value={firstName}
								className="form-control"
								placeholder="Nombre"
								type="text"
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{" "}
									<i className="fa fa-user" />{" "}
								</span>
							</div>
							<input
								name="Apellido"
								value={lastName}
								className="form-control"
								placeholder="Apellido"
								type="text"
								onChange={e => setLastName(e.target.value)}
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{" "}
									<i className="fa fa-envelope" />{" "}
								</span>
							</div>
							<input
								name="Email"
								value={email}
								className="form-control"
								placeholder="Email"
								type="email"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{" "}
									<i className="fa fa-phone" />{" "}
								</span>
							</div>
							<select className="account-style2 custom-select">
								<option>+569</option>
							</select>
							<input
								name="Phone"
								value={phone}
								className="form-control"
								placeholder="Teléfono"
								type="text"
								onChange={e => setPhone(e.target.value)}
							/>
						</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{" "}
									<i className="fa fa-lock" />{" "}
								</span>
							</div>
							<input
								name="Password"
								value={password}
								className="form-control"
								placeholder="Crea tu Contraseña"
								type="password"
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>
								Crear Cuenta
							</button>
							<ToastContainer />
						</div>
					</form>
				</article>
			</div>
		</div>
	);
};
