import React, { Component } from 'react';
import { Router, Route, Redirect, IndexRoute, Link, hashHistory } from 'react-router';
import Store from "../store/index.js";
import { Provider } from "react-redux";
import './app.scss';
import './profile.scss';
import Content from './Content.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Layout from './Layout.js';
import Logout from './Logout.js';
import About from './About.js';
import Contact from './Contact.js';
import Admin from './Admin.js';
import Profile from './Profile.js';
import ProfileDetail from'./ProfileDetail'
import Access from './Access'
import AuthAccess from './AuthAccess'

class App extends Component {

  render() {

    return (
      <Provider store={Store}>
        <Router history={hashHistory}>  
              <Route component={Layout}>
                <Route path="/" component={Content}/>
                <Route path="/login" component={Login} />
                <Route path="/login" component={Logout} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/admin" component={(props) => <AuthAccess roles={[1]} Comp={Admin} />} />
                <Route path="/profile" component={(props) => <AuthAccess roles={[1,0]} Comp={Profile} />} />
                <Route path="/signup" component={SignUp} />
                <Route path="/logout"  component={Logout} />
              </Route>
          </Router>
        </Provider>
    );
  }
}

export default(App)
