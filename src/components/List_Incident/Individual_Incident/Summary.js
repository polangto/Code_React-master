import React, { Component } from "react";

export default class Detail_Incident extends Component {
  render() {
    let {info} = this.props;
    return (
      <div className="container-fluid">
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
            <h6>{info.dest_ip}</h6>
            <h6>{info.dest_port}</h6>
          </div>
        </div>
      </div>
    );
  }
}
