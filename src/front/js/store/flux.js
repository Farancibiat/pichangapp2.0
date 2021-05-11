import emailjs from "emailjs-com";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loginStatus: false,
			// Toast que detona mensaje de login exitoso en home
			loginToast: false,
			// Toast que detona mensaje de registro existoso en login
			registerToast: false,
			// Toast que detona mensaje de cambio de clave existoso en login
			recoveryToast: false,
			// Toast que detona mensaje de error en login cuando falla login
			mistakenToast: false,
			// Toast que detona mensaje de reserva exitosa
			reservationToast: false,

			closeSessionToast: false,

			token: "",
			toastMessage: "",
			recoveryUser: "",
			validateState: 0,

			redirect: false,

			logedUser: {
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				id: ""
			},
			complexId: "",
			horasReservadas: { "01/01/0001": [0] },
			selectDate: new Date(),
			reserve: {
				reserveId: "",
				fecha: "",
				hora: "",
				servShirts: false,
				servBall: false,
				servReferee: false
			},
			complejo: {
				id: 0,
				nameRecinto: "Cargando Complejo...",
				openHour: 0,
				closeHour: 0,
				email: "",
				phone: ""
			},
			unavailable: [],
			searchEng: [
				{
					name: "Arica y Parinacota",
					communes: [
						{
							name: "Arica",
							complex: ["-"]
						}
					]
				},
				{
					name: "Tarapacá",
					communes: [
						{
							name: "Iquique",
							complex: ["-"]
						}
					]
				},
				{
					name: "Antofagasta",
					communes: [
						{
							name: "Antofagasta",
							complex: ["-"]
						}
					]
				},
				{
					name: "Atacama",
					communes: [
						{
							name: "Copiapó",
							complex: ["-"]
						}
					]
				},
				{
					name: "Coquimbo",
					communes: [
						{
							name: "La Serena",
							complex: ["-"]
						}
					]
				},
				{
					name: "Valparaiso",
					communes: [
						{
							name: "Valparaiso",
							complex: []
						}
					]
				},
				{
					name: "Metropolitana",
					communes: [
						{
							name: "Santiago",
							complex: ["-"]
						},
						{
							name: "Maipú",
							complex: ["-"]
						},
						{
							name: "Renca",
							complex: ["-"]
						},
						{
							name: "San Joaquín",
							complex: ["-"]
						}
					]
				},
				{
					name: "Libertador General Bernardo O'Higgins",
					communes: [
						{
							name: "Rancagua",
							complex: ["-"]
						}
					]
				},
				{
					name: "Maule",
					communes: [
						{
							name: "Talca",
							complex: ["-"]
						},
						{
							name: "Curicó",
							complex: [
								{
									name: "Los Vidales",
									mail: "losvidales@gmail.com",
									phone: "+56912341234",
									rentPrice: 20000,
									ballPrice: 3000,
									refereePrice: 20000
								}
							]
						}
					]
				},
				{
					name: "Ñuble",
					communes: [
						{
							name: "Chillán",
							complex: ["-"]
						}
					]
				},
				{
					name: "Bio Bío",
					communes: [
						{
							name: "Concepción",
							complex: ["-"]
						}
					]
				},
				{
					name: "La Araucanía",
					communes: [
						{
							name: "Temuco",
							complex: ["-"]
						}
					]
				},
				{
					name: "Los Ríos",
					communes: [
						{
							name: "Valdivia",
							complex: ["-"]
						}
					]
				},

				{
					name: "Los Lagos",
					communes: [
						{
							name: "Puerto Montt",
							complex: ["-"]
						},
						{
							name: "Castro",
							complex: [
								{
									name: "Donde Manolo",
									mail: "dondemanolo@gmail.com",
									phone: "+56912341234",
									rentPrice: 20000,
									ballPrice: 1000,
									refereePrice: 20000
								},
								{
									name: "Sport 7",
									mail: "sport7@gmail.com",
									phone: "+56900001234",
									rentPrice: 25000,
									ballPrice: 1000,
									refereePrice: 20000
								},
								{
									name: "Municipal 2",
									mail: "municipal2@gmail.com",
									phone: "+56912340000",
									rentPrice: 23000,
									ballPrice: 1000,
									refereePrice: 20000
								}
							]
						}
					]
				},
				{
					name: "Aysén del General Carlos Ibáñez del Campo",
					communes: [
						{
							name: "Coyhaique",
							complex: ["-"]
						}
					]
				},
				{
					name: "Magallanes y la Antártica Chilena",
					communes: [
						{
							name: "Punta Arenas",
							complex: ["-"]
						}
					]
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			cerrarSesion: () => {
				setStore({ loginStatus: false });
				setStore({
					logedUser: {
						firstName: "",
						lastName: "",
						email: "",
						phone: "",
						id: ""
					}
				});
				setStore({ closeSessionToast: true });
				localStorage.clear();
				sessionStorage.clear();
			},

			createUser: user => {
				fetch(process.env.BACKEND_URL + "/api/create-user", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(response => response.json())
					.then(data => {
						setStore({ user: data });
					})
					.catch(error => {
						console.log("Error inesperado", error);
					});
			},

			getToken: () => {
				if (localStorage.getItem("token") != null) {
					const tokenLocal = localStorage.getItem("token");
					const userLocal = JSON.parse(localStorage.getItem("user"));
					setStore({ token: tokenLocal });
					setStore({ logedUser: userLocal });
					setStore({ loginStatus: true });
				}
			},

			setLogin: (user, rememberMe) => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						if (data.token) {
							setStore({ token: data.token });
							setStore({ logedUser: data.user });
							setStore({ loginStatus: true });
							if (rememberMe) {
								if (typeof Storage !== "undefined") {
									localStorage.setItem("token", data.token);
									localStorage.setItem("user", JSON.stringify(data.user));
								} else {
									console.log("LocalStorage no soportado en este navegador");
								}
							} else {
								if (typeof Storage !== "undefined") {
									sessionStorage.setItem("token", data.token);
									sessionStorage.setItem("user", JSON.stringify(data.user));
								} else {
									console.log("LocalStorage no soportado en este navegador");
								}
							}
							setStore({ redirect: true });
						} else if (data.msg) {
							console.log("entra en no-token");
							setStore({ toastMessage: data.msg });
							setStore({ mistakenToast: true });
						}
					})
					.catch(error => {
						console.log("entra en catch");
						setStore({ mistakenToast: true });
						setStore({ toastMessage: "Error loading message from backend" + error });
					});
			},
			setMistakenToast: value => setStore({ mistakenToast: value }),
			setComplexId: id => {
				setStore({ complexId: id });
			},

			cargarComplejo: () => {
				console.log(getStore().complexId);
				fetch(process.env.BACKEND_URL + `/api/recinto/${getStore().complexId}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				})
					.then(data => data.json())
					.then(response => {
						console.log(response);
						setStore({
							complejo: response.recintos
						});
						getActions().loadHorasReservadas();
					});
			},
			setSelectDate: aux => {
				setStore({ selectDate: aux });
			},
			setToast: aux => {
				setStore({ loginToast: aux });
			},
			setCloseSessionToast: aux => {
				setStore({ closeSessionToast: aux });
			},
			setReservationToast: aux => {
				setStore({ reservationToast: aux });
			},

			setRegisterToast: aux => {
				setStore({ registerToast: aux });
			},
			setRecoveryToast: aux => {
				setStore({ recoveryToast: aux });
			},
			setLoginToast: aux => {
				setStore({ LoginToast: aux });
			},
			setRedirect: value => setStore({ redirect: value }),

			setValidateState: state => setStore({ validateState: state }),

			validate: mail => {
				let token = 1000000 + Math.floor(Math.random() * 9000000);
				fetch(process.env.BACKEND_URL + "/api/validate", {
					method: "POST",
					body: JSON.stringify({
						email: mail,
						numberToken: token
					}),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						if (data.msg == "Token Modificado Successfully") {
							emailjs.send(
								"pichangapp_s26kmmb",
								"template_8mtz89o",
								{
									user_mail: mail,
									user_name: data.name,
									token: "https://3000-white-frog-i06mrmo4.ws-us03.gitpod.io/recover/" + token
								},
								"user_F3htLlSg7bVzumwkoOdNw"
							);
							setStore({ validateState: 1 });
						} else {
							setStore({ validateState: 2 });
						}
					})
					.catch(error => {
						setStore({ validateState: 3 });
					});
			},

			recoverPass: (pass, token) => {
				fetch(process.env.BACKEND_URL + "/api/modifypass", {
					method: "POST",
					body: JSON.stringify({
						password: pass,
						numberToken: token
					}),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log(data);
					});
			},

			createReserve: (fecha, hour) => {
				console.log(getStore().complexId);
				fetch(process.env.BACKEND_URL + "/api/reserva", {
					method: "POST",
					body: JSON.stringify({
						idRecinto: getStore().complexId,
						horaReserva: hour,
						diaReserva: fecha
					}),
					headers: { "Content-type": "application/json" }
				})
					.then(response => response.json())
					.then(data => {
						console.log(data.msg);
					})
					.catch(error => {
						console.log("Error inesperado", error);
					});
			},

			loadHorasReservadas: () => {
				fetch(process.env.BACKEND_URL + `/api/reserva/${getStore().complexId}`, {
					method: "GET",
					headers: { "Content-type": "application/json" }
				})
					.then(response => response.json())
					.then(data => {
						setStore({ horasReservadas: data });
					})
					.catch(error => {
						console.log("Error inesperado", error);
					});
			}
		}
	};
};
export default getState;
