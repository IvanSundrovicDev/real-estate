import React from 'react'
import { Link } from 'react-router-dom'


const NewsArticle = (props) =>(

  <div className="news_post">
    <div className="news_post_title_container d-flex flex-row align-items-center justify-content-start">
      <div><div className="news_post_date_container d-flex flex-column align-items-center justify-content-center">
        <div className="news_post_day">{props.date[2]}.</div>
        <div className="news_post_month">{props.date[1]}.</div>
        <div className="news_post_year">{props.date[0]}.</div>
      </div></div>
      <div className="news_post_title_content">
        <div className="news_post_title"><Link to={{ pathname: '/novost/' + props.article._id }}><p>{props.article.title}</p></Link></div>
        <div className="news_post_info">
          <ul>
            <li><Link to={{ pathname: '/agent/' + props.article.user._id }}><p>Od {`${props.article.user.firstName} ${props.article.user.lastName}`}</p></Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="news_post_image"><img src={props.article.photo}/></div>
    <div className="news_post_text">
      <p>{props.article.text}</p>
    </div>
  </div>

)

export default NewsArticle
