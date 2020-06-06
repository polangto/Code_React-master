import React, {useEffect, useState} from "react";
import Tabs from "../Tabs";
import "../../css/button.css"
import {Modal} from "react-bootstrap";



export const Assets = (props) => {
    let [strSearch,setStrSearch] = useState('');
    let [sortType,setSortType] = useState('');
    let [show,setShow] = useState(false);
    let [asset,setAsset] = useState("");
    let [ip,setIp] = useState("");
    let [idQuery,setIDQuery] = useState();
    let [task, setTask] = useState("")
    let [data, setData] = useState([]);
    let getValueSort = (event) => {
        setSortType(event.target.outerText);
    }
    let getStrSearch = (event) => {
        if(event.target.value !== "")
            console.log(event.target.value)
    }
    const handleClose = () => setShow(false);
    let editAssets = (item) =>{
        setShow(true);
        setTask("edit");
        setAsset(item.asset_name);
        setIp(item.ip);
        setIDQuery(item.id);
    };
    let addNewAsset = () =>{
        setShow(true);
        setTask("add");
    }
    let delAsset= (id)=>{
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

        fetch(url, requestOptions)
            .then((res) => {
                if(res.status === 200){
                    alert("Add Successful!!!!!!!!!!");
                }
            });
    }
    let updateAsset = () =>{
        handleClose();
        let url = 'http://10.102.10.244:8080/api/assets?id=' + idQuery;
        // let { token } = this.state;
        // let cookie = "user_id=" + token;

        let requestOptions = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"asset_name":asset,"ip":ip})
        };

        fetch(url, requestOptions)
            .then((res) => {
                if(res.status === 200){
                    alert("Update Succcessful!")
                }
            });
    }
    let submitAsset = () => {
        handleClose();
        let url = 'http://10.102.10.244:8080/api/assets';
        // let { token } = this.state;
        // let cookie = "user_id=" + token;

        let requestOptions = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"asset_name":asset,"ip":ip})
        };

        fetch(url, requestOptions)
            .then((res) => {
                if(res.status === 200){
                    alert("Add Successful!!!!!!!!!!");
                }
            });
    }
    let list = data.length === 0 ?"":data.map((item)=>{
        console.log(item)
        return <tr key={item.ip}>
            <th>{item.asset_name}</th>
            <td>{item.ip}</td>
            <td>
                <i type="button" style={{cursor: "pointer"}} className="fas fa-edit" onClick={() => editAssets(item)}/>
                <i type="button" className="fas fa-trash-alt" onClick={()=> delAsset(item.id)}/>
            </td>
        </tr>
    })

    useEffect(()=>{
        let url = 'http://10.102.10.244:8080/api/assets';
        // let { token } = this.state;
        // let cookie = "user_id=" + token;

        let requestOptions = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        fetch(url, requestOptions)
            .then((res) => res.json())
            .then(
                (result) => {
                    if(typeof result.status === "undefined"){
                        let row = JSON.parse(result);
                        setData(row);
                    }
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
    },[])
    return (
        <div>
            <Tabs/>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} animation={true}
            >
                <div className="container my-3">
                    <h1>Edit Assets</h1>
                        <label htmlFor="assets-name">Assets</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                            <input type="text" className="form-control" id="assets-name"
                                   defaultValue={asset} onChange={event => setAsset(event.target.value)}/>:
                            <input type="text" className="form-control" id="assets-name"
                                   placeholder="Ex: user1" onChange={event => setAsset(event.target.value)}/>
                            }
                        </div>
                        <label htmlFor="ip">IP Address</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                                <input type="text" className="form-control" id="assets-name"
                                       defaultValue={ip} onChange={event => setIp(event.target.value)}/>:
                                <input type="text" className="form-control" id="assets-name"
                                       placeholder="Ex: 192.168.1.1" onChange={event => setIp(event.target.value)}/>
                            }
                        </div>
                    <div className="d-flex">
                        <div className="ml-auto">
                            <button type="button" className="btn btn-primary m-2" onClick={task==="edit"?updateAsset:submitAsset}>{task === "edit"?"Save":"Add"}</button>
                            <button type="button" className="btn btn-secondary m-2" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="container">
                <div className="row my-2 justify-content-between">
                    <h4 className="col-6">Assets Table</h4>
                    <input className="form-control col-3 mr-2" placeholder="Search" onKeyDown={getStrSearch}/>
                    <button type="button" className="btn btn-primary col-2 mr-3" onClick={addNewAsset}>Add Assets</button>
                </div>
                <table className="table mt-2 table-bordered">
                    <thead>
                    <tr>
                        <th scope="col" onClick={getValueSort} style={{cursor: "pointer"}}>
                            Assets
                        </th>
                        <th scope="col" onClick={getValueSort} style={{cursor: "pointer"}}>
                            IP Address
                        </th>
                        <th scope="col">Edit
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        </div>
       )
}
