import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import ListOfRealEstates from './listOfRealEstates'
import image from '../../public/images/login.jpg'



class ListPage extends React.Component{
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
        <ListOfRealEstates />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default ListPage
