import React from "react";
import { Route, 
  Switch,
  BrowserRouter,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import signUp from "./components/signUp";
import ForgotPassword from "./components/ForgotPassword"
import userManage from "./components/userManage"
// import MaterialTableDemo from "./components/table"
import Delivery from "./components/Sidebar/Menu"
import addProduct from "./components/addProduct"
import Products from "./components/products"
import Cart from "./components/Cart"
import Navbar from './components/Navbar'







function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={signUp} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/userManage" component={userManage} />
        {/* <Route path="/table" component={MaterialTableDemo} /> */}
        <Route path="/Delivery" component={Delivery} />
        <Route path="/addProduct" component={addProduct} />
        <Route path="/Products" component={Products} />
        <Route path="/Cart" component={Cart} />

      </Switch>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);