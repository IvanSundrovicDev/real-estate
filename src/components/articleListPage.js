import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import ArticleList from './articleList.js'
import image from '../../public/images/login.jpg'

class ArticleListPage extends React.Component{

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
        <ArticleList />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default ArticleListPage
