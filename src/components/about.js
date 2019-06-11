import React from 'react'
import CountUp from 'react-countup';
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import image from '../../public/images/home_slider_1.jpg'
import image2 from '../../public/images/city_2.jpg'
import image3 from '../../public/images/city_3.jpg'
import image4 from '../../public/images/city_4.jpg'
import image5 from '../../public/images/city_5.jpg'
import image6 from '../../public/images/city_6.jpg'
import image7 from '../../public/images/city_7.jpg'
import milestone1 from '../../public/images/milestones_1.png'
import milestone2 from '../../public/images/milestones_2.png'
import milestone3 from '../../public/images/milestones_3.png'
import milestone4 from '../../public/images/milestones_4.png'

const images = [image, image2, image3, image4, image5, image6, image7];

class About extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render(){

    const { photoIndex, isOpen } = this.state;

    return(
      <div>
        <div className="about">
      		<div className="container">
      			<div className="row">
      				<div className="col-lg-12">
      					<div className="about_content">
      						<div className="about_title">Few words about us</div>
      						<div className="about_subtitle">Vektor nekretnine</div>
      						<div className="about_text">
      							<p>Agency TASMAN-NEKRETNINE d.o.o. with headquarters in Osijeku Trg slobode 8, the follower of the company TASMAN-TRADE d.o.o. founded in 1992.
      								<br />
      								Company owns CERTIFICATE OF PROFESSIONAL PERFORMANCE FOR TRADING REAL ESTATES published by HGK, and we are members of associations for trading real estates(sector of trade for HGK).
      								<br />
      							  Main activities of this agency are trading real estates and renting our own real estates(office and residential area). We are middleman for selling, buying, leasing and renting office and residential area.
      							</p>
      							<p>
      								We present and advertise all real estates that we offer in every major local news paper, and on out webpage( www.tasman-nekretnine) and other sites specialised in presenting and advertising real estates.
      								<br />
      								Company TASMAN-NEKRETNINE d.o.o. in cooperation with business parnets also provides services of projecting, grading and obtaining building documentation. Contact our professional and certified team to find ideal solution for you.
      							</p>
      							<p>
      								Company TASMAN-NEKRETNINE d.o.o. today is one of leading agencies in Osijek area. We are defined by one of the largest number of real estates for sale, placing them on the market via most modern tools, fast, high-quality and complete service, individual access and flexibility.
      							</p>
      						</div>
      					</div>
      				</div>
      				<div className="col-lg-12 img_padding_top">
      					<div className="container">
      						<div className="row">
      							<div className="col-xl-6 col-lg-12 large_img_padding">
      								<div className="about_image"><a onClick={() => this.setState({ isOpen: true, photoIndex:0 })}><img src={image} /></a></div>
      							</div>
      							<div className="col-xl-6 col-lg-12">
      								<div className="row">
      									<div className="col-sm-6 col-lg-4 img_padding">
      										<div className="about_image "><a onClick={() => this.setState({ isOpen: true, photoIndex:1 })}><img className="image_adapt" src={image2} /></a></div>
      									</div>
      									<div className="col-sm-6 col-lg-4 img_padding">
      										<div className="about_image "><a onClick={() => this.setState({ isOpen: true, photoIndex:2 })}><img className="image_adapt" src={image3} /></a></div>
      									</div>
      									<div className="col-sm-6 col-lg-4 img_padding">
      										<div className="about_image "><a onClick={() => this.setState({ isOpen: true, photoIndex:3 })}><img className="image_adapt" src={image4} /></a></div>
      									</div>
      									<div className="col-sm-6 col-lg-4 img_padding">
      										<div className="about_image "><a onClick={() => this.setState({ isOpen: true, photoIndex:4 })}><img className="image_adapt" src={image5} /></a></div>
      									</div>
      									<div className="col-sm-6 col-lg-4 img_padding">
      										<div className="about_image "><a onClick={() => this.setState({ isOpen: true, photoIndex:5 })}><img className="image_adapt" src={image6} /></a></div>
      									</div>
      									<div className="col-sm-6 col-lg-4 img_padding">
      										<div className="about_image "><a onClick={() => this.setState({ isOpen: true, photoIndex:6 })}><img className="image_adapt" src={image7}/></a></div>
      									</div>

      								</div>
      							</div>
      						</div>
      					</div>
      				</div>
      			</div>

            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
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

      			<div className="row milestones_row">

      				<div className="col-lg-3 milestone_col">
      					<div className="milestone d-flex flex-row align-items-center justify-content-start">
      						<div className="milestone_icon d-flex flex-column align-items-center justify-content-center"><img src={milestone1}/></div>
      						<div className="milestone_content">
      							<div className="milestone_counter"><CountUp end={167} duration={7}/></div>
      							<div className="milestone_text">Real Estates Sold</div>
      						</div>
      					</div>
      				</div>

      				<div className="col-lg-3 milestone_col">
      					<div className="milestone d-flex flex-row align-items-center justify-content-start">
      						<div className="milestone_icon d-flex flex-column align-items-center justify-content-center"><img src={milestone2}/></div>
      						<div className="milestone_content">
      							<div className="milestone_counter"><CountUp end={57} duration={7}/></div>
      							<div className="milestone_text">Pleased Clients</div>
      						</div>
      					</div>
      				</div>

      				<div className="col-lg-3 milestone_col">
      					<div className="milestone d-flex flex-row align-items-center justify-content-start">
      						<div className="milestone_icon d-flex flex-column align-items-center justify-content-center"><img src={milestone3}/></div>
      						<div className="milestone_content">
      							<div className="milestone_counter"><CountUp end={34} duration={7}/></div>
      							<div className="milestone_text">Buildings Sold</div>
      						</div>
      					</div>
      				</div>

      				<div className="col-lg-3 milestone_col">
      					<div className="milestone d-flex flex-row align-items-center justify-content-start">
      						<div className="milestone_icon d-flex flex-column align-items-center justify-content-center"><img src={milestone4}/></div>
      						<div className="milestone_content">
      							<div className="milestone_counter"><CountUp end={8} duration={7}/></div>
      							<div className="milestone_text">Prizes Won</div>
      						</div>
      					</div>
      				</div>
      			</div>
      		</div>
        </div>
      </div>
    )
  }
}

export default About
