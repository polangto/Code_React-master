import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

export const Summary = (props) => {
    let {info} = props;
    let [show, setShow] = useState(false);
    let [detected, setDetected] = useState([]);
    useEffect(()=>{
      let url = 'https://www.virustotal.com/api/v3/ip_addresses/131.253.18.12';
      let requestOptions = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '0f092348b5219576a71b666d673e5fcc6587a01af6f1f38e77459c6a6be5a34e',
        }
      };

      fetch(url, requestOptions)
          .then((res) => res.json())
          .then(
              (result) => {
                  let listCompanyDetected = []
                  let listCompany = result.data.attributes.last_analysis_results
                  for (let company in listCompany){
                    if(listCompany[company].result !== "clean" && listCompany[company].result !== "unrated"){
                      listCompanyDetected.push(listCompany[company]);
                    }
                  }
                  setDetected(listCompanyDetected)
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error,
                });
              }
          );
    },[])
    return (
      <div className="container-fluid">
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} animation={true}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Infomations</h5>
              <h6 className="card-subtitle mb-2 text-muted">Virus Total Detected</h6>
              {detected.map(index=>{return <p className="card-text">{index.engine_name}:{index.result} </p>})}
              <button className="btn btn-primary float-right" onClick={()=>setShow(false)}>Ok</button>
            </div>
          </div>
        </Modal>
        <h4>
          <b>Summary</b>
        </h4>
        <div className="row">
          <div className="col-4 d-flex flex-column">
            <h6 className="ml-auto">ID</h6>
            <h6 className="ml-auto">Phase</h6>
            <h6 className="ml-auto">Severity</h6>
            <h6 className="ml-auto">Log Time</h6>
            <h6 className="ml-auto">Detect Time</h6>
            <h6 className="ml-auto">Classification</h6>
            <h6 className="ml-auto">Protocal</h6>
            <h6 className="ml-auto">Source IP</h6>
            <h6 className="ml-auto">Source Port</h6>
            <h6 className="ml-auto">Dest IP</h6>
            <h6 className="ml-auto">Dest Port</h6>
          </div>
          <div className="col-8 flex-column">
            <h6>{info.id}</h6>
            <h6>Engage</h6>
            <h6>{info.severity}</h6>
            <h6>{info.logtime}</h6>
            <h6>{info.detect_time}</h6>
            <h6>{info.name.slice(15)}</h6>
            <h6>{info.protocol}</h6>
            <h6>{info.src_ip}</h6>
            <h6>{info.src_port}</h6>
            <h6 className="d-inline">{info.dest_ip}</h6> <i onClick={()=>setShow(true)} type="button" className="d-inline ml-2 fa  fa-info-circle" aria-hidden="true"></i>
            <h6>{info.dest_port}</h6>
          </div>
        </div>
      </div>
    );
}
