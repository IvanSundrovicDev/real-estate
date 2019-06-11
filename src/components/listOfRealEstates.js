import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import RealEstate from './realEstate'
import Config from '../config'
import { Redirect } from 'react-router-dom';
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
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  getRealEstates(){
    axios.get(Config.adress)
      .then(res => {
        const searchResult = res.data;
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:searchResult.realEstates, loading:false})
      })
      .catch(err => console.log(err))
  }

  getNextPage(){
    axios.get(Config.adress  + "?page=" + Number(this.state.current + 1))
      .then(res => {
        const searchResult = res.data;
        const updatedRealEstates = this.state.realEstates.concat(searchResult.realEstates)
        this.setState({pages:searchResult.pages, current:searchResult.current, count:searchResult.count, realEstates:updatedRealEstates})
      })
      .catch(err => console.log(err))
  }

  handleRedirect(id){
    this.setState({navigate:id})
  }

  componentDidMount(){
    this.getRealEstates()
  }


  render(){

    if(this.state.navigate){
      return <Redirect to={`/nekretnine/edit/${this.state.navigate}`} />
    }

    const realEstates = this.state.realEstates.map((nekretnina) => {
      return (
        <tr key={nekretnina._id} className="hover_pointer" onClick={() => this.handleRedirect(nekretnina._id)}>
          <th scope="row">{nekretnina.sifra}</th>
          <td>{nekretnina.tip}</td>
          <td>{nekretnina.povrsina}</td>
          <td>{nekretnina.izdvojena.toString()}</td>
          <td>{nekretnina.lokacija.mjesto}</td>
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
      					<div className="about_title">{this.state.count} Nekretina</div>
                <Link to={'/nekretnine/dodaj'}><button type="button" className="btn btn-primary button_margin">Dodaj Nekretinu</button></Link>
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
                    <th scope="col">Šifra</th>
                    <th scope="col">Tip</th>
                    <th scope="col">Površina</th>
                    <th scope="col">Izdvojena</th>
                    <th scope="col">Lokacija</th>
                  </tr>
                </thead>
                <tbody>
                  {realEstates}
                </tbody>
              </table>
            </InfiniteScroll>
      		</div>
      	</div>
      </div>
    )
  }
}

export default Properties
