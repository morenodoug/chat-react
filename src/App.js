import React, { Component } from 'react';
import './App.css'
import RegisterForm from './components/RegisterForm'

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();



class App extends Component {


  render() {


    return (
      <div className="container">
        <Provider store={store}>
          <RegisterForm/>
        </Provider>
      </div>  
    );
  }
}


export default App;
