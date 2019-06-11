import React from 'react';
import Slider from "react-slick";
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'


class OwlCarousel extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render(){

    const images = this.props.images;

    const slides = images.length+1 < 3 ? 3 : images.length-1
    console.log(slides);

    const settings = {
      dots: false,
      arrows:false,
      infinite: true,
      autoplay:true,
      autoplaySpeed: 3000,
      speed: 500,
      slidesToShow: slides,
      slidesToScroll: 1
    };

    const { photoIndex, isOpen } = this.state

    return(

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="property_image"><a onClick={() => this.setState({ isOpen: true, photoIndex:0 })}><img src={images[0].path} /></a></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 margin_bottom">
            <Slider {...settings}>

              {images.map((image, index) =>{
                if(index !== 0){
                  return <div className="img_size" key={image.public_id}><a onClick={() => this.setState({ isOpen: true, photoIndex:index})}><img src={image.path} /></a></div>
                }
              })}

            </Slider>
          </div>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].path}
            nextSrc={images[(photoIndex + 1) % images.length].path}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].path}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}

      </div>
    )
  }
}

export default OwlCarousel
