import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {FaUser} from 'react-icons/lib/fa';

import EmailInput from '../src/components/EmailInput'
import NameInput from '../src/components/NameInput'


class App extends Component {

  constructor(props){
    super(props); 

    this.setEmailState = this.setEmailState.bind(this);
    this.setNameState = this.setNameState.bind(this);
    this.state =   {
        registerForm:{
          email:{
            error: true,
            value:"" ,
          },
          name:{
            error:true,
            value:""
          },
          password:{
            error:true,
            value: ""
          }

        },
        band:"motorhead"
    }
  }// end constructor

  setEmailState(error, value){
    
    this.setState((prevState, props)=>{
     
      let newEmailState = Object.assign(prevState.registerForm)
      let newState =Object.assign({}, prevState,);
      // newState.registerForm.email.error= error;
      // newState.registerForm.email.value= value;
      // console.log(newState);
      newEmailState.email.error = error;
      newEmailState.email.value = value;
      return {
        registerForm:newEmailState
      };

    });
  
  }

  setNameState(error, value){

    this.setState((prevState, props)=>{

      let registerFormState = Object.assign({},prevState.registerForm);
      registerFormState.name.error = error;
      registerFormState.name.value = value;
      
      return {
        registerForm:registerFormState
      }

    });
  }


    
  
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
                    <label className="" >Name</label>
                    <NameInput classes="form-control" errorClass="input-error" setNameState={this.setNameState} />
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="" >Email</label>
                    <EmailInput classes="form-control" errorClass="input-error" setEmailState={this.setEmailState}/>
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
