import React, { Component } from "react";
import Dashboards from "./components/Dashboards/Dashboards";
import Incident from "./components/List_Incident/List_All_Incident";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import LoginPage from "./login/loginPage";
import PrivateRoute from "./login/PrivateRoute";
import DetailIncident from "./components/List_Incident/Detail_Incident";
import {Assets} from "./components/Assets/Assets";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			token: "",
		};
	}


	render() {
		// console.log(window.location.pathname);
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path="/" render={() => (
							typeof(sessionStorage.getItem("isAuthenticated")) !== "undefined" ? (
								<Redirect to="/dashboards"/>
							) : (
								<Redirect to="/login"/>
							)
						)}/>
						<Route exact path='/login'>
							<LoginPage/>
						</Route>
						<PrivateRoute path='/dashboards' component={Dashboards}/>
						<PrivateRoute path='/detail' component={Incident}/>
						<PrivateRoute path='/list-incident' component={Incident}/>
						<PrivateRoute path='/assets' component={Assets}/>

						{/*<Route exact path='/dashboards'>*/}
						{/*	<Dashboards/>*/}
						{/*</Route>*/}
						{/*<Route exact path='/list-incident'>*/}
						{/*	<Incident/>*/}
						{/*</Route>*/}
						<Route path="*" component={()=>"404 NOT FOUND"}/>
					</Switch>
				</Router>
			</div>
		);
	}
}
