import React from 'react'


function ErrorMessage(props){
    return( <p>{props.message}</p> );
}


class PasswordInput extends React.Component{

    constructor(props){
        super(props);
        this.handleBlur = this.handleBlur.bind(this);

        this.state={
            touched:false,
            error:{
                status: true,
                message: null
            },
            
            value:'' 
        }        
    }


    handleBlur(event){

        let value= event.target.value
        let newState = {
            error:{
                status: true,
                message: ""
            },
            touched:true,
            value: value
        };        
    
        if(value.length < 6){
            newState.error.message = " el password debe ser de al menos 6 caracteres"
            this.setState(newState, this.props.setPasswordState(true,null));

            
        }else{
            newState.error.message = "";
            newState.error.status = false;
            this.setState(newState, this.props.setPasswordState(false,value));

        }

    }
    render(){

        let showErrorMessage;
        const isTouched = this.state.touched;
        const hasError = this.state.error.status;
        const message= this.state.error.message;
        let classes = this.props.classes;


        if( isTouched && hasError){
            showErrorMessage = <ErrorMessage message={message}/>;
            classes = classes.concat(" ", this.props.errorClass)

            console.log(message);
        }

        return(
        <div>
            <input type="password" className= {classes} onBlur={this.handleBlur}/>
            {showErrorMessage}           
        </div>
            
        );        

    }
}

export default PasswordInput;