import "./App.css";
import React, { useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import HomeWelcome from "./pages/HomeWelcome";
import Search from "./pages/Search";
import MyPetsPage from "./pages/MyPetsPage";
import PetPage from "./pages/PetPage";
import Admin from "./pages/Admin";
import petsList from "./components/AdminPetsList";
import UsersList from "./components/UsersList/AdminUsersList";
import { getPetInfo, getUserAdoptedPets } from "./data/petsApi";
import { getAllUsers } from "./data/usersApi";
import BackToTop from "./components/BackToTop";
import PrivateRoute from "./components/PrivateRoute";
// import Footer from "./components/Footer";

function App() {
	//backEnd
	//todo add validation for all be functions

	//frontEnd
	//todo add to admin page - user list and pet list
	//todo add the ability to update a pet card
	//todo add favorite button to search card

	const [show, setShow] = useState(false);
	const [register, setRegister] = useState(true);
	const [currentUser, setCurrentUser] = useState("");
	const [loggedIn, setLoggedIn] = useState("");
	const [allPetInfo, setAllPetInfo] = useState({});
	const [AllUsersInfo, SetAllUsersInfo] = useState({});
	const [registerNotice, setRegisterNotice] = useState("");
	const [petAdded, setPetAdded] = useState("");
	const [userAdoptedPets, setUserAdoptedPets] = useState({});

	useEffect(() => {
		getPetInfo().then(response => {
			setAllPetInfo(response);
		});
	}, []);

	useEffect(() => {
		getAllUsers().then(response => {
			console.log("all users", response);
			SetAllUsersInfo(response);
		});
	}, []);

	useEffect(() => {
		const id = localStorage.getItem("userId");
		const firstName = localStorage.getItem("firstName");
		const lastName = localStorage.getItem("lastName");
		const isAdmin = localStorage.getItem("isAdmin");
		const loggedInUser = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			isAdmin: isAdmin,
		};
		if (id) {
			setLoggedIn(loggedInUser);
			console.log("app.js loggedInUser: ", loggedInUser);
		}
	}, []);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		console.log(" app.js userId", userId);
		if (userId) {
			getUserAdoptedPets(userId).then(response => {
				setUserAdoptedPets(response);
				console.log("mypets app.js", response);
			});
		}
	}, []);

	return (
		<div className="App">
			<AppContext.Provider
				value={{
					show: show,
					setShow: setShow,
					register: register,
					setRegister: setRegister,
					currentUser: currentUser,
					setCurrentUser: setCurrentUser,
					allPetInfo: allPetInfo,
					setAllPetInfo: setAllPetInfo,
					AllUsersInfo: AllUsersInfo,
					SetAllUsersInfo: SetAllUsersInfo,
					loggedIn: loggedIn,
					setLoggedIn: setLoggedIn,
					registerNotice: registerNotice,
					setRegisterNotice: setRegisterNotice,
					petAdded: petAdded,
					setPetAdded: setPetAdded,
					userAdoptedPets: userAdoptedPets,
					setUserAdoptedPets: setUserAdoptedPets,
				}}
			>
				<Router>
					<BackToTop />
					<NavBar />
					<Route path="/" exact component={Home} />
					<Route path="/search" exact component={Search} />
					<PrivateRoute path="/homeWelcome" exact component={HomeWelcome} />
					<PrivateRoute path="/myPetsPage" exact component={MyPetsPage} />
					<Route path="/petPage" exact component={PetPage} />
					<PrivateRoute path="/admin" exact component={Admin} />
					<PrivateRoute path="/petList" exact component={petsList} />
					<PrivateRoute path="/usersList" exact component={UsersList} />
				</Router>
				{/* <Footer /> */}
			</AppContext.Provider>
		</div>
	);
}

export default App;
