import React, {useEffect, useState} from 'react';
import '../../../style.css';
export const Engage = (props)=> {
	const [colapse, setColapse] = useState(false);
	let [status, setStatus] = useState(true);
	let [data, setData] = useState();
	let { info,count } = props;
	let [counter, setCouter] = useState(count);
	let checkNull = true;
	let list = "";
	// let [inc_id, setInc_id] = useState();
	// let [task_id, setTask_id] = useState();
	let delPlaybook=(inc_id,task_id) => {
		let url = 'http://10.102.10.244:8080/api/playbook';
		let requestOptions = {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({"inc_id":parseInt(inc_id,10), "task_id":parseInt(task_id,10)})
		};

		fetch(url, requestOptions)
			.then(res => {
				if(res.status === 200){
					window.location.reload();
				}
			});
	}
	if (typeof info !== 'undefined'){
		checkNull = false;
		list = info.map((item, index) =>   <tr key={index}>
			{item.tag_status === "1" && status
				?
				<td key={item.id}><input type="checkbox" className="checkthis" checked onClick={(event) => changeProgress(event,item)}/></td>
				:
				<td key={item.id}><input type="checkbox" className="checkthis" onClick={(event) => changeProgress(event, item)}/></td>
			}
			<td>{item.description}</td>
			<td><p style={{whiteSpace: 'pre-line'}}>{item.detail}</p></td>
			<td>
				<i type="button" className="fas fa-trash-alt" onClick={() => {delPlaybook(item.inc_id,item.task_id)}}/>
			</td>
		</tr>);
	}
	let changeProgress=(event,item)=>{
		let data = {
			inc_id : item.inc_id,
			task_id: item.task_id,
			tag_status: "0"
		}
		setData(data);
		if(event.target.checked){
			data.tag_status = "1";
			counter = ++count;
			setCouter(counter)
			setStatus(true)
		}
		else{
			data.tag_status="0";
			counter = --count;
			setCouter(counter)
			setStatus(false)
		}
	}
	useEffect(() => {
		props.setCount(counter);
		let url = 'http://10.102.10.244:8080/api/playbook';
		// let { token } = this.state;
		// let cookie = "user_id=" + token;

		let requestOptions = {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data)
		};

		fetch(url, requestOptions)
			.then((res) => res.json())
			.then(
				(result) => {
					console.log("Success")
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
	},[counter])

	return (
		<div className="container-fruld">
			<div className="row">
				<h4 className="my-2 mx-2">Engage</h4>
				<p className="engage"></p>
				{colapse ? (
					<button
						onClick={() => setColapse(!colapse)}
						type="button"
						className="m-2 btn btn-outline-dark btn-sm"
						data-toggle="collapse"
						data-target="#demo"
					>
						<i className="fas fa-plus"></i>
					</button>
				) : (
					<button
						onClick={() => setColapse(!colapse)}
						type="button"
						className="m-2 btn btn-outline-dark btn-sm"
						data-toggle="collapse"
						data-target="#demo"
					>
						<i className="fas fa-minus"></i>
					</button>
				)}
				{!colapse && !checkNull ?
					<table id="mytable" className="table table-bordred table-striped">
						<tbody>
						{list}
						</tbody>
					</table>:''}

			</div>
		</div>
	);
}

export default Engage;
