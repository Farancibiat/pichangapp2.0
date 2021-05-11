import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { RecoverPass } from "../component/recoverPass";

export const Recoverpass = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<RecoverPass />
		</div>
	);
};

export default Recoverpass;
