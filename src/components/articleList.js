import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import RealEstate from './realEstate'
import Config from '../config'
import { Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './loading'

class ArticleList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pages:1,
      current:1,
      count:0,
      news:[],
      loading:true
    }
    this.getNews = this.getNews.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  getNews(){
    axios.get(Config.news)
      .then(res => {
        const searchResult = res.data;
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, news:searchResult.news, loading:false})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    axios.get(Config.news  + "?page=" + Number(this.state.current + 1))
      .then(res => {
        const searchResult = res.data;
        const updatedNews = this.state.news.concat(searchResult.news)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, news:updatedNews})
      })
      .catch(err => console.log(err))
  }

  handleRedirect(id){
    this.setState({navigate:id})
  }

  componentDidMount(){
    this.getNews()
  }


  render(){

    if(this.state.navigate){
      return <Redirect to={`/novosti/edit/${this.state.navigate}`} />
    }

    const news = this.state.news.map((article) => {
      const date = article.createdAt
      const d = date.split('T')[0]
      return (
        <tr key={article._id} className="hover_pointer" onClick={() => this.handleRedirect(article._id)}>
          <th scope="row">{article.title}</th>
          <td>{`${article.user.firstName} ${article.user.lastName}`}</td>
          <td>{d}</td>
        </tr>
      )
    })

    return(this.state.loading)? (
      <Loading />
    )
    :
    (
      <div>
        <div className="properties">
      		<div className="container">
      			<div className="row">
      				<div className="col">
      					<div className="about_title">{this.state.count} Novosti</div>
                <Link to={'/novosti/dodaj'}><button type="button" className="btn btn-primary button_margin">Dodaj Novost</button></Link>
      				</div>
      			</div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getNextPage}
              initialLoad={false}
              hasMore={this.state.current < this.state.pages}
              loader={<div className="loader" key={0}>Loading ...</div>}
              useWindow={true}>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nalov</th>
                    <th scope="col">Dodao</th>
                    <th scope="col">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {news}
                </tbody>
              </table>
            </InfiniteScroll>
      		</div>
      	</div>
      </div>
    )
  }
}

export default ArticleList
