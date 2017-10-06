import React, { Component } from 'react';
import {FaUser} from 'react-icons/lib/fa';

import RepeatPasswordInput from '../components/RepeatPasswordInput';

import EmailInput from '../components/EmailInput';
import NameInput from '../components/NameInput';
import PasswordInput from '../components/PasswordInput';

import {connect} from 'react-redux';
import {signUP} from '../actions';

function errorDiv ( message){
  return (
    <div className="alert alert-danger alert-dismissable">
      <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
      {message}.
    </div>
  )
}

class RegisterForm extends Component {

  constructor(props){
    super(props); 

    this.setEmailState = this.setEmailState.bind(this);
    this.setNameState = this.setNameState.bind(this);
    this.setPasswordState = this.setPasswordState.bind(this);
    this.setRepeatPasswordState =  this.setRepeatPasswordState.bind(this);
    this.handleRegisterButton = this.handleRegisterButton.bind(this);
    
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
          },
          repeatPassword:{
            error:true,
            value: ""
          }          

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
     
      let newEmailState = Object.assign(prevState.registerForm)
      
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

  setPasswordState(error,value){

    this.setState((prevState,props) =>{
      
      let registerFormState = Object.assign({}, prevState.registerForm);
      registerFormState.password.error = error;
      registerFormState.password.value = value;
      console.log(prevState.registerForm.repeatPassword)
      return {
        registerForm: registerFormState
      }
    });
     
  }

  setRepeatPasswordState(error,value){
    this.setState((prevState, props) =>{
      let registerFormState = Object.assign({},prevState.registerForm);
      registerFormState.repeatPassword.error = error;
      registerFormState.repeatPassword.value = value;

      return {
        registerForm: registerFormState
      };
    });
  }

  handleRegisterButton(){
    let name = this.state.registerForm.name.value;
    let email = this.state.registerForm.email.value;
    let password = this.state.registerForm.password.value;
    
    let newState =  Object.assign({},this.state,{isFetching:true});
    
    this.setState( newState, () =>{
      
      this.props.dispatch(signUP(name, email, password))
      .then((response) =>{
        if (response.status ===409){

          let newState = Object.assign(this.state,{isFetching:false}, {error:{status:true, message:response.data.error}});
          this.setState(newState);

        }

        

      })
    });

    
  }
    
  
  render() {
    let disabledButton = (this.state.registerForm.name.error || 
                    this.state.registerForm.email.error  ||
                    this.state.registerForm.password.error ||
                    this.state.registerForm.repeatPassword.error ||
                    this.state.isFetching
               );

    let errorDiv; 
    if( this.state.error.status){
       errorDiv =  errorDiv(this.state.error.message)
    }



    return (
    

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
                  <label className="" >Nombre</label>
                  <NameInput classes="form-control" errorClass="input-error" setNameState={this.setNameState} />
                </div>
              </div>
            </div>


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
                <div className="form-group">
                  <label className="" >Confirmar Password</label>
                  <RepeatPasswordInput classes="form-control" errorClass="input-error" compareWith={this.state.registerForm.password.value} setRepeatPasswordState={this.setRepeatPasswordState}/>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-12">
                <button className="btn btn-success" 
                  disabled={disabledButton} 
                  onClick = {this.handleRegisterButton} 
                >
                    Registrate
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


export default connect(null)( RegisterForm);
