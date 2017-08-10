import React from 'react';

function ErrorMessage(props){
    return( <p>{props.message}</p> );
}

class RepeatPasswordInput extends React.Component{

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
                newState.error.status = true;
                newState.error.message=" los passwords no coinciden";
                this.setState(newState,this.props.setRepeatPasswordState);

            }else{

                newState.error.status = false;
                newState.error.message="";
                this.setState(newState,this.props.setRepeatPasswordState);

            }


        }

    }

    handleBlur(event){

        let newState={
            touched:true,
            error:{
                status: true,
                message: null
            },
            
            value:'' 
        };         

        if(event.target.value !== this.props.compareWith){
            newState.error.status = true;
            newState.error.message=" los passwords no coinciden";
            this.setState(newState, this.props.setRepeatPasswordState);
        }else{

            newState.error.status = false;
            newState.error.message="";
            this.setState(newState, this.props.setRepeatPasswordState);            
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
            <input type="password" className= {classes} onBlur={this.handleBlur}/>
            {showErrorMessage}           
        </div>
            
        );        

    }

}



export default RepeatPasswordInput;