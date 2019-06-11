import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import News from './news'
import image from '../../public/images/news.jpg'

class NewsPage extends React.Component{

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
        <News />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}


export default NewsPage
