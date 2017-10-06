
import React from 'react';
import PropTypes from 'prop-types';


import ErrorMessage from './ErrorMessage';



class EmailInput extends React.Component{  
  
  constructor(props){
    super(props); 
    this.state={
      touched:false,
      error:{
        status: true,
        message: null
      },
     
      value:''
    }
    this.isEmail = this.isEmail.bind(this);
    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.handlerOnFocus = this.handlerOnFocus.bind(this);

  }


  shouldComponentUpdate(nextProps, nextState){

        
      if(nextState.touched!==this.state.touched || 
      nextState.error.status !== this.state.error.status || 
      nextState.error.message !== this.state.error.message ||
      nextState.value !== this.state.value
      ){

          return true;
      }   

      return false;
  }


  isEmail(value){
    let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     
    return email.test(value);
  }

  handlerOnFocus(event){
    if(!this.state.touched){
      this.setState((prevState, props) =>{
        let newState = Object.assign({},prevState,{touched:true});
        return newState;
      });
    }
  }

  handlerOnChange(event){
    let value = event.target.value.trim();    
    
    let newState = {
      error:{
        status:true,
        message:"proporcione email valido"
      },
      touched:true,
      value: value
    };

    if(!this.isEmail(value)){ 

      this.setState(newState, this.props.setEmailState(true,null));      
    }else{

      newState.error.status= false;
      newState.error.message= "";
      newState.value = value;
      this.setState(newState, this.props.setEmailState(false,value));      
    }

       
  }

  render(){
    
    let showErrorMessage;
    const isTouched = this.state.touched;
    const hasError = this.state.error.status;
    const message= this.state.error.message;
    
    let classes = this.props.classes; 

    if( (isTouched) && (hasError)  ){
      
      showErrorMessage = <ErrorMessage message={message}   />
      classes = classes.concat("  ",this.props.errorClass);
      console.log(message)
    }
    
    return(
      <div>
        <input type="text" className= {classes} onFocus={this.handlerOnFocus} onChange={this.handlerOnChange} />

        {showErrorMessage} 
        
      </div>
         
    );
  }
  
}//endclass


EmailInput.propTypes ={
  setEmailState: PropTypes.func.isRequired,
  classes: PropTypes.string,
  errorClass: PropTypes.string

}

export default EmailInput;