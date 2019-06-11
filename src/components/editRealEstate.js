import React from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import TextArea from 'react-validation/build/textarea';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import { Redirect } from 'react-router-dom';
import Loading from './loading'
import Config from '../config'
import validator from 'validator';
import {reactLocalStorage} from 'reactjs-localstorage';

const required = (value) => {
  //console.log(value);
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'Obavezno ispunite';
  }
};


class EditRealEstate extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      categories:[],
      locations:[],
      message:'',
      bazen:false,
      jacuzzi:false,
      vrt:false,
      zimskaTerasa:false,
      prodano:false,
      izdvojena:false,
      aktivna:false,
      photos:[],
      navigate:'',
      loading:true,
      deleted:false,
      realEstate:{},
      open:false,
      realEstate:{
        slike:[],
        kategorija:{},
        lokacija:{
          latlong:['','']
        }
      },
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.storeSearchOptions = this.storeSearchOptions.bind(this)
    this.getRealEstate = this.getRealEstate.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.handleImageDelete = this.handleImageDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleLatLong = this.handleLatLong.bind(this)
  }


  componentDidMount() {
    this.storeSearchOptions()
    this.getRealEstate()
  }

  getRealEstate(){
    axios.get(`${Config.adress}/${this.props.id}`)
      .then(res => {
        const property = res.data;
        this.setState({
          realEstate: property,
          loading:false,
          tip:property.tip,
          naziv:property.naziv,
          location:property.lokacija.id,
          category:property.kategorija.id,
          povrsina:Number(property.povrsina),
          opis:property.opis,
          cijenaKN:Number(property.cijenaKN),
          cijenaEUR:Number(property.cijenaEUR),
          sifra:Number(property.sifra),
          bazen:property.bazen,
          jacuzzi:property.jacuzzi,
          brojSoba:property.brojSoba,
          latlong:property.latlong,
          brojKupatila:Number(property.brojKupatila),
          brojBalkona:Number(property.brojBalkona),
          brojGaraza:Number(property.brojGaraza),
          izdvojena:property.izdvojena,
          zimskaTerasa:property.zimskaTerasa,
          vrt:property.vrt
        })
      })
      .catch(err => console.log(err))
  }

  storeSearchOptions(){
    axios.get(`${Config.adress}/locations`)
    .then((response) =>{
      this.setState({locations:response.data})
    })
    .catch(function (error) {
      console.log(error);
    });


    axios.get(`${Config.adress}/categories`)
    .then((response) => {
      this.setState({categories:response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  handleCheckbox(event){
    const target = event.target;
    const name = target.name;
    const value = !this.state[name];
    this.setState({
      [name]: value
    });
  }

  handleLatLong(event){
    const rawLatLong = event.target.value
    const splited = rawLatLong.split(",")
    const latlong = [splited[0], splited[1]]
    this.setState({latlong: latlong})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onFileChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      console.log('no files');
    }
    this.setState({photos:files})
  }

  handleDelete(){
    this.setState({loading:true, open:false})
    axios({
      method: 'DELETE',
      url: `${Config.adress}/${this.props.id}`,
      headers : {
         'Authorization': reactLocalStorage.get("userRealestate")
      }
    })
    .then((response) => {
      this.setState({deleted:true})

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleImageDelete(){
    this.setState({loading:true, open:false})
    axios({
      method: 'DELETE',
      url: `${Config.adress}/${this.props.id}/image/${this.state.deleteId}`,
      headers : {
         'Authorization': reactLocalStorage.get("userRealestate")
      }
    })
    .then((response) => {
      this.getRealEstate()
      this.setState({loading:false, message:'Slika uspiješno obrisana!'})
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onOpenModal(id) {
    if(typeof id === "string"){
      this.setState({ open: true, deleteId:id });
    }
    else{
      this.setState({ open: true });    }
  };

  onCloseModal() {
    this.setState({ open: false, deleteId:"" });
  };


  handleClick(){
    this.setState({loading:true})
    const fd = new FormData();
            const data = JSON.stringify({
              tip:this.state.tip,
              naziv:this.state.naziv,
              lokacija:this.state.location,
              kategorija:this.state.category,
              povrsina:Number(this.state.povrsina),
              opis:this.state.opis,
              cijenaKN:Number(this.state.cijenaKN),
              cijenaEUR:Number(this.state.cijenaEUR),
              photos:this.state.photos,
              sifra:Number(this.state.sifra),
              bazen:this.state.bazen,
              jacuzzi:this.state.jacuzzi,
              latlong:this.state.latlong,
              brojSoba:this.state.brojSoba,
              brojKupatila:Number(this.state.brojKupatila),
              brojBalkona:Number(this.state.brojBalkona),
              brojGaraza:Number(this.state.brojGaraza),
              izdvojena:this.state.izdvojena,
              zimskaTerasa:this.state.zimskaTerasa,
              vrt:this.state.vrt
            });
            fd.append('data',data);
            if(this.state.photos){
              Object.keys(this.state.photos).forEach(key => {
                fd.append('photos', new Blob([this.state.photos[key]], { type: this.state.photos[key].type }));
              });
            }

            this.setState({message:'Slanje u tijeku'})

              axios({
                method: 'PUT',
                url: Config.adress + '/' + this.state.realEstate._id ,
                data: fd,
                headers : {
                   'Authorization': reactLocalStorage.get("userRealestate")
                }
              }).then((res) => {
                console.log(res);
                this.getRealEstate()
                this.setState({loading:false, message:'Nekretina uspiješno uređena'})
              }).catch(err => {
                console.log(err);
              })
  }

  render(){

    const info = this.state.realEstate;
    console.log(info);

    const open = this.state.open;

    const category = this.state.category ? this.state.category : info.kategorija
    const location = this.state.location ? this.state.location : info.lokacija

    if(this.state.deleted){
      return <Redirect to={`/nekretnine/lista`} />
    }

    if(this.state.navigate){
      return <Redirect to={`/nekretnine/edit/${this.state.navigate}`} />
    }


    const categories = this.state.categories.map((option) => {
      return <option value={option._id} key={option._id}>{option.naziv}</option>
    })

    const locations = this.state.locations.map((option) => {
      return <option value={option._id} key={option._id}>{option.mjesto}</option>
    })

    const images = info.slike.map((image) =>{
      return (
        <div className="edit_small_img col-sm-4 col-6" key={image.public_id + 'a'}>
          <img src={image.path} />
          <div className="img_overlay">
            <a onClick={() => this.onOpenModal(image.public_id)}>X</a>
          </div>
        </div>
      )
    })

    let modalData
      if(this.state.deleteId){
        modalData = (
          <div className="modal_margin">
            <h3 className="modal_text">Želite li obrisat ovu sliku</h3>
            <button type="button" className="delete_button" onClick={this.onCloseModal}>Ne</button>
            <button type="button" className="add_button float-right"  onClick={this.handleImageDelete}>Da</button>
          </div>
        )
      }
      else{
        modalData = (
          <div className="modal_margin">
            <h3 className="modal_text">Želite li obrisat ovu nekretninu</h3>
            <button type="button" className="delete_button" onClick={this.onCloseModal}>Ne</button>
            <button type="button" className="add_button float-right"  onClick={this.handleDelete}>Da</button>
          </div>
        )
      }

    return(this.state.loading)?
    (
      <div className="container edit_height">
        <Loading />
      </div>
    )
    :
    (
      <div className="container add_realestate">
        <div className={this.state.message ? 'alert alert-danger' : 'hidden'}>
          {this.state.message}
        </div>
        <div className="add_section_title">Uredi Nekretinu</div>
      <Form action="/nekretnina/dodaj" method="post">
        <div className="row">

          <div className="col-lg-6">

            <div className="row">
              <div className="col-sm-5">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="sifra">Šifra <span className="badge">(obavezno)</span></label>
                    <Input className="form-control" name="sifra" type="number" onChange={this.handleInputChange} value={info.sifra} validations={[required]}/>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="naziv">Naziv</label>
                    <Input className="form-control" name="naziv" type="text" onChange={this.handleInputChange} value={info.naziv} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="kategorija">Kategorija</label>
                    <Select name="category" className="form-control input-sm" type="text" onChange={this.handleInputChange} value={category} validations={[required]} >
                      <option value="" disabled={null}>Izaberi</option>
                      {categories}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="tip">Tip</label>
                    <Input className="form-control" id="tip" name="tip" type="text" onChange={this.handleInputChange} value={info.tip} validations={[required]}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="lokacija">Lokacija</label>
                    <Select name="location" className="form-control input-sm" type="text" onChange={this.handleInputChange} value={location} validations={[required]}>
                      <option value="" disabled={null}>Izaberi</option>
                      {locations}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="latLong">Latitude, Longitude</label>
                    <Input className="form-control" name="latlong" type="text"  onChange={this.handleLatLong} value={info.lokacija.latlong[0] + ',' + info.lokacija.latlong[1]} validations={[required]}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="velicina">Površina m2</label>
                    <Input className="form-control" name="povrsina" type="number" min="0" max="10000" onChange={this.handleInputChange} value={info.povrsina} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="velicina">Cijena KN</label>
                    <Input className="form-control" name="cijenaKN" type="decimal" min="0" max="100000000" onChange={this.handleInputChange} value={info.cijenaKN} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="cijena">Cijena EUR</label>
                    <Input className="form-control" name="cijenaEUR" type="decimal" min="0" max="100000000" onChange={this.handleInputChange} value={info.cijenaEUR} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="opis">Opis</label>
                <TextArea className="form-control" name="opis" rows="8" cols="80" onChange={this.handleInputChange} value={info.opis} validations={[required]}></TextArea>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojSoba">Broj soba</label>
                    <Input className="form-control" name="brojSoba"  type="text" onChange={this.handleInputChange} value={info.brojSoba} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojKupatila">Broj kupatila</label>
                    <Input className="form-control" name="brojKupatila" min="0" max="10" type="number"  onChange={this.handleInputChange} value={info.brojKupatila} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojBalkona">Broj balkona</label>
                    <Input className="form-control" name="brojBalkona" min="0" max="10" type="number" onChange={this.handleInputChange} value={info.brojBalkona} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojGaraza">Broj garaža</label>
                    <Input className="form-control" name="brojGaraza" min="0" max="10" type="number" onChange={this.handleInputChange} value={info.brojGaraza} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="bazen" type="checkbox" checked={info.dodatno.find((i) => i === "Bazen")} onChange={this.handleCheckbox} />
                    <label htmlFor="bazen" className="form-check-label">Bazen</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="jacuzzi" type="checkbox" checked={info.dodatno.find((i) => i === "Jacuzzi")} onChange={this.handleCheckbox} />
                    <label htmlFor="jacuzzi" className="form-check-label">Jacuzzi</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="vrt" type="checkbox" checked={info.dodatno.find((i) => i === "Vrt")} onChange={this.handleCheckbox} />
                    <label htmlFor="vrt" className="form-check-label">Vrt</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="zimskaTerasa" type="checkbox" checked={info.dodatno.find((i) => i === "Zimska terasa")} onChange={this.handleCheckbox} />
                    <label htmlFor="zimskaTerasa" className="form-check-label">Zimska terasa</label>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="slike">Dodaj slike</label>
                <Input className="form-control" name="slike" type="file" multiple onChange={this.onFileChange} />
              </div>
            </div>

            <br />
            <hr />

            <div className="row">
              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="aktivna" checked={info.aktivna} type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="aktivna" className="form-check-label">Aktivan prikaz</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="izdvojena" checked={info.izdvojena} type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="izdvojena" className="form-check-label">Izdvojena</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="prodano" checked={info.prodana} type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="prodano" className="form-check-label">Prodana</label>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="delete_title">Postojeće slike</h3>
            <div className="row margin_top">
              {images}
            </div>
          </div>
        </div>
        <button type="button" className="delete_button" onClick={this.onOpenModal}>Obriši</button>
        <div className="row float-right">
          <div className="col-auto">
            <Button type="button" className="add_button"  onClick={this.handleClick}>Spremi</Button>
          </div>
        </div>
      </Form>
      <Modal open={open} onClose={this.onCloseModal} center>

        {modalData}

      </Modal>
      </div>
    )
  }
}


export default EditRealEstate
