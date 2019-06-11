import React from 'react'
import Search from './inPageSearch'
import axios from 'axios'
import Config from '../config'
import { Link } from 'react-router-dom'
import MiniArticle from './miniArticle'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {storeNewsSearch} from '../redux/actions'

class Sidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      news:[],
      query:''
    }
    this.getLatestNews = this.getLatestNews.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  getLatestNews(){
    axios.get(Config.news + '/most_read')
      .then(res => {
        const searchResult = res.data;
        this.setState({news:searchResult})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getLatestNews()
  }

  handleInputChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  handleClick(){
      this.props.storeNewsSearch(Config.news + '/search?term=' + this.state.query)
  }

  render(){

    const latestPosts = this.state.news.map((article) => {
      const date = article.createdAt
      const d = date.split('T')[0]
      const dd = d.split('-')
      return (
        <MiniArticle date={dd} article={article} key={article._id}/>
      )
    })

    return(
      <div className="sidebar">
        <div className="sidebar_top_search">
          <form action="#" className="sidebar_top_search_form">
            <input type="text" className="sidebar_top_search_input" placeholder="Pretraži" required="required" onChange={this.handleInputChange} />
            <Link to="/novosti">
              <button className="sidebar_top_search_button" onClick={this.handleClick}><i className="fa fa-search" aria-hidden="true"></i></button>
            </Link>
          </form>
        </div>

        <div className="sidebar_latest">
          <div className="sidebar_title">Latest posts</div>
          <div className="sidebar_latest_posts">
            {latestPosts}
          </div>
        </div>
        <div className="sidebar_search sticky">
        <div className="sidebar_search_title title_sticky">Search real estates</div>
          <div className="sidebar_search_form_container">
            <Search />
          </div>
        </div>
      </div>
    )
  }
}

function matchDispatchToProps (dispatch){
  return bindActionCreators({storeNewsSearch: storeNewsSearch}, dispatch)
}

export default connect(null, matchDispatchToProps)(Sidebar)
