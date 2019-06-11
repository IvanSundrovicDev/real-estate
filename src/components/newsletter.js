import React from 'react';
import { Parallax, Background } from 'react-parallax';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Config from '../config'
import validator from 'validator';
import image from '../../public/images/newsletter.jpg'
import axios from 'axios'

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

class Newsletter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email:"",
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClick(){
    axios.post(Config.mail, {
      email: this.state.email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  render(){
    return(
      <div>
          <Parallax strength={100}>
            <Background className="custom-bg">
              <img src={image}/>
            </Background>
        		<div className="container newsletter">
        			<div className="row">
        				<div className="col">
        					<div className="newsletter_content d-flex flex-lg-row flex-column align-items-start justify-content-start">
        						<div className="newsletter_title_container">
        							<div className="newsletter_title">Want to get notified?</div>
        							<div className="newsletter_subtitle">Subscribe with your e-mail adress</div>
        						</div>
        						<div className="newsletter_form_container">
        							<Form>
        								<Input type="email" className="newsletter_input" placeholder="Your e-mail adress" validations={[required, email]} onChange={this.handleInputChange}/>
        								<Button className="newsletter_button" type="button" onClick={this.handleClick}>Subscribe</Button>
        							</Form>
        						</div>
        					</div>
        				</div>
        			</div>
        		</div>
          </Parallax>
      </div>
    )
  }
}

export default Newsletter
