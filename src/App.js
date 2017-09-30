import React, { Component } from 'react';
import './App.css'
import RegisterForm from './components/RegisterForm'



class App extends Component {

  constructor(props){
    super(props); 
 
   
  }// end constructor
 
  
  render() {


    return (
      <div className="container">
        <RegisterForm/>

      </div>  
    );
  }
}


export default App;
