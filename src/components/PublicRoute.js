import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {requireAuth} from '../helpers.js'


const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    requireAuth() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>

    ) : (
    <Component {...props}/>
    )
  )}/>
)

export default PublicRoute;