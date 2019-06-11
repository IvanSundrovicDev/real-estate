import React from 'react';
import Search from './inPageSearch'
import RealEstate from './realEstate'
import ContactAgent from './contactAgent'
import Config from '../config'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import realtor from '../../public/images/sidebar_realtor.jpg'

class Agent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      realEstates:[],
      pages:1,
      current:1,
      count:0,
      agent:{}
    }
    this.getAgentInfo = this.getAgentInfo.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
  }


  componentDidMount(){
    this.getAgentInfo()
  }

  getAgentInfo(){
    axios.get(`${Config.adress}/agent/${this.props.id}`)
      .then(res => {
        const searchResult = res.data;
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:searchResult.realEstates, agent:searchResult.agent})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    const nextPageAdress = Config.adress + "/agent/" + this.props.id + "?page=" + Number(this.state.current + 1)
    axios.get(nextPageAdress)
      .then(res => {
        const searchResult = res.data;
        const updatedRealEstates = this.state.realEstates.concat(searchResult.realEstates)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:updatedRealEstates})
      })
      .catch(err => console.log(err))
  }

  render(){
    const agent = this.state.agent
    const realEstates = this.state.realEstates.map((nekretnina) => {
      return (
        <div className="col-lg-6 property_col" key={nekretnina._id}>
          <RealEstate nekretnina={nekretnina} />
        </div>
      )
    })

    return(
      <div className="agent">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar_realtor">
                  <div className="sidebar_realtor_image"><img src={realtor}/></div>
                  <div className="sidebar_realtor_body text-center">
                    <div className="sidebar_realtor_title"><a href="#">{`${agent.firstName} ${agent.lastName}`}</a></div>
                    <div className="sidebar_realtor_subtitle">{agent.email}</div>
                    <div className="sidebar_realtor_phone">+385 99 316 1907</div>
                    <div className="sidebar_realtor_phone">+385 51 563 800</div>
                  </div>
                  <ContactAgent id={this.props.id} />
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="agent_title">{this.state.count} Real Estates Found</div>
              <div className="row properties_row">

                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.getNextPage}
                  initialLoad={false}
                  hasMore={this.state.current < this.state.pages}
                  loader={<div className="loader" key={0}>Loading ...</div>}
                  useWindow={true}>
                    <div className="row properties_row">
                      {realEstates}
                    </div>
                </InfiniteScroll>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Agent
