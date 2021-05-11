import React, { useContext } from "react";
import { Context } from "../store/appContext";
import RecoverField from "../component/recoverField";

export const Recover = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<RecoverField />
		</div>
	);
};
