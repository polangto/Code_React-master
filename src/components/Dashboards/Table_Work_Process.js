import React, { Component } from "react";
import "../../css/Timeline.css";

import { ProgressBar } from "react-bootstrap";

class workProcess extends Component {
  render() {
    return (
      <div className="mt-5 pt-5">
        <h4 className="my-2">Work Progress</h4>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ width: "5%" }}>
                #
              </th>
              <th scope="col" style={{ width: "40%" }}>
                Project
              </th>
              <th scope="col">Deadline</th>
              <th scope="col">Status</th>
              <th scope="col">Progress</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

export default workProcess;
