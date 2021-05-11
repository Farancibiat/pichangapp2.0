import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/header.css";

export const HeaderReserve = () => {
	const { store, actions } = useContext(Context);
	// const [comunas, setComunas] = useState(["-"]);
	// const [complex, setComplex] = useState(["-"]);
	// const [url, setUrl] = useState("");
	const aux = store.complejo.nameRecinto;

	return (
		<div className="fondo_header d-flex">
			<div className="card text-center formulario w-50 mx-auto my-auto">
				<h1 className="text-white">
					{store.loginStatus == false
						? `Inicia sesión para Reservar`
						: store.complexId == ""
							? `Selecciona una cancha primero`
							: aux}
				</h1>
			</div>
		</div>
	);
};

export default HeaderReserve;
