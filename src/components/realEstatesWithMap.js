import React from 'react';
import RecentRealEstate from './recentRealEstate'
import { connect } from 'react-redux'
import axios from 'axios'
import Config from '../config'
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom'
import Loading from './loading'
import MapSearch from './mapSearch'
import IntersectionVisible    from 'react-intersection-visible';
import icon1 from '../../public/images/icon_1.png'
import icon2 from '../../public/images/icon_2.png'
import icon3 from '../../public/images/icon_3.png'
import markerIcon from '../../public/images/marker-icon.png'
import markerIconActive from '../../public/images/marker-icon-active.png'
require('intersection-observer')

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';

const image = new L.Icon({
               iconUrl: require('../../public/images/marker-icon.png'),
               shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
               iconSize:     [38, 43], // size of the icon
               shadowSize:   [50, 64], // size of the shadow
               iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
               shadowAnchor: [4, 62],  // the same for the shadow
               popupAnchor:  [-3, -76]// point from which the popup should open relative to the iconAnchor
           })


class Properties extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pages:1,
      current:1,
      count:0,
      realEstates:[],
      loading:true
    }
    this.getRealEstates = this.getRealEstates.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
    this.onShow = this.onShow.bind(this)
  }

  getRealEstates(){
    let searchLink;
    if(!this.props.searchLink){
      searchLink = Config.adress
    }
    else{
      searchLink = this.props.searchLink
    }
    axios.get(searchLink)
      .then(res => {
        const searchResult = res.data;
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:searchResult.realEstates, loading:false})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    let nextLink;
    if(!this.props.searchLink){
      nextLink = Config.adress  + "?page=" + Number(this.state.current + 1)
    }
    else{
      nextLink = this.props.searchLink + "&page=" + Number(this.state.current + 1)
    }
    axios.get(nextLink)
      .then(res => {
        const searchResult = res.data;
        const updatedRealEstates = this.state.realEstates.concat(searchResult.realEstates)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:updatedRealEstates})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getRealEstates()
  }

  onShow(id){
    if(window.innerWidth >= 767){
      const m = document.querySelectorAll(".leaflet-marker-icon")
      for(var i = 0; i < m.length; i++){
        m[i].src = markerIcon
      }
      m[id].src = markerIconActive;
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.searchLink !== prevProps.searchLink){
      this.getRealEstates()
    }
  }

  handleScroll(id){
    const element = document.getElementById(id[0])
    if(window.innerWidth >= 767){
      element.scrollIntoView({behavior:"smooth"})
    }
    else{
      element.scrollIntoView()
      window.scrollBy(0, -80)
      const m = document.querySelectorAll(".leaflet-marker-icon")
      for(var i = 0; i < m.length; i++){
        m[i].src = markerIcon
      }
      m[id[1]].src = markerIconActive;
    }
  }
  render(){

    const settings = {
      dots: false,
      arrows:true,
      infinite: true,
      autoplay:true,
      autoplaySpeed: 3000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

    };

    const markers = this.state.realEstates.map((nekretnina, key) => {
      return(
        <Marker onClick={() => this.handleScroll([nekretnina._id, key])} id={key} position={nekretnina.lokacija.latlong} key={key} icon={image}/>
      )
    })

    const realEstatesRight = this.state.realEstates.map((nekretnina, key) => {
      return (

            <div className="small-property_on_map" id={nekretnina._id} key={nekretnina._id}>
              <div className="small-property_image property_image_on_map">
                <Link to={{pathname: "/nekretnina/" + nekretnina._id}}><img src={nekretnina.slika} /></Link>
                <div className="tag_offer property_tag"><a href="#">Offer</a></div>
              </div>
              <div className="property_body text-center">
                <div className="property_location">{nekretnina.lokacija.mjesto}</div>
                <div className="property_title title_size">
                  <IntersectionVisible  onShow={() => this.onShow(key)}>
                    <Link to={{pathname: "/nekretnina/" + nekretnina._id}}>{nekretnina.naziv}</Link>
                  </IntersectionVisible>
                </div>
                <div className="property_price">{nekretnina.cijenaKN + 'kn / €' + nekretnina.cijenaEUR}</div>
              </div>
              <div className="property_footer d-flex flex-row align-items-center justify-content-start">
                <div><div className="property_icon"><img src={icon1} /></div><span>{nekretnina.povrsina + 'm2'}</span></div>
                <div><div className="property_icon"><img src={icon2} /></div><span>{nekretnina.brojSoba}</span></div>
                <div><div className="property_icon"><img src={icon3} /></div><span>{nekretnina.brojKupatila}</span></div>
              </div>
            </div>
      )
    })

    return(this.state.loading)? (
      <Loading />
    )
    :
    (
      <div className="realEstates_container">
        <div className="realEstates_map_container">
          <Map center={[45.5526237,18.7154461]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {markers}
          </Map>
          <div className="on_map_search">
            <MapSearch />
          </div>
          <div className="on_map_title_container">
            <p className="on_map_title">{this.state.count} Properties Found</p>
          </div>
          <div className="realEstates_on_map">
        		<div className="container">
              <InfiniteScroll
                pageStart={0}
                loadMore={this.getNextPage}
                initialLoad={false}
                hasMore={this.state.current < this.state.pages}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={true}>
                  <div className="row">
                    {realEstatesRight}
                  </div>
              </InfiniteScroll>
        		</div>
        	</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    searchLink: state.searchLink
  }
}

export default connect(mapStateToProps)(Properties)
