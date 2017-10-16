import React from 'react';
import Proptypes from 'prop-types';

function UserDiv ({name,email} ){
    return (
        <div className="col-md-12 user-div" >
            <div className="user-div-border"></div>
            <p>{name}</p>
            <small>{email}</small>
        </div>
    )
}

function UsersList(props){
    //let usersListDiv = props.usersList.foreach((user) =>(<UserDiv key={user.id}/>) )
    let usersListDiv =[];
    for (let user in props.usersList){
    
        usersListDiv.push( <UserDiv   key={props.usersList[user].id} name= {props.usersList[user].name} email={props.usersList[user].email}/>  );
    }

    return(
        <div className="row">
            {usersListDiv}
        </div>
    )

}


UsersList.Proptypes ={
    usersList: Proptypes.object.required
}

export default UsersList;

