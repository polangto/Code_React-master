import React, { Component } from "react";
import {Modal, ProgressBar} from "react-bootstrap";
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
			show:false,
			description:"",
			task_id:0,
			phase:"1",
			name:[],
			inc_id:props.inc_id,
		};
	}
	handleClose = () => {
		this.setState({show:false});
	}
	setShow = () =>{}
	setPhase = (e) =>{
		this.setState({phase:e.target.value})
	}
	delPlaybook = (inc_id, task_id) => {

	}
	addPlaybook = () =>{
		console.log(typeof this.state.task_id);
		let {inc_id, task_id} = this.state;

		let url = 'http://10.102.10.244:8080/api/addplaybook';
		let requestOptions = {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({inc_id:parseInt(inc_id,10), task_id:parseInt(task_id,10), tag_status:"0"})
		};

		fetch(url, requestOptions)
			.then(res => {
				if(res.status === 200){
					window.location.reload();
				}
			});
		this.handleClose();

	}
	setID = (e) => {
		this.setState({task_id:e.target.value})
	}
	componentDidMount()
	{
		let url = 'http://10.102.10.244:8080/api/getinfo';
		let requestOptions = {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
			}
		};

		fetch(url, requestOptions)
			.then(res => res.json()).then(result => {
				let name = JSON.parse(result)
				this.setState({name:name})
		});
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
		let {total} = this.state;
		let progress = (count*100-((count*100)%total))/total;
		this.setState({
			progress_value: progress,
			count:count,
		});
	}

	render() {
		let { progress_value, count, show ,name} = this.state;
		let {engage, detect, respond} = this.props;
		let description = name.map((item) =>
			<option value={item.id}>{item.description}</option>
		)
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
						<button
							type="button"
							className="ml-auto btn btn-outline-dark m-2"
							onClick={()=>this.setState({show:true})}
						>
							Add task
						</button>
					</div>
				</div>
				<div className="row">
					<table id="mytable" className="table table-bordred table-striped">
						<thead>
						<tr>
							<th key style={{width:"37px"}}></th>
							<th className="d-flex justify-content-start">Task Name</th>
							<th>Action</th>
						</tr>
						</thead>
					</table>
				</div>
				<Engage info={engage} count={count} setCount={this.resetProgressBar}/>
				<Detect_Analyze info={detect} count={count} setCount={this.resetProgressBar}/>
				<Respond info={respond} count={count} setCount={this.resetProgressBar}/>
				<Modal
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					show={show} animation={true}
				>
					<div className="container">
						<h1>Task Lists</h1>
						<label htmlFor="cars">Choose a name: </label>
						<select name="cars" id="cars" defaultValue="1" onChange={this.setID}>
							{description}
						</select>
						{/*<label htmlFor="cars">Choose a phase: </label>*/}
						{/*<select name="cars" id="cars" defaultValue="1" onChange={(e)=>setPhase(e.target.value)}>*/}
						{/*	<option value="1">Engage</option>*/}
						{/*	<option value="2">Detect</option>*/}
						{/*	<option value="3">Responce</option>*/}
						{/*</select>*/}
						<div className="d-flex">
							<div className="ml-auto">
								<button type="button" className="btn btn-primary m-2" onClick={this.addPlaybook}>Save</button>
								<button type="button" className="btn btn-secondary m-2" onClick={this.handleClose}>Cancel</button>
							</div>
						</div>
					</div>
				</Modal>

			</div>
		);
	}
}
