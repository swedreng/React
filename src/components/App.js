import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { Provider } from "react-redux";
import Store from "../store/index.js";
import './app.scss';
import Content from './Content.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Layout from './Layout.js';
import Logout from './Logout.js';
import About from './About.js';
import Contact from './Contact.js';


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
                <Route path="/signup" component={SignUp} />
                <Route path="/logout" component={Logout} />
              </Route>
          </Router>
        </Provider>
    );
  }
}

export default App;
