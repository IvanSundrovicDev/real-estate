import React from 'react'

const Testimonials = (props) => (
  <div>
    <div className="testimonials">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="section_title_black">What our clients say about us</div>
          </div>
        </div>
        <div className="row testimonials_row">

          <div className="col-lg-4 testimonial_col">
            <div className="testimonial">
              <div className="testimonial_title">{props.klijenti[0].naslov}</div>
              <div className="testimonial_text">{props.klijenti[0].sadrzaj}</div>
              <div className="testimonial_author">{props.klijenti[0].ime}</div>
            </div>
          </div>

          <div className="col-lg-4 testimonial_col">
            <div className="testimonial">
              <div className="testimonial_title">{props.klijenti[1].naslov}</div>
              <div className="testimonial_text">{props.klijenti[1].sadrzaj}</div>
              <div className="testimonial_author">{props.klijenti[1].ime}</div>
            </div>
          </div>

          <div className="col-lg-4 testimonial_col">
            <div className="testimonial">
              <div className="testimonial_title">{props.klijenti[2].naslov}</div>
              <div className="testimonial_text">{props.klijenti[2].sadrzaj}</div>
              <div className="testimonial_author">{props.klijenti[2].ime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

)

export default Testimonials
