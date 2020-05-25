import React, { Component } from "react";

export default class Detail_Incident extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h4>
          <b>Summary</b>
        </h4>
        <div className="row">
          <div className="col-6 d-flex flex-column">
            <h6 className="ml-auto">ID</h6>
            <h6 className="ml-auto">Phase</h6>
            <h6 className="ml-auto">Severity</h6>
            <h6 className="ml-auto">Data Create</h6>
            <h6 className="ml-auto">Incident Type</h6>
          </div>
          <div className="col-6 flex-column">
            <h6>{this.props.id}</h6>
            <h6>Phase</h6>
            <h6>{this.props.severity}</h6>
            <h6>{this.props.data}</h6>
            <h6>DDoS</h6>
          </div>
        </div>
      </div>
    );
  }
}
