import React from 'react'
import { Link } from 'react-router-dom'

const MiniArticle = (props) => (

  <div className="latest_post d-flex flex-row align-items-start justify-content-start">

    <div><div className="latest_post_image"><img src={props.article.photo} /></div></div>
    <div className="latest_post_content">
      <div className="latest_post_date"><p>{`${props.date[2]}. ${props.date[1]}. ${props.date[0]}.`}</p></div>
      <div className="latest_post_title"><Link to={{ pathname: '/novost/' + props.article._id }}><p>{props.article.title}</p></Link></div>
      <div className="latest_post_author"><Link to={{ pathname: '/agent/' + props.article.user._id }}><p>Od {`${props.article.user.firstName} ${props.article.user.lastName}`}</p></Link></div>
    </div>
  </div>
)

export default MiniArticle
