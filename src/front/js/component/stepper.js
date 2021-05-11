import React from "react";
// import { Link } from "react-router-dom";

import Picture from "../../img/vectorstock_8229541.png";
import Step1 from "../../img/step1.jpg";
import Step2 from "../../img/step2.jpg";
import Step3 from "../../img/step3.jpg";
import Step4 from "../../img/step4.jpg";

const Stepper = () => {
	return (
		<>
			<div className="row py-3 mx-3">
				<div className="col-sm-3 col-md-6 col-lg-3 my-2">
					<div className="card">
						<div className="card-body">
							<img src={Step1} className="card-img" alt="..." />
						</div>
					</div>
				</div>

				<div className="col-sm-3 col-md-6 col-lg-3 my-2">
					<div className="card">
						<div className="card-body">
							<img src={Step2} className="card-img" alt="..." />
						</div>
					</div>
				</div>
				<div className="col-sm-3 col-md-6 col-lg-3 my-2">
					<div className="card">
						<div className="card-body">
							<img src={Step3} className="card-img" alt="..." />
						</div>
					</div>
				</div>
				<div className="col-sm-3 col-md-6 col-lg-3 my-2">
					<div className="card">
						<div className="card-body">
							<img src={Step4} className="card-img" alt="..." />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Stepper;
