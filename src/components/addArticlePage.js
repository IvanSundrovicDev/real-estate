import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import AddArticle from './addArticle'
import image from '../../public/images/login.jpg'

class AddArticlePage extends React.Component{

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
        <AddArticle />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AddArticlePage
