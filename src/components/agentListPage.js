import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import AgentList from './agentList.js'
import image from '../../public/images/login.jpg'

class AgentListPage extends React.Component{

  componentDidMount(){
    window.scrollTo({
          top:"top",
          behavior: "smooth"
      });
  }

  render(){
    return(
      <div>
        <Home image={image} />
        <AgentList />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AgentListPage
