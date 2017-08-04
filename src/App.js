import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {FaUser} from 'react-icons/lib/fa';

import EmailInput from '../src/components/EmailInput'


class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="row">  
          <div className="col-md-4 col-md-offset-4">
            <div className="form-top" >
              <div className="left">
                <h4>Registro   </h4>
              </div>
              <div className="right">
                <FaUser size={30} className="icon"/>
              </div>
            
            </div>
            <div className="form-bottom ">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="" >Email</label>
                    <EmailInput classes="form-control" errorClass="input-error"/>
                  </div>
                </div>
              </div>
              
            </div>
          
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
