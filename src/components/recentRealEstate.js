import React from 'react'
import { Link } from 'react-router-dom'
import icon1 from '../../public/images/icon_1.png'
import icon2 from '../../public/images/icon_2.png'
import icon3 from '../../public/images/icon_3.png'
const RecentRealEstate = (props) => (

  <div className="owl-item" key={props.nekretnina._id}>
    <div className="recent_item">
      <div className="recent_item_inner">
        <div className="recent_item_image">
          <Link className="recent_item_image" to={{pathname: "/nekretnina/" + props.nekretnina._id}}><img src={props.nekretnina.slika}/></Link>
          <div className="tag_featured property_tag"><a href="#">Offer</a></div>
        </div>
        <div className="recent_item_body text-center">
          <div className="recent_item_location">{props.nekretnina.lokacija.mjesto}</div>
          <div className="recent_item_title">
            <Link to={{pathname: "/nekretnina/" + props.nekretnina._id}}>{props.nekretnina.naziv}</Link></div>
          <div className="recent_item_price">{props.nekretnina.cijenaKN + 'kn / €' + props.nekretnina.cijenaEUR}</div>
        </div>
        <div className="recent_item_footer d-flex flex-row align-items-center justify-content-start">
          <div><div className="recent_icon"><img src={icon1} /></div><span>{props.nekretnina.povrsina + 'm2'}</span></div>
          <div><div className="recent_icon"><img src={icon2} /></div><span>{props.nekretnina.brojSoba}</span></div>
          <div><div className="recent_icon"><img src={icon3} /></div><span>{props.nekretnina.brojKupatila}</span></div>
        </div>
      </div>
    </div>
  </div>

)

export default RecentRealEstate
