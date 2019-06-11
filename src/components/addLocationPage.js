import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import AddLocation from './addLocation'
import image from '../../public/images/login.jpg'

class AddLocationPage extends React.Component{

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
        <AddLocation />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AddLocationPage
