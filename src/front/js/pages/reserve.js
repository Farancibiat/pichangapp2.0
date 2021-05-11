import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../component/header";
import { Context } from "../store/appContext";
import ReservationFields from "../component/reservationfields";
import HeaderReserve from "../component/headerreserve";
import SelectCancha from "../component/selectcancha";
import NotLogRes from "../component/notlogres";

import "../styles/agendar.css";
import "react-datepicker/dist/react-datepicker.css";

export const Reserve = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<HeaderReserve />
			{store.loginStatus ? (
				store.complexId == "" || location.pathname.split("/")[2] != store.complexId ? (
					<SelectCancha />
				) : (
					<ReservationFields />
				)
			) : (
				<NotLogRes />
			)}
		</>
	);
};
