import React,{useState,useEffect} from "react";

export const Modal =(props) => {
    let [asset,setAsset] = useState("");
    let [ip,setIp] = useState("");
    return <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} animation={true}
    >
        <div className="container my-3">
            <h1>Edit Assets</h1>
            <label htmlFor="assets-name">Assets</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" id="assets-name"
                       value={asset} onChange={}/>
            </div>
            <label htmlFor="ip">IP Address</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" id="ip"
                       value={ip} onChange={}/>
            </div>
            <div className="d-flex">
                <div className="ml-auto">
                    <button type="button" className="btn btn-primary m-2" onClick={(event)=>console.log(event)}>Save</button>
                    <button type="button" className="btn btn-secondary m-2" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </Modal>
}