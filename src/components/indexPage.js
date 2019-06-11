import React from 'react'
import IndexHome from './indexHome'
import Newsletter from './newsletter'
import Footer from './footer'
import RecentRealEstates from './recentRealEstates'
import Testimonials from './testimonials'
import Loading from './loading'

import axios from 'axios'


class IndexPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      pageData:{}
    }
    this.getIndexInfo = this.getIndexInfo.bind(this)
  }
  componentDidMount(){
    this.getIndexInfo()
    window.scrollTo({
          top:"top",
          behavior: "smooth"
      });
  }

  getIndexInfo(){
    axios.get('https://nekretninko.herokuapp.com/api/v1.0/home')
    .then((response) => {
      this.setState({pageData:response.data, loading:false})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){

    return (this.state.loading)? (
      <Loading />
    )
    :
    (
      <div>
        <IndexHome izdvojena={this.state.pageData.izdvojena}/>
        <RecentRealEstates nekretnine={this.state.pageData.nedavnoDodano} />
        <Testimonials klijenti={this.state.pageData.klijenti} />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default IndexPage
