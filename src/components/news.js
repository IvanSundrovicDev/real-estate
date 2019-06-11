import React from 'react'
import Sidebar from './sidebar'
import NewsArticle from './newsArticle'
import { connect } from 'react-redux'
import axios from 'axios'
import Config from '../config'
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './loading'

class News extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pages:1,
      current:1,
      count:0,
      news:[],
      loading:true
    }
    this.getNews = this.getNews.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
  }

  getNews(){
    let searchLink;
    if(!this.props.newsLink){
      searchLink = Config.news
    }
    else{
      searchLink = this.props.newsLink
    }
    axios.get(searchLink)
      .then(res => {
        const searchResult = res.data;
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, news:searchResult.news, loading:false})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    let nextLink;
    if(!this.props.newsLink){
      nextLink = Config.news  + "?page=" + Number(this.state.current + 1)
    }
    else{
      nextLink = this.props.newsLink + "&page=" + Number(this.state.current + 1)
    }
    axios.get(nextLink)
      .then(res => {
        const searchResult = res.data;
        const updatedNews = this.state.news.concat(searchResult.news)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, news:updatedNews})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getNews()
  }

  componentDidUpdate(prevProps){
    if(this.props.newsLink !== prevProps.newsLink){
      this.getNews();
    }
  }

  render(){

    const news = this.state.news.map((article) => {
      const date = article.createdAt
      const d = date.split('T')[0]
      const dd = d.split('-')
      return (
        <NewsArticle date={dd} article={article} key={article._id}/>
      )
    })

    return(this.state.loading)? (
      <Loading />
    )
    :
    (
      <div>
        <div className="news">
          <div className="container">
            <div className="row">

              <div className="col-lg-8">
                <div className="news_posts">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getNextPage}
                    initialLoad={false}
                    hasMore={this.state.current < this.state.pages}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={true}>
                      <div className="row">
                        {news}
                      </div>
                  </InfiniteScroll>
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

function mapStateToProps (state) {
  return {
    newsLink: state.newsLink
  }
}

export default connect(mapStateToProps)(News)
