import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class itemTimeline extends Component {
  render() {
    return (
      <li>
        <Link to={this.props.links ? this.props.links : "#"}>
          {this.props.titles}
        </Link>
        <p>{this.props.children}</p>
      </li>
    );
  }
}
