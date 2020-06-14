import React, {useEffect, useState} from "react";
import Tabs from "../Tabs";
import "../../css/button.css"
import {Modal} from "react-bootstrap";



export const Tasklists = (props) => {
    let [strSearch,setStrSearch] = useState('');
    let [sortType,setSortType] = useState('');
    let [show,setShow] = useState(false);
    let [description,setDescription] = useState("");
    let [detail,setDetail] = useState("");
    let [phase,setPhase] = useState("1");
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
        setDescription(item.description);
        setDetail(item.detail);
        setIDQuery(item.id);
    };
    let addNewAsset = () =>{
        setShow(true);
        setTask("add");
    }
    let delTasks= (id)=>{
        let url = 'http://10.102.10.244:8080/api/tasks?id=' + id;
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
    let updateTasks = () =>{
        handleClose();
        let url = 'http://10.102.10.244:8080/api/tasks?id=' + idQuery;
        // let { token } = this.state;
        // let cookie = "user_id=" + token;

        let requestOptions = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"description":description,"detail":detail, "phase":phase})
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
    let addTasks = () => {
        handleClose();
        console.log(description, detail, phase);
        let url = 'http://10.102.10.244:8080/api/tasks';
        // let { token } = this.state;
        // let cookie = "user_id=" + token;

        let requestOptions = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"description":description,"detail":detail, "phase":phase})
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
    console.log(detail)
    let list = data.length === 0 ?"":data.map((item)=>{
        // console.log(item)
        return <tr key={item.ip}>
            <th>{item.description}</th>
            <td><p style={{whiteSpace: 'pre-line'}}>{item.detail}</p></td>
            <th>{item.phase === "1" ? "Engage": item.phase === "2" ? "Detect":"Responce"}</th>
            <td>
                <i type="button" style={{cursor: "pointer"}} className="fas fa-edit" onClick={() => editAssets(item)}/>
                <i type="button" className="fas fa-trash-alt" onClick={()=> delTasks(item.id)}/>
            </td>
        </tr>
    })

    useEffect(()=>{
        let url = 'http://10.102.10.244:8080/api/tasks';
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
                    <h1>Task Lists</h1>
                        <label htmlFor="assets-name">Name</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                            <input type="text" className="form-control"
                                   defaultValue={description} onChange={event => setDescription(event.target.value)}/>:
                            <input type="text" className="form-control"
                                   placeholder="Ex: name of task" onChange={event => setDescription(event.target.value)}/>
                            }
                        </div>
                        <label htmlFor="ip">Description</label>
                        <div className="input-group mb-3">
                            {task === "edit" ?
                                <textarea rows={10} cols={50} type="text" className="form-control"
                                       defaultValue={detail} onChange={event => setDetail(event.target.value)}/>:
                                <textarea rows={10} cols={50} type="text" className="form-control"
                                       placeholder="Ex: description task" onChange={event => setDetail(event.target.value)}/>
                            }
                        </div>
                        <label htmlFor="cars">Choose a phase: </label>
                        <select name="cars" id="cars" defaultValue="1" onChange={(e)=>setPhase(e.target.value)}>
                            <option value="1">Engage</option>
                            <option value="2">Detect</option>
                            <option value="3">Responce</option>
                        </select>
                    <div className="d-flex">
                        <div className="ml-auto">
                            <button type="button" className="btn btn-primary m-2" onClick={task==="edit"?updateTasks:addTasks}>{task === "edit"?"Save":"Add"}</button>
                            <button type="button" className="btn btn-secondary m-2" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="container">
                <div className="row my-2 justify-content-between">
                    <h4 className="col-6">Task Lists</h4>
                    <input className="form-control col-3 mr-2" placeholder="Search" onChange={getStrSearch}/>
                    <button type="button" className="btn btn-primary col-2 mr-3" onClick={addNewAsset}>Add Task</button>
                </div>
                <table className="table mt-2 table-bordered">
                    <thead>
                    <tr>
                        <th scope="col" onClick={getValueSort} style={{cursor: "pointer"}}>
                            Name
                        </th>
                        <th scope="col" onClick={getValueSort} style={{cursor: "pointer"}}>
                            Description
                        </th>
                        <th scope="col">
                            Phase
                        </th>
                        <th scope="col">
                            Edit
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
