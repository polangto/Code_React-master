import React, { Component } from "react";
import "../../css/Timeline.css";
import Item from "./Item_Timeline";

class Timeline extends Component {
  render() {
    return (
      <div>
        <h4>Latest News</h4>
        <ul className="timeline">
          <Item links="#" titles="Hello new titles">
            This is my descrition
          </Item>
          <Item titles="21 000 Job Seekers">
            Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis.
            Nam pellentesque felis vitae justo accumsan, sed semper nisi
            sollicitudin...
          </Item>
        </ul>
      </div>
    );
  }
}

export default Timeline;
