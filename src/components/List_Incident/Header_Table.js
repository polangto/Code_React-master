import React, { Component } from "react";

export default class TableControl extends Component {
	constructor() {
		super();
		this.state = {
			sortValue: "",
			sortType: true,
		};

		this.SearchString = this.SearchString.bind(this);
		this.getSortValue = this.getSortValue.bind(this);
	}

	SearchString(event) {
		this.props.strSearch(event.target.value);
	}

	getSortValue(event) {
		this.setState({
			sortValue: event.target.value,
		});
	}

	//Arrow function thay đổi state của TableList, Khi sử dụng arrow function thì không cần phải khai báo bind() trên contructer
	submitValue = () => {
		var sortType = this.state.sortType;
		this.props.sortField(this.state.sortValue, sortType);
		this.setState({
			sortType: !sortType,
		});
	};

	render() {
		return (
			<div className='row'>
				<div className='col-6'>
					<h4 className='ml-2 my-2'>Work Progress</h4>
				</div>
				<div className='col-6'>
					<div className='row'>
						<div className='col-6'>
							<div className='input-group'>
								<select
									defaultValue={this.state.sortValue}
									className='custom-select'
									onChange={this.getSortValue}>
									<option value=''>Choose...</option>
									<option value='id'>ID</option>
									<option value='name'>Name</option>
									<option value='logtime'>Log Time</option>
									<option value='detect_time'>Detect Time</option>
									<option value='severity'>Severity</option>
								</select>
								<div className='input-group-append'>
									<button
										className='btn btn-outline-secondary'
										type='button'
										onClick={this.submitValue}>
										Sort
									</button>
								</div>
							</div>
						</div>
						<input
							type='text'
							className='col-4 ml-auto mr-4 mb-2 form-control'
							placeholder='Search'
							onKeyUp={this.SearchString}
						/>
					</div>
				</div>
			</div>
		);
	}
}
