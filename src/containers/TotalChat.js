import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

import {getMyProfile, signIn} from '../actions'


class TotalChat extends Component{

    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.user.id ===null){

            this.props.dispatch(getMyProfile())
            .then( (response) =>{
                if(response.status === 401 || response.status ===403){
                    localStorage.removeItem('jwt');
                    this.props.history.push('/')

                }
            }
                
            )
            
           

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

export default withRouter(connect(mapStateToProps)(TotalChat));
