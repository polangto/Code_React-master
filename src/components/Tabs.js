import React, { Component } from "react";
import "../css/Tabs.css";
import { Navbar, Nav, FormControl, Form, Button } from "react-bootstrap";
import {Link, Redirect, Route} from "react-router-dom";
import Login from "../login/loginPage"



class Tabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect:false
		}
	}

	logout = () =>{
		// if(typeof(sessionStorage.getItem("isAuthenticated")) !== "undefined")
		sessionStorage.removeItem('isAuthenticated');
		console.log("Sign Out");
		this.setState({redirect:true})
		document.cookie = "user_id=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		let url = 'http://10.102.10.244:8080/api/logout';
		let requestOptions = {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		};

		fetch(url, requestOptions)
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result)
				},
			);
	}
	render() {
		let {redirect} = this.state;
		if (redirect){
			return <Redirect
				to={{ pathname: '/login' }}
			/>
		}else{
			return (
				<Navbar bg='dark' variant='dark' expand='lg' className='sticky-top'>
					<Navbar.Brand href='/'>Playbook</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<a className="nav-link" href="/dashboards">Dashboards</a>
							<a className="nav-link" href="/list-incident">List Incident</a>
							<a className="nav-link" href="/assets">Assets</a>
							{/*<Link to='/dashboards' className="nav-link">Dashboards</Link>*/}
							{/*<Link to='/list-incident' className="nav-link">List Incident</Link>*/}
							{/*<Link to='/new-incident' className="nav-link">New Incident</Link>*/}
							{/*<Link to='/my-tasks' className="nav-link">My Tasks</Link>*/}
						</Nav>
						{/*<Form inline>*/}
						{/*	<FormControl type='text' placeholder='Search' className='mr-sm-2' />*/}
						{/*	<Button variant='outline-success'>Search</Button>*/}
						{/*</Form>*/}

						<button
							type="button"
							className="mx-2 btn btn-outline-primary"
							onClick={this.logout}
						>Log out</button>
					</Navbar.Collapse>
				</Navbar>
			);
		}

	}
}

export default Tabs;
