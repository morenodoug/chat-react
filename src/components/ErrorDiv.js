import React from 'react';
export default function ErrorDiv ( message){
  return (
    <div className="alert alert-danger alert-dismissable">
      <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
      {message}.
    </div>

    
  )
}