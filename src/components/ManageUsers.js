import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

export const ManageUsers = (props) => {
	let [strSearch, setStrSearch] = useState('');
	let [sortType, setSortType] = useState('');
	let [show, setShow] = useState(false);
	let [user, setUser] = useState('');
	let [role, setRole] = useState('');
	let [idQuery, setIDQuery] = useState();
	let [task, setTask] = useState('');
	let [data, setData] = useState([]);
	let [add, setAdd] = useState(false);
	let [del, setDel] = useState(false);
	let [update, setUpdate] = useState(false);
	let getValueSort = (event) => {
		setSortType(event.target.outerText);
	};
	let getStrSearch = (event) => {
		if (event.target.value !== '') console.log(event.target.value);
		let listAssets = data.filter(
			(item) =>
				item.asset_name.toLowerCase().indexOf(strSearch.toLowerCase()) > -1
		);
		console.log(listAssets);
	};
	const handleClose = () => setShow(false);
	let editUser = (item) => {
		setShow(true);
		setTask('edit');
		setUser(item.asset_name);
		setRole(item.role);
		setIDQuery(item.id);
	};
	let addNewUser = () => {
		setShow(true);
		setTask('add');
	};
	let delUser = (id) => {
		let url = 'http://10.102.10.244:8080/api/assets?id=' + id;
		// let { token } = this.state;
		// let cookie = "user_id=" + token;

		let requestOptions = {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		fetch(url, requestOptions).then((res) => {
			if (res.status === 200) {
				alert('Delete Item Successful!!!!!!!!!!');
			}
		});
		setDel(true);
		setStrSearch('');
	};
	let updateUser = () => {
		handleClose();
		let url = 'http://10.102.10.244:8080/api/assets?id=' + idQuery;
		// let { token } = this.state;
		// let cookie = "user_id=" + token;

		let requestOptions = {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			// credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({ asset_name: user, role: role }),
		};

		fetch(url, requestOptions).then((res) => {
			if (res.status === 200) {
				alert('Update Succcessful!');
			}
		});
		setUpdate(true);
		setStrSearch('');
	};
	let addUser = () => {
		handleClose();
		let url = 'https://5ef05c96ad6d71001617a174.mockapi.io/api/user';
		// let { token } = this.state;
		// let cookie = "user_id=" + token;
		let role_raw = role === 'admin' ? true : false;
		let data_raw = JSON.stringify({ name: user, role: role_raw });
		let requestOptions = {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data_raw,
		};

		fetch(url, requestOptions).then((res) => {
			if (res.status === 201) {
				alert('Add Successful!!!!!!!!!!');
			}
		});
		setAdd(true);
		setStrSearch('');
	};
	console.log('Reload Page');
	let list =
		data.length === 0
			? ''
			: data.map((item) => {
					// console.log(item)
					return (
						<tr key={item.id}>
							<th>{item.name}</th>
							<td>{item.role ? 'admin' : 'user'}</td>
							<td>
								<i
									type="button"
									style={{ cursor: 'pointer' }}
									className="fas fa-edit"
									onClick={() => editUser(item)}
								/>
								<i
									type="button"
									className="fas fa-trash-alt"
									onClick={() => delUser(item.id)}
								/>
							</td>
						</tr>
					);
			  });

	useEffect(() => {
		let url = 'https://5ef05c96ad6d71001617a174.mockapi.io/api/user';
		// let { token } = this.state;
		// let cookie = "user_id=" + token;

		let requestOptions = {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			// credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		fetch(url, requestOptions)
			.then((res) => res.json())
			.then(
				(result) => {
					// let row = JSON.parse(result);
					setData(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					// this.setState({
					// 	isLoaded: true,
					// 	error,
					// });
				}
			);
		setAdd(false);
		setDel(false);
		setUpdate(false);
	}, [add, del, update]);
	return (
		<div>
			<Modal
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={show}
				animation={true}
			>
				<div className="container my-3">
					<h1>{task === 'edit' ? 'Edit User' : 'Add User'}</h1>
					<label htmlFor="assets-name">User</label>
					<div className="input-group mb-3">
						{task === 'edit' ? (
							<input
								type="text"
								className="form-control"
								defaultValue={user}
								onChange={(event) => setUser(event.target.value)}
							/>
						) : (
							<input
								type="text"
								className="form-control"
								placeholder="Ex: user1"
								onChange={(event) => setUser(event.target.value)}
							/>
						)}
					</div>
					<label htmlFor="ip">Role</label>
					<div className="input-group mb-3">
						{task === 'edit' ? (
							<select
								id="user"
								onChange={(event) => setRole(event.target.value)}
							>
								<option value="user" selected>
									User
								</option>
								<option value="admin">Admin</option>
							</select>
						) : (
							<select
								id="user"
								onChange={(event) => setRole(event.target.value)}
							>
								<option value="user">User</option>
								<option value="admin">Admin</option>
							</select>
						)}
					</div>
					<div className="d-flex">
						<div className="ml-auto">
							<button
								type="button"
								className="btn btn-primary m-2"
								onClick={task === 'edit' ? updateUser : addUser}
							>
								{task === 'edit' ? 'Save' : 'Add'}
							</button>
							<button
								type="button"
								className="btn btn-secondary m-2"
								onClick={handleClose}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</Modal>

			<div className="container">
				<div className="row my-2 justify-content-between">
					<h4 className="col-6" style={{ textAlign: 'left' }}>
						Users Table
					</h4>
					<input
						className="form-control col-3 mr-2"
						placeholder="Search"
						onChange={getStrSearch}
					/>
					<button
						type="button"
						className="btn btn-primary col-2 mr-3"
						onClick={addNewUser}
					>
						Add User
					</button>
				</div>
				<table className="table mt-2 table-bordered">
					<thead>
						<tr>
							<th
								scope="col"
								onClick={getValueSort}
								style={{ cursor: 'pointer' }}
							>
								User
							</th>
							<th
								scope="col"
								onClick={getValueSort}
								style={{ cursor: 'pointer' }}
							>
								Roles
							</th>
							<th scope="col">Edit</th>
						</tr>
					</thead>
					<tbody>{list}</tbody>
				</table>
			</div>
		</div>
	);
};
