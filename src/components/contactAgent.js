import React from 'react'
import axios from 'axios'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import TextArea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import Loading from './loading'
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


class ContactAgent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name:"",
      email:"",
      text:"",
      message:"",
      loading:false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleClick(){
    this.setState({loading:true})
    axios.post(`${Config.adress}/agent/${this.props.id}/message`, {
      name: this.state.name,
      email: this.state.email,
      message: this.state.text
    })
    .then((response) => {
      this.setState({loading:false, message:response.data.message})
    })
    .catch((error) => {
      this.setState({loading:false, message:response.data.message})
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
    if(this.state.loading){
      return <Loading />
    }
    return(
      <div className="contact_realtor">
        <div className={this.state.shouldHide ? 'hidden' : 'message'}>
          {this.state.message}
        </div>
        <div className="contact_form_container">
          <Form>
            <div className="row">
              <div className="col-sm-12 contact_name_col">
                <Input type="text" className="contact_input" placeholder="Your name*" name="name" validations={[required]} onChange={this.handleInputChange} />
              </div>
              <div className="col-sm-12 contact_name_col">
                <Input type="email" className="contact_input" placeholder="Your e-mail*" name="email" validations={[required, email]} onChange={this.handleInputChange} />
              </div>
              <div className="col-sm-12">
                <div><TextArea className="contact_textarea contact_input" placeholder="Your message*" name="text" validations={[required]}  onChange={this.handleInputChange}></TextArea></div>
              </div>
            </div>
            <Button className="contact_button button" type="button" onClick={this.handleClick}>Send</Button>
          </Form>
        </div>
      </div>

    )
  }
}

export default ContactAgent
