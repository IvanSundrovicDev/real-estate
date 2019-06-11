import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import RealEstate from './realEstate'
import Config from '../config'
import { Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './loading'

class AgentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      agents:[],
      loading:true
    }
    this.getAgents = this.getAgents.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  getAgents(){
    axios.get("https://nekretninko.herokuapp.com/api/v1.0/users")
      .then(res => {
        console.log(res.data);
        this.setState({agents:res.data, loading:false})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    axios.get("https://nekretninko.herokuapp.com/api/v1.0/users"  + "?page=" + Number(this.state.current + 1))
      .then(res => {
        const searchResult = res.data;
        const updatedNews = this.state.news.concat(searchResult.news)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, agents:updatedNews})
      })
      .catch(err => console.log(err))
  }

  handleRedirect(id){
    this.setState({navigate:id})
  }

  componentDidMount(){
    this.getAgents()
  }


  render(){

    if(this.state.navigate){
      return <Redirect to={`/agenti/edit/${this.state.navigate}`} />
    }

    const news = this.state.agents.map((agent) => {
      return (
        <tr key={agent._id} className="hover_pointer" onClick={() => this.handleRedirect(agent._id)}>
          <th scope="row">{agent.role}</th>
          <td>{agent.firstName}</td>
          <td>{agent.email}</td>
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
      					<div className="about_title">Agenti</div>
                <Link to={'/agenti/dodaj'}><button type="button" className="btn btn-primary button_margin">Dodaj Agenta</button></Link>
      				</div>
      			</div>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Tip Korisnika</th>
                  <th scope="col">Ime</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {news}
              </tbody>
            </table>
      		</div>
      	</div>
      </div>
    )
  }
}

export default AgentList
