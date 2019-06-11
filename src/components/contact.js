import React from 'react';
import MapContainer from './map'
import axios from 'axios'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import TextArea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import Config from '../config'
import validator from 'validator';

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



class Contact extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name:"",
      email:"",
      tel:"",
      message:""
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClick(){
    axios.post(Config.contact, {
      name: this.state.name,
      email: this.state.email,
      tel: this.state.tel,
      message: this.state.text
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <div>
        <div className="contact">
      		<div className="container">
      			<div className="row">
      				<div className="col-lg-4">
      					<div className="contact_info">
      						<div className="contact_section_title">Contact Us</div>
      						<div className="contact_section_subtitle">Vektor nekretnine</div>
      						<div className="contact_info_content">
      							<ul className="contact_info_list">
      								<li>
      									<div>Adress:</div>
      									<div>Trg slobode 8, 31000 Osijek</div>
      								</li>
      								<li>
      									<div>Phone Number:</div>
      									<div>+385 (0)31 200 742</div>
      								</li>
                      <li>
      									<div>Cellphone Number:</div>
      									<div>+385 (0)91 283 2930</div>
                        <div>+385 (0)98 438 208</div>
      								</li>
      								<li>
      									<div>E-mail:</div>
      									<div>info@tasman-nekretnine.hr</div>
      								</li>
      							</ul>
      						</div>
      					</div>
      			  </div>

      				<div className="col-lg-8">
      					<div className="contact_form_container">
      						<Form>
      							<div className="row">
      								<div className="col-lg-4 contact_name_col">
      									<Input type="text" className="contact_input" placeholder="Your name*" name="name" validations={[required]} required="required" onChange={this.handleInputChange} />
      								</div>
      								<div className="col-lg-4 contact_name_col">
      									<Input type="email" className="contact_input" placeholder="Your e-mail*" name="email" validations={[required, email]} required="required" onChange={this.handleInputChange} />
      								</div>
      								<div className="col-lg-4">
      									<Input type="tel" className="contact_input" placeholder="Your nubmer*" name="tel" validations={[required]} required="required" onChange={this.handleInputChange} />
      								</div>
      							</div>
      							<div><TextArea className="contact_textarea contact_input" placeholder="Your message*" name="message" validations={[required]} required="required" onChange={this.handleInputChange} ></TextArea></div>
      							<Button className="contact_button button" type="button" onClick={this.handleClick}>Send</Button>
      						</Form>
      					</div>
      				</div>
      			</div>
      		</div>
      	</div>

      	<div className="col-lg-12">
      		<div className="container info">
      			<div className="row">
      				<div className="col-lg-3">
      					<div className="contact_info">
      						<div className="contact_info_content">
      							<ul className="contact_info_list">
      								<li>
      									<div>Company registered in a commercial register:</div>
      									<div>Trgovački sud u Osijeku <br /> MBS 0000000</div>
      								</li>
      								<li>
      									<div>Identification number:</div>
      									<div>00000000</div>
      								</li>
      							</ul>
      						</div>
      					</div>
      				</div>
      				<div className="col-lg-3">
      					<div className="contact_info">
      						<div className="contact_info_content">
      							<ul className="contact_info_list">
      								<li>
      									<div>OIB:</div>
      									<div>0000000000</div>
      								</li>
      								<li>
      									<div>VAT ID:</div>
      									<div>HR - 000000000</div>
      								</li>
      							</ul>
      						</div>
      					</div>
      				</div>
      				<div className="col-lg-3">
      					<div className="contact_info">
      						<div className="contact_info_content">
      							<ul className="contact_info_list">
      								<li>
      									<div>Amount of the company's core capital:</div>
      									<div>20000,00 kn / amount paid in full</div>
      								</li>
      								<li>
      									<div>Members of the board:</div>
      									<div>Name Surname</div>
      								</li>
      							</ul>
      						</div>
      					</div>
      				</div>
      				<div className="col-lg-3">
      					<div className="contact_info">
      						<div className="contact_info_content">
      							<ul className="contact_info_list">
      								<li>
      									<div>Business account:</div>
      									<div>Raiffeisen BANK Austria d.d. Zagreb</div>
      								</li>
      								<li>
      									<div>IBAN:</div>
      									<div>HR21 0000000000 <br />	</div>
      								</li>
      							</ul>
      						</div>
      					</div>
      				</div>
      			</div>
      		</div>
      	</div>

      	<div className="contact_map">
      		<div className="map">
      			<div className="map_container">
      				<MapContainer position={[45.5591595, 18.6760752]} />
      			</div>
      		</div>
      	</div>
      </div>
    )
  }
}

export default Contact
