import React from 'react';
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import About from './about'
import image from '../../public/images/about.jpg'


class AboutPage extends React.Component{
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
        <About />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AboutPage
