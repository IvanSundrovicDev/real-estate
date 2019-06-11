import React from 'react'
import RealEstatesWithMap from './realEstatesWithMap'
import image from '../../public/images/properties.jpg'

class RealEstatesWithMapPage extends React.Component {
  componentDidMount(){
    window.scrollTo({
          top:"top",
          behavior: "smooth"
      });
  }


  render(){
    return (
      <div>
        <RealEstatesWithMap />
      </div>
    )
  }
}

export default RealEstatesWithMapPage;
