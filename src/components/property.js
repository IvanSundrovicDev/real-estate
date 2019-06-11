import Search from './inPageSearch'
import React from 'react';
import { Link } from 'react-router-dom'
import OwlCarousel from './owlCarousel'
import Config from '../config'
import ContactAgent from './contactAgent'
import MapContainer from './map'
import Loading from './loading'
import axios from 'axios'
import realtor from '../../public/images/sidebar_realtor.jpg'
import room1 from '../../public/images/room_1.png'
import room2 from '../../public/images/room_2.png'
import room3 from '../../public/images/room_3.png'
import room4 from '../../public/images/room_4.png'
import room5 from '../../public/images/room_5.png'


class Property extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      realEstate:{
        agent:{},
        lokacija:{}
      },
      loading:true,
    }
    this.getRealEstate = this.getRealEstate.bind(this)
  }

  componentDidMount(){
    this.getRealEstate()
  }

  getRealEstate(){
    axios.get(`${Config.adress}/${this.props.id}`)
      .then(res => {
        const property = res.data;
        this.setState({realEstate: property, loading:false})
      })
      .catch(err => console.log(err))
  }

  render(){
    const property = this.state.realEstate
    return(this.state.loading)? (
      <Loading />
    )
    :
    (
      <div>
        <div className="intro">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="intro_content d-flex flex-lg-row flex-column align-items-start justify-content-start">
                  <div className="intro_title_container">
                    <div className="intro_title">{property.naziv}</div>
                    <div className="intro_tags">
                      <ul>

                        {property.dodatno.map((item, key) =>{
                          return <li key={key}><p>{item}</p></li>
                        })}

                      </ul>
                    </div>
                  </div>
                  <div className="intro_price_container ml-lg-auto d-flex flex-column align-items-start justify-content-center">
                    <div>For sale</div>
                    <div className="intro_price">{`€${property.cijenaEUR} / ${property.cijenaKN}`}kn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <OwlCarousel images={property.slike} />
          <div className="property">
          <div className="container">
            <div className="row">


              <div className="col-lg-4">
                <div className="sidebar">
                  <div className="sidebar_realtor">
                    <div className="sidebar_realtor_image"><img src={realtor} /></div>
                    <div className="sidebar_realtor_body text-center">
                      <div className="sidebar_realtor_title"><Link to={{pathname:"/agent/" + property.agent._id}}>{`${property.agent.firstName} ${property.agent.lastName}`}</Link></div>
                      <div className="sidebar_realtor_subtitle">{property.agent.email}</div>
                      <div className="sidebar_realtor_phone">+385 99 316 1907</div>
                      <div className="sidebar_realtor_phone">+385 51 563 800</div>
                      <div className="realtor_link"><Link to={{pathname:"/agent/" + property.agent._id}}>All listings of this agent</Link></div>
                    </div>
                  </div>
                  <ContactAgent />
                  <div className="sidebar_search_title">Search Real Estates</div>
                  <div className="sidebar_search">
                    <Search />
                  </div>

                </div>
              </div>


              <div className="col-lg-7 offset-lg-1">
                <div className="property_content">
                  <div className="property_icons">
                    <div className="property_title">Info</div>
                    <div className="property_rooms row">

                      <div className="property_room col">
                        <div className="property_room_title">Rooms</div>
                        <div className="property_room_content d-flex flex-row align-items-center justify-content-start">
                          <div className="room_icon"><img src={room1} /></div>
                          <div className="room_num">{property.brojSoba}</div>
                        </div>
                      </div>

                      <div className="property_room col">
                        <div className="property_room_title">Bathrooms</div>
                        <div className="property_room_content d-flex flex-row align-items-center justify-content-start">
                          <div className="room_icon"><img src={room2} /></div>
                          <div className="room_num">{property.brojKupatila}</div>
                        </div>
                      </div>

                      <div className="property_room col">
                        <div className="property_room_title">Area</div>
                        <div className="property_room_content d-flex flex-row align-items-center justify-content-start">
                          <div className="room_icon"><img src={room3} /></div>
                          <div className="room_num">{`${property.povrsina} m²`}</div>
                        </div>
                      </div>

                      <div className="property_room col">
                        <div className="property_room_title">Balcony</div>
                        <div className="property_room_content d-flex flex-row align-items-center justify-content-start">
                          <div className="room_icon"><img src={room4} /></div>
                          <div className="room_num">{property.brojBalkona}</div>
                        </div>
                      </div>

                      <div className="property_room col">
                        <div className="property_room_title">Garage</div>
                        <div className="property_room_content d-flex flex-row align-items-center justify-content-start">
                          <div className="room_icon"><img src={room5} /></div>
                          <div className="room_num">{property.brojGaraza}</div>
                        </div>
                      </div>

                    </div>
                  </div>


                  <div className="property_description">
                    <div className="property_title">Description</div>
                    <div className="property_text property_text_2">
                      <p>{property.opis}</p>
                    </div>
                  </div>


                  <div className="additional_details">
                    <div className="property_title">Additional info</div>
                    <div className="details_container">
                      <ul>
                        <li><span>Šifra objekta: </span>{property.sifra}</li>
                        <li><span>lokacija: </span>{property.lokacija.mjesto}</li>
                        <li><span>tip stana: </span>{property.tip}</li>
                      </ul>
                    </div>
                  </div>


                  <div className="property_map">
                    <div className="property_title">Real estate on a map</div>
                    <div className="property_map_container">

                      <MapContainer position={[45.5591595, 18.6760752]} />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Property
