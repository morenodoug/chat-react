import React,{Component}  from 'react';


export default class Errordiv extends Component{

    constructor(props){
      super(props);

    }

    render(){
      return( <div className="alert alert-danger alert-dismissable">
                <button  className="close" data-dismiss="alert" aria-label="close" onClick={this.props.eliminarDiv} >&times;</button>
                {this.props.message}.
              </div>
      );
    }

}



// }