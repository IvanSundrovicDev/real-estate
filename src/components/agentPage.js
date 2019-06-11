import React from 'react'
import Home from './home'
import Newsletter from './newsletter'
import Footer from './footer'
import Agent from './agent'
import image from '../../public/images/agent.jpg'


class AgentPage extends React.Component {
  componentDidMount(){
    window.scrollTo({
          top:"top",
          behavior: "smooth"
      });
  }

  render(){
    return(
      <div className="agent">
        <Home image={image} />
        <Agent id={this.props.match.params.id} />
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default AgentPage
