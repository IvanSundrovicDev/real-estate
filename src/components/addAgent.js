import React from 'react'
import axios from 'axios'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import TextArea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import { Redirect } from 'react-router-dom';
import Loading from './loading'
import Config from '../config'
import validator from 'validator';
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


class AddAgent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location:'',
      navigate:''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  onFileChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    this.setState({photo:files})
  }

  handleClick(){
    const fd = new FormData();
            const data = JSON.stringify({
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              email:this.state.email,
              password:this.state.password
            });
            fd.append('data',data);


            fd.append('photo', new Blob([this.state.photo], { type: this.state.photo.type }));

            this.setState({message:'Slanje u tijeku', loading:true})

              axios({
                method: 'POST',
                url: 'https://nekretninko.herokuapp.com/api/v1.0/users/add',
                data: fd,
                headers : {
                   'Authorization': reactLocalStorage.get("userRealestate")
                }
              }).then((res) => {
                console.log(res);
                this.setState({navigate:res.data.id})
              }).catch(err => {
                console.log(err);
              })
  }

  render(){
    if(this.state.navigate){
      return <Redirect to={`/agenti/lista`} />
    }

    return(
      <div className="container add_realestate">
        <div className="add_section_title">Dodaj Agenta</div>
      <Form action="/nekretnina/dodaj" method="post">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="naziv">Ime</label>
                    <Input className="form-control" name="firstName" type="text" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                  <br />
                  <div className="col-auto">
                    <label htmlFor="naziv">Prezime</label>
                    <Input className="form-control" name="lastName" type="text" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                  <br />
                  <div className="col-auto">
                    <label htmlFor="naziv">Email Adresa</label>
                    <Input type="email" name="email" className="form-control" validations={[required, email]} onChange={this.handleInputChange} />
                  </div>
                  <br />
                  <div className="col-auto">
                    <label htmlFor="naziv">Lozinka</label>
                    <Input type="password" name="password" className="form-control" validations={[required]} onChange={this.handleInputChange} />
                  </div>
                  <br />
                  <div className="col-auto">
                    <label htmlFor="naziv">Slika</label>
                    <Input className="form-control" name="photo" type="file" onChange={this.onFileChange} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row float-right">
          <div className="col-auto">
            <Button type="button" className="add_button"  onClick={this.handleClick}>Spremi</Button>
          </div>
        </div>
      </Form>
      </div>
    )
  }
}


export default AddAgent
