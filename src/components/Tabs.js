import React, { Component } from "react";
import "../css/Tabs.css";
import { Navbar, Nav, FormControl, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Tabs extends Component {
	render() {
		return (
			<Navbar bg='dark' variant='dark' expand='lg' className='sticky-top'>
				<Navbar.Brand href='/'>Playbook</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Link to='/dashboards' className="nav-link">Dashboards</Link>
						<Link to='/list-incident' className="nav-link">List Incident</Link>
						<Link to='/new-incident' className="nav-link">New Incident</Link>
						<Link to='/my-tasks' className="nav-link">My Tasks</Link>
					</Nav>
					<Form inline>
						<FormControl type='text' placeholder='Search' className='mr-sm-2' />
						<Button variant='outline-success'>Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Tabs;
