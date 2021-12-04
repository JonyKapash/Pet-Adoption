import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCon } from "../context/AppContext";

export default function PrivateRoute({ component: Component, ...rest }) {
	const { loggedIn } = useCon();

	return (
		<Route
			{...rest}
			render={props => {
				return loggedIn ? <Component {...props} /> : <Redirect to="/" />;
			}}
		/>
	);
}
