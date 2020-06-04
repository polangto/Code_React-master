import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Timeline from "./Timeline";
import Tab from "../Tabs";
import { Redirect } from "react-router-dom";
class Dashboards extends Component {
    setRedirect = (redirect) => {
        console.log(redirect);
        if(redirect){
            return <Redirect to='/login' />
        }
    }
  render() {
    return (
        <div>
            <Tab islogin = {this.props.islogin} redirect={this.setRedirect}/>
            <Container>
                <h3 className="my-5 pt-5">Activity Dashboard</h3>
                <Row>
                    <Timeline />
                </Row>
            </Container>
        </div>
    );
  }
}

export default Dashboards;
