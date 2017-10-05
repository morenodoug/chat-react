import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {requireAuth} from '../helpers.js'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    requireAuth() ? (
      (<h1>asd</h1>)
    ) : (
      <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;