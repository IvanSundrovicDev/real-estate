import React from 'react'
import axios from 'axios'
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
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'Obavezno ispunite';
  }
};


class AddRealEstate extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      categories:[],
      locations:[],
      loading:false,
      bazen:false,
      jacuzzi:false,
      vrt:false,
      zimskaTerasa:false,
      prodano:false,
      izdvojena:false,
      aktivna:false,
      photos:[],
      navigate:''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.storeSearchOptions = this.storeSearchOptions.bind(this)
  }


  componentDidMount() {
    this.storeSearchOptions()
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
    if(files.length > 6){
      this.setState({photos:files})
    }
    this.setState({message:'Dodajte 6 ili više slika!'})
  }

  handleClick(){
    const fd = new FormData();
            const data = JSON.stringify({
              tip:this.state.tip,
              naziv:this.state.naziv,
              lokacija:this.state.lokacija,
              kategorija:this.state.kategorija,
              povrsina:Number(this.state.povrsina),
              opis:this.state.opis,
              cijenaKN:Number(this.state.cijenaKN),
              cijenaEUR:Number(this.state.cijenaEUR),
              photos:this.state.photos,
              sifra:Number(this.state.sifra),
              bazen:this.state.bazen,
              latlong:this.state.latlong,
              jacuzzi:this.state.jacuzzi,
              brojSoba:this.state.brojSoba,
              brojKupatila:Number(this.state.brojKupatila),
              brojBalkona:Number(this.state.brojBalkona),
              brojGaraza:Number(this.state.brojGaraza),
              izdvojena:this.state.izdvojena,
              zimskaTerasa:this.state.zimskaTerasa,
              vrt:this.state.vrt
            });
            fd.append('data',data);

            Object.keys(this.state.photos).forEach(key => {
                fd.append('photos', new Blob([this.state.photos[key]], { type: this.state.photos[key].type }));
            });

            this.setState({message:'Slanje u tijeku', loading:true})

              axios({
                method: 'POST',
                url: Config.adress,
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
      return <Redirect to={`/nekretnine/edit/${this.state.navigate}`} />
    }


    const categories = this.state.categories.map((option) => {
      return <option value={option._id} key={option._id}>{option.naziv}</option>
    })

    const locations = this.state.locations.map((option) => {
      return <option value={option._id} key={option._id}>{option.mjesto}</option>
    })

    return(this.state.loading)? (
      <div className="container add_height">
        <Loading />
      </div>
    )
    :
    (
      <div className="container add_realestate">
        <div className="add_section_title">Dodaj Nekretinu</div>
      <Form action="/nekretnina/dodaj" method="post">
        <div className="row">

          <div className="col-lg-6">

            <div className="row">
              <div className="col-sm-5">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="sifra">Šifra <span className="badge">(obavezno)</span></label>
                    <Input className="form-control" name="sifra" type="number" onChange={this.handleInputChange} validations={[required]}/>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="naziv">Naziv</label>
                    <Input className="form-control" name="naziv" type="text" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="kategorija">Kategorija</label>
                    <Select name="kategorija" className="form-control input-sm" type="text" onChange={this.handleInputChange} validations={[required]} >
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
                    <Input className="form-control" id="tip" name="tip" type="text" onChange={this.handleInputChange} validations={[required]}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="lokacija">Lokacija</label>
                    <Select name="lokacija" className="form-control input-sm" type="text" onChange={this.handleInputChange} validations={[required]}>
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
                    <Input className="form-control" name="latlong" type="text" onChange={this.handleInputChange}  validations={[required]}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="velicina">Površina m2</label>
                    <Input className="form-control" name="povrsina" type="number" min="0" max="100000" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="velicina">Cijena KN</label>
                    <input className="form-control" name="cijenaKN" type="decimal" min="0" max="100000000" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="cijena">Cijena EUR</label>
                    <Input className="form-control" name="cijenaEUR" type="decimal" min="0" max="100000000" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="opis">Opis</label>
                <TextArea className="form-control" name="opis" rows="8" cols="80" onChange={this.handleInputChange} validations={[required]}></TextArea>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojSoba">Broj soba</label>
                    <Input className="form-control" name="brojSoba"  type="text" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojKupatila">Broj kupatila</label>
                    <Input className="form-control" name="brojKupatila" min="0" max="10" type="number"  onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojBalkona">Broj balkona</label>
                    <Input className="form-control" name="brojBalkona" min="0" max="10" type="number" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group">
                  <div className="col-auto">
                    <label htmlFor="brojGaraza">Broj garaža</label>
                    <Input className="form-control" name="brojGaraza" min="0" max="10" type="number" onChange={this.handleInputChange} validations={[required]} />
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="bazen" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="bazen" className="form-check-label">Bazen</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="jacuzzi" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="jacuzzi" className="form-check-label">Jacuzzi</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="vrt" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="vrt" className="form-check-label">Vrt</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="zimskaTerasa" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="zimskaTerasa" className="form-check-label">Zimska terasa</label>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="slike">Slike</label>
                <Input className="form-control" name="slike" type="file" multiple onChange={this.onFileChange} validations={[required]} />
              </div>
            </div>

            <br />
            <hr />

            <div className="row">
              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="aktivna" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="aktivna" className="form-check-label">Aktivan prikaz</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="izdvojena" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="izdvojena" className="form-check-label">Izdvojena</label>
                  </div>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-check">
                  <div className="col-auto">
                    <Input className="form-check-input" name="prodano" type="checkbox" onChange={this.handleCheckbox} />
                    <label htmlFor="prodano" className="form-check-label">Prodana</label>
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


export default AddRealEstate
