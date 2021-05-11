// import Tools
import React, { useState, useContext } from "react";

// import images
import Cancha from "../../img/img_reserva.jpg";
import { LinkContainer } from "react-router-bootstrap";

export const SelectCancha = () => {
	const [selectDate, setSelectDate] = useState(null);
	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-sm-4" />
				<div className="col-12 col-sm-4 text-center">
					<p>
						<strong>Estimado Usuario</strong>
					</p>
					<p className="mb-0 pb-0">
						Para poder reservar una cancha debes haber seleccionado una cancha primero
					</p>
					<p>Para esto, debes ir al home:</p>
				</div>
				<div className="col-sm-4" />
			</div>
			<div className="row">
				<div className="col-sm-4" />
				<div className="col-12 col-sm-4 text-center">
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
export default SelectCancha;
