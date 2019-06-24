import React from 'react';
import { NavLink, Link }  from "react-router-dom";
import logo from '../../public/images/logo.png'
import phoneImg from  '../../public/images/phone.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {reactLocalStorage} from 'reactjs-localstorage';

class Navigation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      width: "0%",
      shouldHide: true,
      id:''
    }
    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
    this.logout = this.logout.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
  }
  componentDidMount(){
    if(reactLocalStorage.get('userRealestate')){
      this.setState({shouldHide:false})
    }
  }

  logout(){
    reactLocalStorage.set('userRealestate', "");
  }

  onMouseOver(id){
    this.setState({open:true, id:id})
  }

  openNav(){
    this.setState({width:"100%"})
  }

  closeNav(){
    this.setState({width:"0%"})
  }

  render(){
    let navHeight= {
      width: this.state.width
    }

    return(
      <div  ref="top">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" onClick={this.openNav}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <div className="row full_width">
                <div className="col-md-4">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/o-nama"><p className="nav-link"onMouseOver={() => this.onMouseOver("buy")}>Buy</p></NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/nekretnine"><p className="nav-link"onMouseOver={() => this.onMouseOver("rent")}>Rent</p></NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/novosti"><p className="nav-link"onMouseOver={() => this.onMouseOver("sell")}>Sell</p></NavLink>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <NavLink exact to="/" className="navbar-brand logo" ><img src={logo}/></NavLink>
                </div>
                <div className="col-md-4">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/o-nama"><p className="nav-link">Sign In</p></NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/novosti"><p className="nav-link">Join</p></NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/novosti"><p className="nav-link">Help</p></NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      {/*  <div className={this.state.open ? 'additional' : 'hidden'} onMouseLeave={() => this.setState({open:false, id:null})}>
          <div className="container">
            <div className={this.state.id === "buy" ? 'additional_content' : 'hidden'}>
              <div className="list-row">
                <li>Homes for sale</li>
                <li>New contruction</li>
                <li>Recent home sales</li>
                <li>Apartments up to $100 000</li>
              </div>
            </div>
            <div className={this.state.id === "rent" ? 'additional_content' : 'hidden'}>
            </div>
            <div className={this.state.id === "sell" ? 'additional_content' : 'hidden'}>
            </div>
          </div>
        </div>
        */}
        <div id="myNav" style={navHeight} className="overlay">

          <a href="" className="closebtn" onClick={this.closeNav}>&times;</a>

          <div className="overlay-content">
            <a className="menu-logo"><img src={logo}/></a>
            <NavLink exact to="/" onClick={this.closeNav}><p className="menu-link">Home</p></NavLink>
            <NavLink to="/o-nama" onClick={this.closeNav}><p className="menu-link">About</p></NavLink>
            <NavLink to="/nekretnine" onClick={this.closeNav}><p className="menu-link">Real Estates</p></NavLink>
            <NavLink to="/novosti" onClick={this.closeNav}><p className="menu-link">News</p></NavLink>
            <NavLink to="/kontakt" onClick={this.closeNav}><p className="menu-link">Contact</p></NavLink>
            <a className="phone-num phone_mobile" href="tel:+38531200742">Tel: +385 31 200 742</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation
