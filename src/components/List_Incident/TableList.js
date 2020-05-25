import React, { Component } from 'react';
import '../../css/Timeline.css';
import TableControl from './Header_Table';
import { Link } from 'react-router-dom';
import '../../css/Fix_Table.css';
import Footer from './Footer';

class ListIncident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [...props.bodys],
			strSearch: '',
			sortValue: '',
			sortType: 'asc',
			pageSize: 5,
			pageIndex: 1,
		};
		this.getStringSearch = this.getStringSearch.bind(this);
		this.setPageSize = this.setPageSize.bind(this);
	}

	// hàm cho sắp xếp động truyền vào tên object và sort tăng giảm
	compareValues(key, order = 'asc') {
		return function (a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				// không tồn tại tính chất trên cả hai object
				return 0;
			}
			if (key === 'severity') {
				let lengthA = a[key].length;
				let lengthB = b[key].length;
				let compare =
					lengthA - lengthB === -2
						? 1
						: lengthA - lengthB === 2
						? -1
						: lengthA - lengthB;
				return order === 'desc' ? compare * -1 : compare;
			} else if (key === 'date') {
				//format date from mm/dd/yyyy to dd/mm/yyyy
				var dateA = a['date'].split('/').reverse().join('/');
				var dateB = b['date'].split('/').reverse().join('/');

				return order === 'desc'
					? new Date(dateB) - new Date(dateA)
					: new Date(dateA) - new Date(dateB);
			} else {
				const varA =
					typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
				const varB =
					typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
				let comparison = 0;
				if (varA > varB) {
					comparison = 1;
				} else if (varA < varB) {
					comparison = -1;
				}
				return order === 'desc' ? comparison * -1 : comparison;
			}
		};
	}

	getStringSearch(str) {
		this.setState({
			strSearch: str,
		});
	}

	// Hàm truyền vào để lấy field cần sort thay đổi giá trị của state
	sortField = (value, sortType) => {
		if (sortType) {
			this.setState({ sortType: 'asc' });
		} else this.setState({ sortType: 'desc' });
		this.setState({
			sortValue: value,
		});
	};

	setPageSize(pageSize, pageIndex) {
		this.setState({
			pageSize: pageSize,
		});
	}

	setPageIndex = (pageIndex) => {
		this.setState({ pageIndex: pageIndex });
	};

	render() {
		let {
			pageIndex,
			pageSize,
			items,
			strSearch,
			sortValue,
			sortType,
		} = this.state;
		var filervalue = items.filter(
			(item) =>
				item.name.toLowerCase().indexOf(strSearch.toLowerCase()) > -1
		);
		filervalue.sort(this.compareValues(sortValue, sortType));
		let newitems = filervalue.slice(
			(pageIndex - 1) * pageSize,
			pageIndex * pageSize
		);
		//Gọi hàm search

		const lists = newitems.map((item, index) => (
			<tr key={item.id}>
				<th
					id="ID"
					key={item.id}
					className="pl-2"
					scope="row"
					style={{ maxWidth: '50px' }}
				>
					{item.id}
				</th>
				<td style={{ maxWidth: '150px' }}>
					{/* <Link to={`detail?id=${item.id}`}>{item.name}</Link> */}
					<Link to={`detail/${item.id}`}>{item.name}</Link>
				</td>
				<td className="" style={{ maxWidth: '120px' }}>
					{item.logtime}
				</td>
				<td className="">{item.owner === null ? ' - ' : item.owner}</td>
				<td className="">
					<span
						className={
							item.severity === 'Low'
								? 'badge badge-success'
								: item.severity === 'Medium'
								? 'badge badge-warning'
								: 'badge badge-danger'
						}
					>
						{item.severity}
					</span>
				</td>
				<td className="">{item.hostname}</td>
				<td className="">{item.src_ip}</td>
				<td className="">{item.src_port}</td>
				<td className="">{item.dest_ip}</td>
				<td className="">{item.dest_port}</td>
				<td className="">{item.protocol}</td>
				<td className="" style={{ maxWidth: '120px' }}>
					{item.detect_time}
				</td>
				<td className="">{item.phase === null ? ' - ' : item.phase}</td>
				<td className="">
					{item.status === null ? ' - ' : item.status}
				</td>
			</tr>
		));
		let length = filervalue.length;
		let headerTable = (
			<thead className="thead-dark">
				<tr className="border">
					<th
						key
						scope="col"
						className="sticky-top pl-2"
						style={{ maxWidth: '50px' }}
						id="ID"
					>
						ID
					</th>
					<th
						scope="col"
						className="sticky-top"
						style={{ minWidth: '150px' }}
					>
						Name
					</th>
					<th scope="col" className="sticky-top">
						Log Time
					</th>
					<th scope="col" className="sticky-top">
						Owner
					</th>
					<th scope="col" className="sticky-top">
						Severity
					</th>
					<th scope="col" className="sticky-top">
						Hostname
					</th>
					<th scope="col" className="sticky-top">
						Source IP
					</th>
					<th scope="col" className="sticky-top">
						Src_Port
					</th>
					<th scope="col" className="sticky-top">
						Dest IP
					</th>
					<th scope="col" className="sticky-top">
						Dst_Port
					</th>
					<th scope="col" className="sticky-top">
						Protocol
					</th>
					<th scope="col" className="sticky-top">
						Detect Time
					</th>
					<th scope="col" className="sticky-top">
						Phase
					</th>
					<th scope="col" className="sticky-top">
						Status
					</th>
				</tr>
			</thead>
		);
		// console.log(this.props.bodys);
		return (
			<div className="mt-2">
				<TableControl
					arrObjec={this.props.bodys}
					strSearch={this.getStringSearch}
					sortField={this.sortField} // gọi truyền hàm vào để lấy giá trị miền cần sơrt
				/>
				<div className="container-fruid Fix">
					<table className="table table-hover table-sm ">
						{headerTable}
						<tbody>{lists}</tbody>
					</table>
				</div>
				<Footer
					totalEntries={length}
					pageSize={this.setPageSize}
					pageIndex={this.setPageIndex}
				/>
			</div>
		);
	}
}

export default ListIncident;
