import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import Properties from './properties'
import image from '../../public/images/properties.jpg'

class RealEstatesPage extends React.Component {
  componentDidMount(){
    window.scrollTo({
          top:"top",
          behavior: "smooth"
      });
  }


  render(){
    return (
      <div>
        <Home image={image} />
        <Properties />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default RealEstatesPage;
