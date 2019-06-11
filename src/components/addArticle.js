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


const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'Obavezno ispunite';
  }
};


class AddArticle extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location:'',
      navigate:''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleClick(){
    axios.post(Config.mail, {
      email: this.state.email
    })
    .then(function (response) {
      this.setState({navigate:true})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){

    if(this.state.navigate){
      return <Redirect to={`/novosti/lista`} />
    }

    return(
      <div className="container add_realestate">
        <div className="add_section_title">Dodaj Novost</div>
      <Form action="/nekretnina/dodaj" method="post">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="naziv">Naslov</label>
                    <Input className="form-control" name="lokacija" type="text" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                  <br />
                  <div className="col-auto">
                    <label htmlFor="naziv">Slika</label>
                    <Input className="form-control" name="slike" type="file" multiple onChange={this.onFileChange} validations={[required]} />
                  </div>
                  <br />
                  <div className="col-auto">
                    <label htmlFor="naziv">Tekst</label>
                    <TextArea className="form-control" name="opis" rows="8" cols="80" onChange={this.handleInputChange} validations={[required]}></TextArea>
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


export default AddArticle
