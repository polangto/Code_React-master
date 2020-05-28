import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {fakeAuth} from "./Authen";

function PrivateRoute({component:Component,...rest }) {
	return <Route {...rest} render={(props) => (fakeAuth.isAuthenticated ? <Component islogin={fakeAuth.isAuthenticated}/> : <Redirect to={{ pathname: '/login' }} />)} />;
}
export default PrivateRoute;