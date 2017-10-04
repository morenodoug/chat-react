import React, { Component } from 'react';
import './App.css'
import RegisterForm from './components/RegisterForm'
import SignInForm from './containers/SignInForm'

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import {BrowserRouter as Router , Route,Switch, Redirect} from 'react-router-dom';
const store = configureStore();


function requireAuth(){
  if( ! localStorage.jwt){
    return false;
  }
  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    requireAuth() ? (
      (<h1>asd</h1>)
    ) : (
      <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    requireAuth() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>

    ) : (
    <Component {...props}/>
    )
  )}/>
)

class App extends Component {


  render() {


    return (
      <div className="container">
        <Provider store={store}>
          <Router>
              <Switch>
                <PrivateRoute exact path="/"   />
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
