import React, { useState } from 'react';
import '../../../style.css';
function Detect_Analyze(props) {
	// Khai báo 1 biến số đếm, gọi là "count"
	const [colapse, setColapse] = useState(false);
	let { info } = props;
	let checkNull = true;
	let list = "";
	if (typeof info !== 'undefined'){
		checkNull = false;
		list = info.map((item) =>   <tr>
			<td><input type="checkbox" class="checkthis" /></td>
			<td>{item.name}</td>
			<td><p>{item.detail}</p></td>
		</tr>);
	}
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

export default Detect_Analyze;
