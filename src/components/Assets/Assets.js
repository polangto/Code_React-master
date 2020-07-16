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
    let [user,setUser] = useState("");
    let [sdt,setSdt] = useState("");
    let [idQuery,setIDQuery] = useState();
    let [task, setTask] = useState("")
    let [data, setData] = useState([]);
    let [add, setAdd] = useState(false);
    let [del, setDel] = useState(false);
    let [update, setUpdate] = useState(false);
    let getValueSort = (event) => {
        setSortType(event.target.outerText);
    }
    let getStrSearch = (event) => {
        if(event.target.value !== "")
            console.log(event.target.value)
        let listAssets = data.filter(item =>
            // item.ip.toLowerCase().indexOf(strSearch.toLowerCase()) > -1
            // ||
            item.asset_name.toLowerCase().indexOf(strSearch.toLowerCase()) > -1)
        console.log(listAssets)
    }
    const handleClose = () => setShow(false);
    let editAssets = (item) =>{
        setShow(true);
        setTask("edit");
        setAsset(item.asset_name);
        setIp(item.ip);
        setUser(item.user);
        setSdt(item.sdt);
        setIDQuery(item.id);
    };
    let addNewAsset = () =>{
        setAsset("");
        setIp("");
        setUser("");
        setSdt("");
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
                    alert("Delete Item Successful!!!!!!!!!!");
                }
            });
        setDel(true);
        setStrSearch("");
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
            body: JSON.stringify({"asset_name":asset,"ip":ip,"user":user,"sdt":sdt})
        };

        fetch(url, requestOptions)
            .then((res) => {
                if(res.status === 200){
                    alert("Update Succcessful!")
                }
            });
        setUpdate(true);
        setStrSearch("");
    }
    let addAsset = () => {
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
            body: JSON.stringify({"asset_name":asset,"ip":ip,"user":user,"sdt":sdt})
        };

        fetch(url, requestOptions)
            .then((res) => {
                if(res.status === 200){
                    alert("Add Successful!!!!!!!!!!");
                }
            });
        setAdd(true);
        setStrSearch("");
    }
    console.log("Reload Page")
    let list = data.length === 0 ?"":data.map((item)=>{
        // console.log(item)
        return <tr key={item.ip}>
            <th>{item.asset_name}</th>
            <td>{item.ip}</td>
            <td>{item.user}</td>
            <td>{item.sdt}</td>
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
        setAdd(false);
        setDel(false);
        setUpdate(false);

    },[add,del,update])
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
                            <input type="text" className="form-control"
                                   defaultValue={asset} onChange={event => setAsset(event.target.value)}/>:
                            <input type="text" className="form-control"
                                   placeholder="Ex: PC-1" onChange={event => setAsset(event.target.value)}/>
                            }
                        </div>
                        <label htmlFor="ip">IP Address</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                                <input type="text" className="form-control"
                                       defaultValue={ip} onChange={event => setIp(event.target.value)}/>:
                                <input type="text" className="form-control"
                                       placeholder="Ex: 192.168.1.1" onChange={event => setIp(event.target.value)}/>
                            }
                        </div>
                        <label htmlFor="assets-name">Info User</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                                <input type="text" className="form-control"
                                       defaultValue={user} onChange={event => setUser(event.target.value)}/>:
                                <input type="text" className="form-control"
                                       placeholder="Ex: Nguyen Van A" onChange={event => setUser(event.target.value)}/>
                            }
                        </div>
                        <label htmlFor="assets-name">Phone</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                                <input type="text" className="form-control"
                                       defaultValue={sdt} onChange={event => setSdt(event.target.value)}/>:
                                <input type="text" className="form-control"
                                       placeholder="Ex: 0909090909" onChange={event => setSdt(event.target.value)}/>
                            }
                        </div>
                    <div className="d-flex">
                        <div className="ml-auto">
                            <button type="button" className="btn btn-primary m-2" onClick={task==="edit"?updateAsset:addAsset}>{task === "edit"?"Save":"Add"}</button>
                            <button type="button" className="btn btn-secondary m-2" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="container">
                <div className="row my-2 justify-content-between">
                    <h4 className="col-6">Assets Table</h4>
                    <input className="form-control col-3 mr-2" placeholder="Search" onChange={getStrSearch}/>
                    <button type="button" className="btn btn-primary col-2 mr-3" onClick={addNewAsset}>Add Asset</button>
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
                        <th scope="col" onClick={getValueSort} style={{cursor: "pointer"}}>
                            Info user
                        </th>
                        <th scope="col" onClick={getValueSort} style={{cursor: "pointer"}}>
                            Phone number
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
