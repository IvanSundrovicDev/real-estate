import React from 'react'
import { Redirect } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Config from '../config'
import validator from 'validator';
import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage';

const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'Obavezno ispunite';
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};


class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      login:true,
      error:"",
      email:"",
      pass:""
    }
    this.handleClick =  this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleClick(){
    this.setState({login:!this.state.login, pass:""})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLogin(){
    axios.post(Config.login, {
      email: this.state.email,
      password: this.state.pass
    })
    .then((response) => {
      if(response.status === 200){
        reactLocalStorage.set("userRealestate", response.data.token)
        window.location.href = "/"
      }
      else{
        this.setState({error:"Krivi email ili lozinka!"})
      }
    })
    .catch((error) => {
      this.setState({error:"Krivi email ili lozinka!"})
    });
  }

  handleMail(){
    // axios.post(`${Config.adress}/agent/${this.props.id}/message`, {
    //   name: this.state.name,
    //   email: this.state.email,
    //   message: this.state.text
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  render(){
    return(this.state.login) ? (
      <div className="login">
        <div className="container">
          <div className={this.state.error ? 'alert alert-danger' : 'hidden'} role="alert">
            {this.state.error}
          </div>
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <Form>
                  <h3 className="text-center contact_section_title">Prijava</h3>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail:</label><br />
                    <Input type="email" name="email" className="form-control" validations={[required, email]} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Lozinka:</label><br />
                    <Input type="password" name="pass" className="form-control" validations={[required]} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <Button className="login_button" type="button" onClick={this.handleLogin}>Prijavite se </Button>
                  </div>
                  <div id="register-link" className="custom-text-right">
                    <a onClick={this.handleClick}>Zaboravili ste lozinku?</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    :
    (
      <div className="login">
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <Form id="login-form" className="form" action="" method="post">
                  <h3 className="text-center contact_section_title">Unesite e-mail adresu</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">E-mail:</label><br />
                    <Input type="email" name="email" className="form-control" validations={[required, email]} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <Button className="login_button" type="button" onClick={this.handleMail}>Pošalji</Button>
                  </div>
                  <div id="register-link" className="custom-text-right">
                    <a onClick={this.handleClick}>Natrag</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Login
