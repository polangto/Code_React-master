import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import {Engage} from "./Engage_Attribute";
import Respond from "./Respond_Attribute";
import {Detect_Analyze} from "./Detect_Analyze_Attribute";

export class Description extends Component {
	constructor(props) {
		super(props);
		this.state = {
			progress_value: (props.count*100-((props.count*100)%props.total))/props.total,
			total:props.total,
			count:props.count,
		};
	}

	// static getDerivedStateFromProps(props, state) {
	// 	let progress = (props.count*100-((props.count*100)%props.total))/props.total;
	// 	return {progress_value: progress };
	// }

	colapseButton = () => {
		this.setState((state) => ({
			colapse: !state.colapse,
		}));
	};

	resetProgressBar = (count) =>{
		console.log(count)
		let {total} = this.state;
		let progress = (count*100-((count*100)%total))/total;
		this.setState({
			progress_value: progress,
			count:count,
		});
	}

	render() {
		let { progress_value,count } = this.state;
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
				<div className="row">
					<table id="mytable" className="table table-bordred table-striped">
						<thead>
						<th key style={{width:"37px"}}></th>
						<th className="d-flex justify-content-start">Task Name</th>
						<th>Action</th>
						</thead>
					</table>
				</div>
				<Engage info={engage} count={count} setCount={this.resetProgressBar}/>
				<Detect_Analyze info={detect} count={count} setCount={this.resetProgressBar}/>
				<Respond info={respond}/>
			</div>
		);
	}
}
