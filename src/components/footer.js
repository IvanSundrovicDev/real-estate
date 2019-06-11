import React from 'react'
import logo from '../../public/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => (
  <div>
    <footer className="footer">
      <div className="footer_main">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6 footer_col">
              <div className="footer_nav">
                <h3>Fast links</h3>
                <ul className="irl-useful-links">
                  <li><a href="#"> Apartments up to 60.000 €</a></li>
                  <li><a href="#"> Apartments up to 80.000 €</a></li>
                  <li><a href="#"> Apartments up to 100.000 €</a></li>
                  <li><a href="#"> Apartments with infield</a></li>
                  <li><a href="#"> Studios and 1S</a></li>
                  <li><a href="#"> 1S+DB and 2SKL</a></li>
                  <li><a href="#"> 2S+DB and 3SKL</a></li>
                  <li><a href="#"> 3S+DB and larger</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 footer_col">
              <div className="footer_nav">
                <h3>Usefull information</h3>
                <ul>
                  <li><a href="#">Terms of business</a></li>
                  <li><a href="#">Personal data protection policy</a></li>
                  <li><a href="#">Cookie policy</a></li>
                  <li><a href="#">Data processing information</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 footer_col footer_top">
              <div className="footer_nav">
                <h3>Contact</h3>
                <ul>
                  <li><a href="#">Trg slobode 8 31000 <br /> Osijek</a></li>
                  <li><a href="#">+385 (0)31 200 742</a></li>
                  <li><a href="#">info@tasman-nekretnine.hr</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 footer_top">
              <div className="footer_nav">
                <div className="footer_logo"><a href="#"><img src={logo} alt="" /></a></div>
                <div className="footer_about">
                  <div className="footer_about_text">Responsible, patiently and unobtrusively we look for the best solutions for you!</div>
                </div>
                <p className="social_icons">
                  <a className="irl-social-f" href="https://www.facebook.com" target="_blank" title="Facebook"><FontAwesomeIcon className="fa" icon={["fab", "facebook"]} /></a>
                  <a className="irl-social-g" href="https://www.instagram.com" title="Instagram" target="_blank"><FontAwesomeIcon className="fa" icon={["fab", "instagram"]} /></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2019 Tasman-Nekretine
      </div>
    </footer>
  </div>
)

export default Footer
