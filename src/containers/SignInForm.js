import React, { Component } from 'react';
import {FaUser} from 'react-icons/lib/fa';

import EmailInput from '../components/EmailInput';

import PasswordInput from '../components/PasswordInput';


import {connect} from 'react-redux';
import {signIn} from '../actions';

import ErrorDiv from '../components/ErrorDiv';
class SignInForm extends Component { 

  constructor(props){
    super(props); 

    this.setEmailState = this.setEmailState.bind(this);
    this.setPasswordState = this.setPasswordState.bind(this);
    this.handleSignInButton = this.handleSignInButton.bind(this);
    
    this.state =   {
        signInForm:{
          email:{
            error: true,
            value:"" ,
          },

          password:{
            error:true,
            value: ""
          },

        },
        isFetching: false,
        error:{
          status:false,
          message:''
        }

    }
  }// end constructor

  setEmailState(error, value){
    
    this.setState((prevState, props)=>{
     
      let newEmailState = Object.assign(prevState.signInForm)
      
      newEmailState.email.error = error;
      newEmailState.email.value = value;
      return {
        signInForm:newEmailState
      };

    });
  
  }


  setPasswordState(error,value){

    this.setState((prevState,props) =>{
      
      let signInFormState = Object.assign({}, prevState.signInForm);
      signInFormState.password.error = error;
      signInFormState.password.value = value;

      return {
        signInForm: signInFormState
      }
    });
     
  }

  handleSignInButton(){
    console.log(this.state.signInForm.email)
    let email = this.state.signInForm.email.value;
    let password = this.state.signInForm.password.value;
    
    let newState =  Object.assign({},this.state,{isFetching:true});
    
    this.setState( newState, () =>{
      
      this.props.dispatch(signIn(email, password))
      .then((response) =>{
        if (response.status ===401){

          let newState = Object.assign(this.state,{isFetching:false}, {error:{status:true, message:response.data.error}});
          this.setState(newState);

        }

      })
    });

    
  }
    
  
  render() {
    let disabledButton = (
                    this.state.signInForm.email.error  ||
                    this.state.signInForm.password.error ||
                    this.state.isFetching
               );

    let errorDiv; 
    if( this.state.error.status){
       errorDiv =  ErrorDiv(this.state.error.message)
    }



    return (
    

      <div className="row">  
        <div className="col-md-4 col-md-offset-4">
          <div className="form-top" >
            <div className="left">
              <h4>Iniciar Sesión </h4>
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
                  <EmailInput classes="form-control" errorClass="input-error"  setEmailState={this.setEmailState}/>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="" >Password</label>
                  <PasswordInput classes="form-control" errorClass="input-error" setPasswordState={this.setPasswordState}/>
                </div>
              </div>
            </div>

            <div className="row">

              <div className="col-md-12">
                <button className="btn btn-success" 
                  disabled={disabledButton} 
                  onClick = {this.handleSignInButton} 
                >
                    Iniciar Sesión
                </button>
              </div>

            </div>

            <div className="row error-div">
                <div className="col-md-12">
                  {errorDiv}
                </div>
                
            </div>            

          </div>
        </div>        
      </div>
    
    );
  }
}


export default connect(null)( SignInForm);
