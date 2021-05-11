import React, { Component } from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo_navbar.png";

export const Footer = () => {
	return (
		<>
			<footer className="bg-warning page-footer text-white py-5 mb-0 pb-0">
				<div className="container">
					<div className="row">
						<div className="col-md-3 text-white d-flex justify-content-center">
							<p className="p_footer align-text-bottom text-dark">
								Contacto: pichangapp.corp@gmail.com <br />
								Teléfono: +569-58718266
							</p>
						</div>

						<div className="col-md-6 text-white text-lowercase d-flex justify-content-center">
							<section className="mb-4">
								<a
									className="btn btn-outline-light btn-floating m-1 align-middle"
									href="https://www.facebook.com/"
									rel="noopener noreferrer"
									target="_blank"
									role="button">
									<i className="fab fa-facebook-f" />
								</a>

								<a
									className="btn btn-outline-light btn-floating m-1 align-middle"
									href="https://www.google.cl/"
									rel="noopener noreferrer"
									target="_blank"
									role="button">
									<i className="fab fa-google" />
								</a>

								<a
									className="btn btn-outline-light btn-floating m-1 align-middle"
									href="https://www.instagram.com/"
									rel="noopener noreferrer"
									target="_blank"
									role="button">
									<i className="fab fa-instagram" />
								</a>
							</section>
						</div>
						<div className="col-md-3 text-white text-lowercase d-flex align-items-center justify-content-center">
							<img
								src={logo}
								width="140px"
								alt="Logo Pichangapp"
								className="img-logo mr-2 align-items-center mt-0 pt-0"
							/>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};
