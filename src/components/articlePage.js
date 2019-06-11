import React from 'react';
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import Article from './article'
import image from '../../public/images/about.jpg'


class ArticlePage extends React.Component{
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
        <Article id={this.props.match.params.id} />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default ArticlePage
