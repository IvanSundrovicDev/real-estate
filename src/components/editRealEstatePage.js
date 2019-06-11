import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import EditRealEstate from './editRealEstate'
import image from '../../public/images/login.jpg'

class EditRealEstatePage extends React.Component{
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
        <EditRealEstate id={this.props.match.params.id} />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default EditRealEstatePage
