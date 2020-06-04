import React, {useEffect, useState} from "react";
import Tabs from "../Tabs";
import "../../css/button.css"

export const Assets = (props) => {
    let [strSearch,setStrSearch] = useState('');
    let [sortType,setSortType] = useState('');
    useEffect(() => {
        console.log("asdsad")
    },[])

    let getValueSort = (event) => {
        setSortType(event.target.outerText);
    }
    let getStrSearch = (event) => {
        if(event.target.value !== "")
            console.log(event.target.value)
    }
    return (
        <div>
            <Tabs/>
            <div className="row m-2 justify-content-between">
                <h2 className="col-6">Assets Table</h2>
                    <input className="form-control col-3" placeholder="Search" onKeyDown={getStrSearch}/>
            </div>
            <div className="container">
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
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>
                            <i style={{cursor: "pointer"}} className="fas fa-edit"></i>
                            <i style={{cursor: "pointer"}} className="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>
                            <i style={{cursor: "pointer"}} className="fas fa-edit"></i>
                            <i style={{cursor: "pointer"}} className="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>
                            <i style={{cursor: "pointer"}} className="fas fa-edit"></i>
                            <i style={{cursor: "pointer"}} className="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
       )
}