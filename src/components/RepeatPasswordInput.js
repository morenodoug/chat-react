import React from 'react';
import ErrorMessage from './ErrorMessage';
import Proptypes from 'prop-types';

class RepeatPasswordInput extends React.Component{

    constructor(props){
        super(props);
        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handlerOnFocus = this.handlerOnFocus.bind(this);
        

        this.state={
            touched:false,
            error:{
                status: true,
                message: null
            },
            
            value:'' 
        } 

    }
    
    componentWillReceiveProps(nextProps){

        if(nextProps.compareWith !== this.props.compareWith){


            let newState={
                touched:true,
                error:{
                    status: true,
                    message: null
                },
                
                value:this.state.value 
            };         
            if(nextProps.compareWith !== this.state.value){

                newState.error.status = true;
                newState.error.message=" los passwords no coinciden";
                this.setState(newState,this.props.setRepeatPasswordState(true,this.state.value));

            }else{

                newState.error.status = false;
                newState.error.message="";
                this.setState(newState,this.props.setRepeatPasswordState(false,this.state.value));

            }


        }

    }

    handlerOnFocus (event){
        if(!this.state.touched){
            this.setState((prevState,props) =>{
                let newState = Object.assign({}, prevState, {touched:true})
            })
        }
    }
    
    handlerOnChange(event){

        let newState={
            touched:true,
            error:{
                status: true,
                message: null
            },
            
            value:event.target.value 
        };         

        if(event.target.value !== this.props.compareWith){
            newState.error.status = true;
            newState.error.message=" los passwords no coinciden";
            this.setState(newState, this.props.setRepeatPasswordState(true,event.target.value));
        }else{

            newState.error.status = false;
            newState.error.message="";
            this.setState(newState, this.props.setRepeatPasswordState(false,event.target.value));            
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

            // console.log(message);
        }

        return(
        <div>
            <input type="password" className= {classes}  onFocus={this.handlerOnFocus} onChange={this.handlerOnChange}/>
            {showErrorMessage}           
        </div>
            
        );        

    }

}//end class

RepeatPasswordInput.Proptypes = {
    setRepeatPasswordState: Proptypes.func.required,
    compareWith: Proptypes.string.required,
    classes: Proptypes.string,
    errorClass: Proptypes.string
}



export default RepeatPasswordInput;