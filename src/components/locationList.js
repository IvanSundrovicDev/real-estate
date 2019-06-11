import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import RealEstate from './realEstate'
import Config from '../config'

class LocationList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      locations:[],
      open:false,
      deleteId:""
    }
    this.getLocations = this.getLocations.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  getLocations(){
    axios.get(`${Config.adress}/locations`)
      .then(res => {
        this.setState({locations:res.data})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getLocations()
  }

  onOpenModal(id) {
    this.setState({ open: true, deleteId:id });
  };

  onCloseModal() {
    this.setState({ open: false });
  };

  handleDelete(){

  }

  render(){
    const locations = this.state.locations.map((location) => {
      return (
        <tr key={location._id}>
          <th scope="row">{location.mjesto}</th>
          <td>
            <button className="btn btn-danger" onClick={() => this.onOpenModal(location._id)}>Obriši</button>
          </td>
        </tr>
      )
    })

    return(
      <div>
        <div className="properties">
      		<div className="container">
      			<div className="row">
      				<div className="col">
      					<div className="about_title">Lista Lokacija</div>
                <Link to={'/lokacije/dodaj'}><button type="button" className="btn btn-primary button_margin">Dodaj Lokaciju</button></Link>
      				</div>
      			</div>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Lokacije</th>
                    <th>Opcije</th>
                  </tr>
                </thead>
                <tbody>
                  {locations}
                </tbody>
            </table>
      		</div>
      	</div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="modal_margin">
            <h3 className="modal_text">Želite li obrisat ovu lokaciju</h3>
            <button type="button" className="delete_button" onClick={this.onCloseModal}>Ne</button>
            <button type="button" className="add_button float-right"  onClick={this.handleDelete}>Da</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default LocationList
