import React, { Component } from "react";
import TableList from "./TableList";
// import data from "../../data";
import DetailIncident from "./Detail_Incident";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// useParams,
	// useLocation,
} from "react-router-dom";
import Tab from "../Tabs";
import { ThreeHorseLoading } from 'react-loadingg';

export default class Incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			token: props.token,
		};
	}
	componentDidMount() {
		let url = "http://10.102.10.244:8080/api/items";
		// let { token } = this.state;
		// let cookie = "user_id=" + token;
		let requestOptions = {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "include", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		};

		fetch(url, requestOptions)
			.then((res) => res.json())
			.then(
				(result) => {
					if(typeof result.status === "undefined"){
						let list = JSON.parse(result);
						this.setState({
							isLoaded: true,
							items: list,
						});
					}
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);

	}

	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div className="container-fluid" style={{backgroundColor: '#090920',
				width: '100vw',
				height: '100vh'}}>
					<Tab/>
					<ThreeHorseLoading/>
			</div>;
		} else {
			return (
				<div>
					<Tab/>
					<Router>
						<Switch>
							<Route path='/list-incident'>
								<TableList bodys={items} />
							</Route>
							<Route
								path='/detail/:id'
								render={(props) => (
									<DetailIncident {...props}/>
								)}
							/>
						</Switch>
					</Router>
				</div>
			);
		}
	}
}
