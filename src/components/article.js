import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './sidebar'
import axios from 'axios'
import Config from '../config'
import {reactLocalStorage} from 'reactjs-localstorage';


class Article extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      article:{
        createdAt:'',
        user:{
        }
      }
    }
    this.getArticle = this.getArticle.bind(this)
    this.getLocalStorage = this.getLocalStorage.bind(this)
    this.sendViewed = this.sendViewed.bind(this)
    this.setLocalStorage = this.setLocalStorage.bind(this)
    this.storageInit = this.storageInit.bind(this)

  }

  componentDidMount(){
    this.getArticle()
  }

  componentDidUpdate(){
    this.storageInit();
    this.getLocalStorage()
  }

  storageInit(){
    if(reactLocalStorage.get('storage') === 'undefined' || reactLocalStorage.get('storage') === undefined){
      reactLocalStorage.setObject('storage', {newsId: [this.props.id]});
    }
  }

  sendViewed(){
    axios.post(`${Config.news}/${this.props.id}/read`, {
      id: this.props.id
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getLocalStorage(){
    const id = this.props.id;
    const parsedStorage = JSON.parse(reactLocalStorage.get('storage'));
    if(!parsedStorage.hasOwnProperty('newsId')){
      reactLocalStorage.setObject('storage', {newsId: [id]})
    }
    else{
      const found = parsedStorage.newsId.find(function(element) {
        if(element === id){
          return true
        }
      });
      if(!found){
        parsedStorage.newsId.push(id)
        reactLocalStorage.setObject('storage', {newsId: parsedStorage.newsId})
        this.sendViewed();
      }
    }
  }

  setLocalStorage(){
    const id = this.props.id
    const visitedArticles = JSON.parse(reactLocalStorage.get('storage'))
    const found = visitedArticles.find(function(element) {
      if(element === id){
        return true
      }
    });
    if(!found){
      reactLocalStorage.setObject('storage', {newsId: visitedArticles.push(id)})
    }
  }

  getArticle(){
    axios.get(Config.news + "/" + this.props.id)
      .then(res => {
        const searchResult = res.data;
        this.setState({article: searchResult})
      })
      .catch(err => console.log(err))
  }

  render(){
    const article = this.state.article
    const date = article.createdAt
    const d = date.split('T')[0]
    const dd = d.split('-')
    return(
      <div>
        <div className="news">
          <div className="container">
            <div className="row">

              <div className="col-lg-8">
                <div className="news_posts">

                  <div className="news_post">
                    <div className="news_post_title_container d-flex flex-row align-items-center justify-content-start">
                      <div><div className="news_post_date_container d-flex flex-column align-items-center justify-content-center">
                        <div className="news_post_day">{dd[2]}.</div>
                        <div className="news_post_month">{dd[1]}</div>
                        <div className="news_post_year">{dd[0]}</div>
                      </div></div>
                      <div className="news_post_title_content">
                        <div className="news_post_title"><p>{article.title}</p></div>
                        <div className="news_post_info">
                          <ul>
                            <li><Link to={{ pathname: '/agent/' +  article.user._id }}><p>Od {`${article.user.firstName} ${article.user.lastName}`}</p></Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="news_post_image"><img src={article.photo} /></div>
                    <div className="news_post_text">
                      <p>{article.text}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Article
