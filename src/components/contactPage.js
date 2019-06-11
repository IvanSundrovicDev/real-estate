import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import Contact from './contact'
import image from '../../public/images/contact.jpg'


class ContactPage extends React.Component{

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
        <Contact />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default ContactPage;
