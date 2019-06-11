import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Config from '../config';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {storeLocations, storeCategories, storeSearchLink, storeSearchQuery} from '../redux/actions';
import image from '../../public/images/down.png';

let downImgStyle = {
  backgroundImage: `url(${image})`
}

class MapSearch extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      location: this.props.searchQuery.location,
      category: this.props.searchQuery.category,
      minPrice: this.props.searchQuery.minPrice,
      maxPrice: this.props.searchQuery.maxPrice,
      minSize: this.props.searchQuery.minSize,
      maxSize: this.props.searchQuery.maxSize,
      maxSizeLimit: this.props.searchQuery.maxSizeLimit,
      maxPriceLimit: this.props.searchQuery.maxPriceLimit
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.storeSearchOptions = this.storeSearchOptions.bind(this)
  }

  componentDidMount() {
    this.storeSearchOptions()
    this.initSlider()
  }

  componentDidUpdate(){
    this.initSlider()
  }

  storeSearchOptions(){
    axios.get(`${Config.adress}/locations`)
    .then((response) =>{
      this.props.storeLocations(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get(`${Config.adress}/categories`)
    .then((response) => {
      this.props.storeCategories(response.data)
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
    }, async function(){
      await this.props.storeSearchQuery({
        category: this.state.category,
        location: this.state.location,
        minSize: this.state.minSize,
        maxSize: this.state.maxSize,
        maxSizeLimit: this.props.searchQuery.maxSizeLimit,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice,
        maxPriceLimit: this.props.searchQuery.maxPriceLimit
      });
      this.props.storeSearchLink(`${Config.adress}?category=${this.props.searchQuery.category}&location=${this.props.searchQuery.location}&size=${this.props.searchQuery.minSize}-${this.props.searchQuery.maxSize}&price=${this.props.searchQuery.minPrice}-${this.props.searchQuery.maxPrice}`);
    });

  }

  handleSubmit() {
    this.props.storeSearchLink(`${Config.adress}?category=${this.props.searchQuery.category}&location=${this.props.searchQuery.location}&size=${this.props.searchQuery.minSize}-${this.props.searchQuery.maxSize}&price=${this.props.searchQuery.minPrice}-${this.props.searchQuery.maxPrice}`);
  }

  handleChangeCategory(event){
    const value = event.target.value;
    const sliderLimits = this.props.categories.filter(category=>category._id===value);
    const maxSizeLimit = sliderLimits[0].maxSize;
    const maxPriceLimit = sliderLimits[0].maxPrice;

    this.setState({
      category: value,
      minSize: 0,
      minPrice: 0,
      maxSize: maxSizeLimit,
      maxPrice: maxPriceLimit
    }, async function(){
      await this.props.storeSearchQuery({
        category: this.state.category,
        location: this.state.location,
        minSize: 0,
        maxSize: parseInt(maxSizeLimit),
        maxSizeLimit: parseInt(maxSizeLimit),
        minPrice: 0,
        maxPrice: parseInt(maxPriceLimit),
        maxPriceLimit: parseInt(maxPriceLimit)
      })
      this.props.storeSearchLink(`${Config.adress}?category=${this.props.searchQuery.category}&location=${this.props.searchQuery.location}&size=${this.props.searchQuery.minSize}-${this.props.searchQuery.maxSize}&price=${this.props.searchQuery.minPrice}-${this.props.searchQuery.maxPrice}`);
    });

  }

  getVals(){
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat( slides[0].value );
    let slide2 = parseFloat( slides[1].value );

    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }

    let displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = slide1 + " - " + slide2 + "kn";
        displayElement.style.position = "inherit";
        displayElement.style.bottom = "5px";
    }

  getVals2(){
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
      let slide1 = parseFloat( slides[0].value );
      let slide2 = parseFloat( slides[1].value );

    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }

    let displayElement = parent.getElementsByClassName("rangeValues2")[0];
        displayElement.innerHTML = slide1 + " - " + slide2 + "m2";
        displayElement.style.position = "inherit";
        displayElement.style.bottom = "5px";
    }

    initSlider(){
    // Initialize Sliders
      let sliderSections = document.getElementsByClassName("range-slider");
        for( let x = 0; x < sliderSections.length; x++ ){
          let sliders = sliderSections[x].getElementsByTagName("input");
          for( let y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = this.getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
      let sliderSections2 = document.getElementsByClassName("range-slider2");
        for( let x = 0; x < sliderSections2.length; x++ ){
          let sliders2 = sliderSections2[x].getElementsByTagName("input");
          for( let y = 0; y < sliders2.length; y++ ){
            if( sliders2[y].type ==="range" ){
              sliders2[y].oninput = this.getVals2;
              // Manually trigger event first time to display values
              sliders2[y].oninput();
            }
          }
        }
    }

  render(){

    const categories = this.props.categories.map((option) => {
      return <option value={option._id} key={option._id}>{option.naziv}</option>
    })

    const locations = this.props.locations.map((option) => {
      return <option value={option._id} key={option._id}>{option.mjesto}</option>
    })

    const disabled = (this.props.searchQuery.category == "") ? true : false;
    const odaberiteKategorijuText = "Odaberite kategoriju nekretnine!";
    const minPriceSliderTitle = (this.state.category == "") ? odaberiteKategorijuText : "Odredite početnu cijenu za pretagu!";
    const maxPriceSliderTitle = (this.state.category == "") ? odaberiteKategorijuText : "Odredite konačnu cijenu za pretagu!";
    const sizeMinSliderTitle = (this.state.category == "") ? odaberiteKategorijuText : "Odredite početnu površinu za pretagu!";
    const sizeMaxSliderTitle = (this.state.category == "") ? odaberiteKategorijuText : "Odredite konačnu površinu za pretagu!";

    return(
      <div>
      <div className="home_search">
        <div className="row">
          <div className="col">
            <div className="home_search_container">
              <div className="home_search_content">
                <form action="#" className="search_form d-flex flex-row align-items-start justfy-content-start">
                  <div className="search_form_content d-flex flex-row align-items-start justfy-content-start flex-wrap">
                    <div>
                      <select style={downImgStyle}  className="search_form_select" name="category" onChange={this.handleChangeCategory} value={this.props.searchQuery.category}>
                        <option value="">Category</option>
                        {categories}
                      </select>
                    </div>
                    <div>
                      <select style={downImgStyle} disabled={disabled} className="search_form_select" name="location" onChange={this.handleInputChange} value={this.props.searchQuery.location}>
                        <option value="">Location (all)</option>
                        {locations}
                      </select>
                    </div>
                    <div>
                      <section className="range-slider2  move-left">
                        <span className="rangeValues2"></span>
                        <input value={this.props.searchQuery.minSize} disabled={disabled} min="0" title={sizeMinSliderTitle} max={this.props.searchQuery.maxSizeLimit} step="1" type="range" name="minSize" onChange={this.handleInputChange}/>
                        <input value={this.props.searchQuery.maxSize} disabled={disabled} min="0" title={sizeMaxSliderTitle} max={this.props.searchQuery.maxSizeLimit} step="1" type="range" name="maxSize" onChange={this.handleInputChange}/>
                      </section>
                    </div>
                    <div>
                      <section className="range-slider">
                        <span className="rangeValues"></span>
                        <input value={this.props.searchQuery.minPrice} disabled={disabled} min="0" title={minPriceSliderTitle} max={this.props.searchQuery.maxPriceLimit} step="1" type="range" name="minPrice" onChange={this.handleInputChange}/>
                        <input value={this.props.searchQuery.maxPrice} disabled={disabled} min="0" title={maxPriceSliderTitle} max={this.props.searchQuery.maxPriceLimit} step="1" type="range" name="maxPrice" onChange={this.handleInputChange}/>
                      </section>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    locations: state.locations,
    categories: state.categories,
    searchQuery: state.searchQuery
  }
}

function matchDispatchToProps (dispatch){
  return bindActionCreators({storeLocations: storeLocations, storeCategories: storeCategories, storeSearchLink: storeSearchLink, storeSearchQuery: storeSearchQuery}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MapSearch)
