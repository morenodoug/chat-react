
import React from 'react';


function ErrorMessage(props){
  return(<p>{props.message}</p>);
}

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
    this.handleBlur = this.handleBlur.bind(this);

  }

  isEmail(value){
    let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     
    return email.test(value);
  }
  handleBlur(event){
    let value = event.target.value.trim();    
    if(!this.isEmail(value)){ 
      this.setState({
        error:{
          status:true,
          message:"proporcione email valido"
        },
        touched:true,
        value: value
      });      
    }else{
      
      this.setState({
        error:{
          status:false
        },
        touched:true,
        value: value

      });      
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
        <input type="text" className= {classes} onBlur={this.handleBlur}/>

        {showErrorMessage} 
        
      </div>
         
    );
  }
  
}//endclass

export default EmailInput;