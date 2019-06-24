
import React from 'react';
import image from '../../public/images/home_slider_1.jpg'
import { Parallax, Background } from 'react-parallax';
import HeadSearch from './headSearch'


class IndexHome extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div>
        <Parallax strength={200}>
          <Background>
            <img className="index-parallax-img" src={image}/>
          </Background>
          <div className="index-home">
            <div className="slide_container">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="search_home">
                      <h1 className="home_title">Find your new home</h1>
                      <h3 className="home_subtitle">We'll help you find home of your dreams</h3>
                    </div>
                  </div>
                </div>
              </div>
              <HeadSearch/>
            </div>
          </div>
        </Parallax>
      </div>
    )
  }
}

export default IndexHome
