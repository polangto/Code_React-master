import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Engage from "./Engage_Attribute";
import Respond from "./Respond_Attribute";
import DetectAnalyze from "./Detect_Analyze_Attribute";

export default class Detail_Incident extends Component {
	constructor() {
		super();
		this.state = {
			progress_value: 0,
		};
	}

	colapseButton = () => {
		this.setState((state) => ({
			colapse: !state.colapse,
		}));
	};

	render() {
		let { progress_value } = this.state;
		let {engage,detect,respond} = this.props;

		return (
			<div>
				<h4>Description</h4>
				<p>No description</p>
				<h3>Tasks</h3>
				<hr />
				<div className="row">
					<div className="col-4">
						<label htmlFor="progress_bar">{`${progress_value}% Complete`}</label>
						<ProgressBar id="progress_bar" now={progress_value} />
					</div>
					<div className="d-flex col-8">
						<button type="button" className="ml-auto btn btn-outline-dark m-2">
							Add task
						</button>
					</div>
				</div>
				<table id="mytable" className="table table-bordred table-striped">
					<thead>
					<th></th>
					<th>Task Name</th>
					<th>Action</th>
					</thead>
				</table>
				<Engage info={engage}/>
				<DetectAnalyze info={detect}/>
				<Respond info={respond}/>
			</div>
		);
	}
}
