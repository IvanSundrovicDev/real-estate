import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import AddRealEstate from './addRealEstate'
import image from '../../public/images/login.jpg'

class AddRealEstatePage extends React.Component{

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
        <AddRealEstate />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AddRealEstatePage
