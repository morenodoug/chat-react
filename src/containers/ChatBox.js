import React,{Component} from 'react';
import {connect} from 'react-redux';
import socketFunctions from '../socket';

function OtherMessage(props){
    return(
            <div className="talk-bubble tri-right round btm-left">
                <div className="talktext">
                    <div className="user-name">{props.userInfo.name }</div>
                    <hr/>
                    <p>{props.message}</p>
                    <span className="date">{props.date}</span>

                </div>
            </div> 
    )
}

function MyMessage(props){
    return(
            <div className="talk-bubble-my-message tri-right round right-in">
                <div className="talktext">
                    <div className="user-name">{props.userInfo.name}</div>
                    <hr className="hr-my-message"/>
                    <p>{props.message}</p>
                    <span className="date">{props.date}</span>
                </div>
            </div> 
    );
}



class ChatBox extends Component{

    constructor(props){
        super(props);
        this.state ={
            message:''
        }
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.clearMessage  =  this.clearMessage.bind(this);
    }

    scrollToBottom() {
        this.messagesBox.scrollIntoView({ behavior: 'smooth' });
    }    

    handleInputOnChange(event){
        let message = event.target.value;
        this.setState((prevState, props) =>{
            return Object.assign({}, {message})
        });
    }
    sendMessage(){
        let message = this.state.message.trim();
        socketFunctions.sendMessage(message);
        this.clearMessage();
    }

    clearMessage(){
        this.setState((prevState,props) => ({message:""}))
    }
    componentDidUpdate(prevProps, prevState, snapshot){

        if(this.props.conversation.length >0 &&  (this.props.conversation.length > prevProps.conversation.length))
        {
            this.scrollToLastMessage();        
        }
        

    }

    scrollToLastMessage(){
        const lastMessage = this.messagesBox.childNodes[this.messagesBox.childNodes.length-1] ;
        console.log(lastMessage)
        lastMessage.scrollIntoView({behavior:"smooth"})
    }

    render(){
        let messages = this.props.conversation.map( (message,index) => {
            if(this.props.userInfo.id === message.userInfo.id)
                return <MyMessage key={"message" + index} message={message.message} userInfo={message.userInfo} date={message.date}/>
            return <OtherMessage key={"message"+ index} message={message.message} userInfo={message.userInfo} date={message.date}  />
        })

        let buttonDisabled = this.state.message.trim().length ===0;
        return(
            <div>   
                <div 
                    className="row chat"
                    id="box"
                    ref={el => { this.messagesBox = el; }}
                    >
                    { messages}
                </div>
                <div className="row message-box" >
                    <div className="col-md-10">
                        <textarea type="text" 
                            value={this.state.message} 
                            className="form-control text-area-message"
                            onChange={this.handleInputOnChange}
                        />
                    </div>
                    <div className="col-md-2 message-button">
                        <button className="btn btn-success"  
                            onClick={this.sendMessage} 
                            disabled={buttonDisabled}
                            >Enviar Mensaje 
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userInfo: state.user,
        conversation: state.conversation
    }
}

export default connect(mapStateToProps)(ChatBox);
