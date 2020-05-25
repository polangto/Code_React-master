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
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			token: "",
			isAuthentication:false
		};
	}

	setAuthen = (value) => {
		if(value === "true")
			this.setState({isAuthentication:true})
	}

	render() {
		let {isAuthentication} = this.state;
		// console.log(window.location.pathname);
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path="/" render={() => (
							isAuthentication ? (
								<Redirect to="/dashboards"/>
							) : (
								<Redirect to="/login"/>
							)
						)}/>
						<Route exact path='/login'>
							<LoginPage/>
						</Route>
						<PrivateRoute path='/dashboards' component={Dashboards}/>
						<PrivateRoute exact path='/list-incident' component={Incident}/>
						<Route path="*" component={()=>"404 NOT FOUND"}/>
					</Switch>
				</Router>
			</div>
		);
	}
}
