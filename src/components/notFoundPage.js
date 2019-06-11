import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import NotFound from './notFound'
import image from '../../public/images/login.jpg'

class NotFoundPage extends React.Component{

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
        <NotFound />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default NotFoundPage
