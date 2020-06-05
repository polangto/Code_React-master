import React, { useState, useEffect } from 'react';
import '../../../style.css';
export const Detect_Analyze = (props) => {
	// Khai báo 1 biến số đếm, gọi là "count"
	const [colapse, setColapse] = useState(false);
	let [valueUpdate, setValueUpdate] = useState();
	let [counter, setCouter] = useState();
	let { info,count } = props;
	let checkNull = true;
	let list = "";
	if (typeof info !== 'undefined'){
		checkNull = false;
		list = info.map((item) =>   <tr>
			<td key={item.id}><input type="checkbox" class="checkthis" onClick={(event)=>{
				if(event.target.checked)
					props.setCount(++count);
				else
					props.setCount(--count);
			}}/></td>
			<td>{item.name}</td>
			<td><p style={{whiteSpace: 'pre-line'}}>{item.detail}</p></td>
		</tr>);
	}
	const changeProgres = (item) => {
		// Default options are marked with *
		console.log(item)
		// const response = await fetch("http://10.102.10.244:8080/api/playbook/", {
		// 	method: 'PUT', // *GET, POST, PUT, DELETE, etc.
		// 	mode: 'cors', // no-cors, *cors, same-origin
		// 	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// 	credentials: 'same-origin', // include, *same-origin, omit
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 		// 'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// 	redirect: 'follow', // manual, *follow, error
		// 	referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// 	body: JSON.stringify(data) // body data type must match "Content-Type" header
		// });
		// return response.json(); // parses JSON response into native JavaScript objects
	}

	useEffect(() => {
		console.log("asdsad")
	},[])

	return (
		<div className="row">
			<h4 className="my-2 mx-2">Detect/Analyze</h4>
			<p className="detect_analyze"></p>

			{colapse ? (
				<button
					onClick={() => setColapse(!colapse)}
					type="button"
					className="m-2 btn btn-outline-dark btn-sm"
				>
					<i className="fas fa-plus"></i>
				</button>
			) : (
				<button
					onClick={() => setColapse(!colapse)}
					type="button"
					className="m-2 btn btn-outline-dark btn-sm"
				>
					<i className="fas fa-minus"></i>
				</button>
			)}
			{!colapse && !checkNull ?
				<table id="mytable" class="table table-bordred table-striped">
					<tbody>
					{list}
					</tbody>
				</table>:''}
		</div>
	);
}

