import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import Login from './login'
import image from '../../public/images/login.jpg'



class LoginPage extends React.Component{
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
        <Login />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default LoginPage
