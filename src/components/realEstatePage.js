import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import Property from './property'
import image from '../../public/images/properties.jpg'


export default class Nekretina extends React.Component {
  constructor(props){
    super(props)
  }
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
        <Property id={this.props.match.params.id}/>
        <Newsletter />
        <Footer />
      </div>
    )
  }
}
