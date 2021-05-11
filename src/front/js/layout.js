import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Account } from "./pages/account";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { NotFound } from "./pages/notfound";
import { Profile } from "./pages/profile";
import { Recoverpass } from "./pages/recoverpass";
import { Recover } from "./pages/recover";
import { Reserve } from "./pages/reserve";

import injectContext from "./store/appContext";
import { NavigationBar } from "./component/navigationbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				<NavigationBar />
				<Switch>
					<Route exact path="/account">
						<Account />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/recover">
						<Recover />
					</Route>
					<Route exact path="/recover/:token">
						<Recoverpass />
					</Route>
					<Route exact path="/reserve/:theId">
						<Reserve />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
				<Footer />
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default injectContext(Layout);
