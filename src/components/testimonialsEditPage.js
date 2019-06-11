import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import TestimonialsEdit from './testimonialsEdit'
import image from '../../public/images/login.jpg'

class TestimonialsEditPage extends React.Component{

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
        <TestimonialsEdit />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default TestimonialsEditPage
