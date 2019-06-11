import React from 'react';
import HeadSearch from './headSearch'
import { Parallax, Background } from 'react-parallax';

class Home extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div>
        <Parallax strength={200}>
          <Background className="custom-bg">
            <img className="parallax-img" src={this.props.image}/>
          </Background>
          <div className="home">
          	<div className="home_container">
          		<div className="container">
          			<div className="row">
          				<div className="col">
          					<div className="home_content d-flex flex-row align-items-end justify-content-start">
          						<div className="home_title">Search real estates</div>
          					</div>
          				</div>
          			</div>
                <HeadSearch />
        			</div>
        		</div>
        	</div>
        </Parallax>
      </div>
    )
  }
}

export default Home
