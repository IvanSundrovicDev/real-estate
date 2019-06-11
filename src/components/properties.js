import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import RealEstate from './realEstate'
import Config from '../config'
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './loading'

class Properties extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pages:1,
      current:1,
      count:0,
      realEstates:[],
      loading:true
    }
    this.getRealEstates = this.getRealEstates.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
  }

  getRealEstates(){
    let searchLink;
    if(!this.props.searchLink){
      searchLink = Config.adress
    }
    else{
      searchLink = this.props.searchLink
    }
    axios.get(searchLink)
      .then(res => {
        const searchResult = res.data;
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:searchResult.realEstates, loading:false})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    let nextLink;
    if(!this.props.searchLink){
      nextLink = Config.adress  + "?page=" + Number(this.state.current + 1)
    }
    else{
      nextLink = this.props.searchLink + "&page=" + Number(this.state.current + 1)
    }
    axios.get(nextLink)
      .then(res => {
        const searchResult = res.data;
        const updatedRealEstates = this.state.realEstates.concat(searchResult.realEstates)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:updatedRealEstates})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getRealEstates()
  }

  componentDidUpdate(prevProps){
    if(this.props.searchLink !== prevProps.searchLink){
      this.getRealEstates()
    }
  }

  render(){

    const realEstates = this.state.realEstates.map((nekretnina) => {
      return (
        <div className="col-xl-4 col-lg-6 property_col" key={nekretnina._id}>
          <RealEstate nekretnina={nekretnina} />
        </div>
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
      					<div className="about_title">{this.state.count} Nekretina Pronađeno</div>
      				</div>
      			</div>
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
    )
  }
}

function mapStateToProps (state) {
  return {
    searchLink: state.searchLink
  }
}

export default connect(mapStateToProps)(Properties)
