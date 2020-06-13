import React, { Component } from "react";
import Background from "../images/background_login.jpg";
import md5 from "md5";
// import axios from "axios";
import {Redirect} from "react-router-dom";
// import App from "../App";


export default class loginPage extends Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated:false,
			email: "",
			password: "",
		};
	}

	changeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	changePassword = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	submitForm = () => {
		let { email, password,isAuthenticated } = this.state;
		let data = {
			email: email,
			password: md5(password),
		};
		let datatest = {
			email: "admin@inseclab.local",
			password: "admin",
		};
		let url = "http://10.102.10.244:8080/api/login";
		datatest = JSON.stringify(datatest);
		let requestOption = {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "include", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: datatest, // body data type must match "Content-Type" header
		};

		fetch(url, requestOption)
			.then((response) => response.json())
			.then((result) => {
				if(result.status === "Login successful"){
					sessionStorage.setItem('isAuthenticated', true)
					this.setState({isAuthenticated:true});
				}
			})
			.catch((error) => console.log("error", error));

	};


	render() {
		// var background = {
		// 	width: "100%",
		// 	heigh: "100%",
		// 	backgroundImage: `url(${Background})`,
		// };
		let {isAuthenticated} = this.state;
		if (isAuthenticated){
			return <Redirect
				to={{ pathname: '/dashboards' }}
			/>
		}
		else{
			return <div className='d-flex justify-content-center mt-5'>
				<form className='border rounded p-4' style={{ width: "25%" }}>
					<div className='form-group'>
						<label htmlFor='exampleInputEmail1'>Email address</label>
						<input
							type='email'
							className='form-control'
							id='exampleInputEmail1'
							aria-describedby='emailHelp'
							placeholder='Enter email'
							onChange={this.changeEmail}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Password</label>
						<input
							type='password'
							className='form-control'
							id='exampleInputPassword1'
							placeholder='Password'
							onChange={this.changePassword}
						/>
					</div>
					<div className='form-check'>
						<input
							type='checkbox'
							className='form-check-input'
							id='exampleCheck1'
						/>
						<label className='form-check-label' htmlFor='exampleCheck1'>
							Check me out
						</label>
					</div>
					<button
						type='button'
						className='btn btn-primary'
						onClick={this.submitForm}>
						Submit
					</button>
				</form>
			</div>
		}
	}
}
