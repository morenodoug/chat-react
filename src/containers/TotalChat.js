import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

import {getMyProfile, signIn, addChatUser,removeChatUser,setChatListCreator, addConversationMessage} from '../actions'
import config from '../config'
import socketFunctions from '../socket'

import UsersList from '../components/UsersList'
import ChatBox from '../containers/ChatBox'

class TotalChat extends Component{

    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.user.id ===null){

            this.props.getMyProfile()
            .then( (response) =>{
                if(response.status === 401 || response.status ===403){
                    localStorage.removeItem('jwt');
                    this.props.history.push('/sign-in');

                }else{

                    socketFunctions.connectToChat(this.props.user,
                                                  this.props.newUserConnected, 
                                                  this.props.userDisconnected,
                                                  this.props.setChatList,
                                                this.props.addMessage)
                }
            })
 
        }else{
            // io.connect(config.chatHost);
            socketFunctions.connectToChat(this.props.user,
                                          this.props.newUserConnected, 
                                          this.props.userDisconnected,
                                          this.props.setChatList,
                                          this.props.addMessage)
        }

    }

    render(){
        return(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 users-list-div">
                            <UsersList  usersList={this.props.usersList}/> 
                        </div>
                        <div className="col-md-8">
                            <ChatBox/>
                        </div>
                    </div>
                </div>               
            );        
    }

}

function mapStateToProps(state){

    return{
        user: state.user,
        usersList: state.chatUsers
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return{
        getMyProfile:() =>{
            return dispatch(getMyProfile())
        },

        newUserConnected: (user) =>{
            dispatch(addChatUser(user))

        },

        userDisconnected: (userId) =>{
            dispatch(removeChatUser(userId))
        },

        setChatList: (chatList) => {
            dispatch(setChatListCreator(chatList));

        },
        addMessage: (userInfo, message) =>{
            dispatch(addConversationMessage(userInfo,message))

        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TotalChat));
