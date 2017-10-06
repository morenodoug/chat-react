import React from 'react'
import ErrorMessage from './ErrorMessage';
import PropTypes from 'prop-types';

class PasswordInput extends React.Component {

    constructor(props) {
        super(props);
        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handlerOnFocus = this.handlerOnFocus.bind(this);

        this.state = {
            touched: false,
            error: {
                status: true,
                message: null
            },

            value: ''
        }
    }

    handlerOnFocus(event) {
        if (!this.state.touched) {
            this.setState((prevState, props) => {
                let newState = Object.assign({}, prevState, { touched: true })
                return newState;
            })


        }

    }
    handlerOnChange(event) {

        let value = event.target.value
        let newState = {
            error: {
                status: true,
                message: ""
            },
            touched: true,
            value: value
        };

        if (value.length < 6) {
            newState.error.message = " el password debe ser de al menos 6 caracteres"
            this.setState(newState, this.props.setPasswordState(true, null));


        } else {
            newState.error.message = "";
            newState.error.status = false;
            this.setState(newState, this.props.setPasswordState(false, value));

        }

    }
    render() {

        let showErrorMessage;
        const isTouched = this.state.touched;
        const hasError = this.state.error.status;
        const message = this.state.error.message;
        let classes = this.props.classes;


        if (isTouched && hasError) {
            showErrorMessage = < ErrorMessage message = { message }
            />;
            classes = classes.concat(" ", this.props.errorClass)

            console.log(message);
        }

        return ( 
            <div >
                <input type = "password"
                    className = { classes }
                    onFocus = { this.handlerOnFocus }
                    onChange = { this.handlerOnChange }
                />
                    { showErrorMessage } 
            </div>
        );

    }
}//end class

PasswordInput.PropTypes ={
    classes: PropTypes.string,
    errorClass: PropTypes.string,
    setPasswordState: PropTypes.func.required
}

export default PasswordInput;