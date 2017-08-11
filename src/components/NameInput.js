import React from 'react';

function ErrorMessage(props){
  return(<p>{props.message}</p>);
}


class NameInput extends React.Component{

    constructor(props){
        super(props);

        this.isName =  this.isName.bind(this);
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

    isName(name){
        let nameRegex= /^[a-zA-Záéíóúñ][a-zA-Záéíóúñ\s]*$/;

        return nameRegex.test(name);
    }

    handleBlur(event){
        let nameValue = event.target.value.trim();
        //reemplazar espacios en blanco repetidos
        nameValue.replace(/\s+/g,' ') ;

        let newState = {
        error:{
            status:true,
            message:"proporcione un nombre valido"
        },
        touched:true,
        value: nameValue
        };

        if ( !this.isName(nameValue) ) {
            
            this.setState(newState, this.props.setNameState(true,null) );
            
        } else {

            newState.error.status= false;
            newState.error.message= "";
            newState.value = nameValue;

            this.setState(newState, this.props.setNameState(false,nameValue));


        }

        
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
            <input type="text" className= {classes} onBlur={this.handleBlur}/>
            {showErrorMessage}           
        </div>
            
        );        
    }

}

export default NameInput;