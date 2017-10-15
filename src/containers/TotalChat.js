import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

import {getMyProfile, signIn, addChatUser,removeChatUser,setChatListCreator} from '../actions'
import config from '../config'
import socketFunctions from '../socket'


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
                                                  this.props.setChatList)
                }


            })
 
        }else{
            // io.connect(config.chatHost);
            socketFunctions.connectToChat(this.props.user,
                                          this.props.newUserConnected, 
                                          this.props.userDisconnected,
                                          this.props.setChatList)
        }

        



    }

    render(){
        return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-8"></div>
                    </div>
                </div>               
            );        
    }

}

function mapStateToProps(state){

    return{
        user: state.user
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

        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TotalChat));
