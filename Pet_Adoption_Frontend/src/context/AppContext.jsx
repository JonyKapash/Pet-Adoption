import React, { useContext } from "react";

const AppContext = React.createContext({});

export function useCon() {
	return useContext(AppContext);
}

export default AppContext;
