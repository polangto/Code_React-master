import React, { useState } from 'react';
import '../../../style.css';
function Respond(props) {
	// Khai báo 1 biến số đếm, gọi là "count"
	const [colapse, setColapse] = useState(false);
	// let [t]
	let { info } = props;
	let checkNull = true;
	let list = "";
	if (typeof info !== 'undefined'){
		checkNull = false;
		list = info.map((item) =>   <tr>
			<td key={item.id}><input type="checkbox" class="checkthis"/></td>
			<td>{item.name}</td>
			<td><p style={{whiteSpace: 'pre-line'}}>{item.detail}</p></td>
		</tr>);
	}
	return (
		<div className="row">
			<h4 className="my-2 mx-2">Respond</h4>
			<p className="respond"></p>

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

export default Respond;
