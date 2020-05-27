import React, { Component } from 'react';
import Summary from './Individual_Incident/Summary';
import Description from './Individual_Incident/Description';
import { useParams } from 'react-router-dom';

export default class Detail_Incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			playbook: [],
			id: 0,
		};
	}

	static getDerivedStateFromProps(props, state) {
		return {id: props.match.params.id };
	}
	componentDidMount() {
		let url = 'http://10.102.10.244:8080/api/playbook/?id='+this.state.id;
		// let { token } = this.state;
		// let cookie = "user_id=" + token;

		let requestOptions = {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
					var list = JSON.parse(result);
					this.setState({
						isLoaded: true,
						playbook: list,
					});
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
		let { id, playbook } = this.state;
		console.log(playbook[0]);
		let engage = [];
		let detect = [];
		let respond = [];
		playbook.map((items) => {
			if (items.type === "1") {
				engage.push(items);
			} else if (items.type === "2") {
				detect.push(items);
			} else {
				respond.push(items);
			}
		});
		const { error, isLoaded } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return(
					<div key={playbook.id} className="container-fluid">
						<h2>{playbook.name}</h2>
						<div className="row">
							<div className="mt-3 col-4">
								<Summary
									info ={playbook[0]}
								/>
							</div>
							<div className="mt-3 col-8">
								<Description
									engage={engage}
									detect={detect}
									respond={respond}
								/>
							</div>
						</div>
					</div>
			)
		}
	}
}
