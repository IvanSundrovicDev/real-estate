import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import LocationList from './locationList'
import image from '../../public/images/login.jpg'

class LocationListPage extends React.Component{

  componentDidMount(){
    window.scrollTo({
          top:"top",
          behavior: "smooth"
      });
  }

  render(){
    return(
      <div>
        <Home image={image} />
        <LocationList />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default LocationListPage
