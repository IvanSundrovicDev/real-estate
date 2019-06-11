import RecentRealEstate from './recentRealEstate'
import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'

class RecentRealEstates extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    const settings = {
      dots: false,
      arrows:false,
      infinite: true,
      autoplay:true,
      autoplaySpeed: 3000,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
       {
         breakpoint: 1200,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 1,
           infinite: true,
         }
       },
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         }
       }
     ]
    };

    return(
      <div>
        <div className="recent">
          <div className="container recent-container">
            <div className="row">
              <div className="col">
                <div className="section_title">Recently Added</div>
                <div className="section_subtitle">Find home of your dreams</div>
              </div>
            </div>
            <div className="row recent_row">
              <div className="col">
                <div className="recent_slider_container">
                  <Slider {...settings}>

                    {this.props.nekretnine.map((nekretnina) => {
                      return <RecentRealEstate nekretnina={nekretnina} key={nekretnina._id} />
                    })}

                  </Slider>
                </div>
                <Link to="/nekretnine">
                  <div className="button recent_button"><p>See more</p></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecentRealEstates
