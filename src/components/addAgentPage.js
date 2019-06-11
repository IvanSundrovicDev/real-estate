import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import AddAgent from './addAgent'
import image from '../../public/images/login.jpg'

class AddAgentPage extends React.Component{

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
        <AddAgent />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AddAgentPage
