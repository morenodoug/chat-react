import React, { Component } from 'react';
import './App.css'
import RegisterForm from './containers/RegisterForm'
import SignInForm from './containers/SignInForm'

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import {BrowserRouter as Router ,Switch} from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

import TotalChat from './containers/TotalChat';

const store = configureStore();

class App extends Component {


  render() {

    return (
      <div className="container-fluid">
        <Provider store={store}>
          <Router>
              <Switch>
                <PrivateRoute exact path="/" component ={TotalChat}  />
                <PublicRoute exact path="/sign-up" component ={RegisterForm}/>
                <PublicRoute exact path="/sign-in" component={SignInForm}/> 
              </Switch>
          </Router>
        </Provider>
      </div>  
    );
  }
}


export default App;
