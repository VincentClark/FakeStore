import React from 'react';
const emailValidator = require('email-validator');

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            rq_name_on: false,
            rq_email_on: false,
            rq_password_on: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    simpleTest(mode,qselect="#rq_name"){
        const form_container = document.getElementById('form_container');
        if (mode == "on"){
            form_container.querySelector(qselect).textContent = "required";
        }else{
            form_container.querySelector(qselect).textContent = "";
        }
    }
    simpleEmailValidator(email){
        
    }
    handleChange(event) {
         //this.setState({value: event.target.value})
         if (event.target.value == "V"){
            this.simpleTest('on',"#rq_email");
         }else{
             this.simpleTest('off',"#rq_email");
         }
    }
    handleSubmit(event) {
        console.log(`A name was submitted: ${this.state.value}`);
        this.simpleTest();
        event.preventDefault();
        //event.onSubmit = fetch('/submitform'),{method:'post'}
    }
    render() {
        return (
            <div className="container-fluid" id="form_container">
            <form onSubmit={this.handleSubmit}>
                <div><span id="rq_name" className="requirements"></span><label>Name: <input type="text" name="name" onChange={this.handleChange}/></label></div>
                <div><span id="rq_email" className="requirements"></span><label>Email: <input type="text" name="email" /></label></div>
                <div><span id="re_password" className="requirements"></span><label>Password: <input type="password" /></label></div>
                <div><input type="submit" value="Submit" /></div>
            </form>
            </div>
        );
    }
}

export default RegisterForm;