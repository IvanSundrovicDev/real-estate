import React from 'react'
import axios from 'axios'
import Form from 'react-validation/build/form';
import TextArea from 'react-validation/build/textarea';
import Input from 'react-validation/build/input';
import Modal from 'react-responsive-modal';
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


class TestimonialsEdit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location:'',
      navigate:'',
      testimonials:[],
      loading:true,
      open:false,
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
  }

  componentDidMount(){
    this.getTestimonials()
  }

  getTestimonials(){
    axios.get('https://nekretninko.herokuapp.com/api/v1.0/home')
    .then((response) => {
      this.setState({testimonials:response.data.klijenti, loading:false})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  onOpenModal(id) {
    this.setState({ open: true, deleteId:id });
  };

  onCloseModal() {
    this.setState({ open: false });
  };

  handleEdit(){
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
      return <Redirect to={`/lokacije`} />
    }

    return(this.state.loading)? (
      <div className="container add_height">
        <Loading />
      </div>
    )
    :
    (
      <div className="container add_realestate">
        <div className="add_section_title">Ispovijesti</div>
      <Form action="/nekretnina/dodaj" method="post">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <h1 className="testimonial_title">Ispovijest 1</h1>
                      <label htmlFor="naslov1">Naslov</label>
                      <Input className="form-control" name="naslov1" type="text" value={this.state.testimonials[0].naslov} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                      <label htmlFor="sadrzaj1">Sadrzaj</label>
                      <TextArea className="form-control" name="sadrzaj1" rows="8" value={this.state.testimonials[0].sadrzaj} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                      <label htmlFor="ime1">Ime</label>
                      <Input className="form-control" name="ime1" type="text" value={this.state.testimonials[0].ime} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                    </div>
                    <div className="col-md-4">
                      <h1 className="testimonial_title">Ispovijest 2</h1>
                      <label htmlFor="naslov2">Naslov</label>
                      <Input className="form-control" name="naslov2" type="text" value={this.state.testimonials[1].naslov} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                      <label htmlFor="sadrzaj2">Sadrzaj</label>
                      <TextArea className="form-control" name="sadrzaj2" rows="8" value={this.state.testimonials[1].sadrzaj} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                      <label htmlFor="ime2">Ime</label>
                      <Input className="form-control" name="ime2" type="text" value={this.state.testimonials[1].ime} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                    </div>
                    <div className="col-md-4">
                      <h1 className="testimonial_title">Ispovijest 3</h1>
                      <label htmlFor="naslov3">Naslov</label>
                      <Input className="form-control" name="naslov3" type="text" value={this.state.testimonials[2].naslov} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                      <label htmlFor="sadrzaj3">Sadrzaj</label>
                      <TextArea className="form-control" name="sadrzaj3" rows="8" value={this.state.testimonials[2].sadrzaj} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                      <label htmlFor="ime3">Ime</label>
                      <Input className="form-control" name="ime3" type="text" value={this.state.testimonials[2].ime} onChange={this.handleInputChange} validations={[required]} />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row float-right">
          <div className="col-auto">
            <Button type="button" className="add_button"  onClick={this.onOpenModal}>Spremi</Button>
          </div>
        </div>
      </Form>
      <Modal open={this.state.open} onClose={this.onCloseModal} center>
        <div className="modal_margin">
          <h3 className="modal_text">Želite li spremiti promijene?</h3>
          <button type="button" className="delete_button" onClick={this.onCloseModal}>Ne</button>
          <button type="button" className="add_button float-right"  onClick={this.handleEdit}>Da</button>
        </div>
      </Modal>
      </div>
    )
  }
}


export default TestimonialsEdit
