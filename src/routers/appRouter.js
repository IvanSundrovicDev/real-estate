import React from 'react'
import { BrowserRouter as Router, Route,Switch}  from "react-router-dom";
import PrivateRoute from './privateRouter'
import PublicRoute from './publicRouter'
import Navigation from '../components/navbar'
import IndexPage from '../components/indexPage'
import AboutPage from '../components/aboutPage'
import RealEstatesPage from '../components/realEstatesPage'
import RealEstatesWithMapPage from '../components/realEstatesWithMapPage'
import RealEstatePage from '../components/realEstatePage'
import NewsPage from '../components/newsPage'
import ArticlePage from '../components/articlePage'
import ContactPage from '../components/contactPage'
import AgentPage from '../components/agentPage'
import LoginPage from '../components/loginPage'
import AddRealEstatePage from '../components/addRealEstatePage'
import AddLocationPage from '../components/addLocationPage'
import EditRealEstatePage from '../components/editRealEstatePage'
import ListPage from '../components/listPage'
import LocationListPage from '../components/locationListPage'
import ArticleListPage from '../components/articleListPage'
import TestimonialsEditPage from '../components/testimonialsEditPage'
import AddArticlePage from '../components/addArticlePage'
import AddAgentPage from '../components/addAgentPage'
import AgentListPage from '../components/agentListPage'
import NotFoundPage from '../components/notFoundPage'



class AppRouter extends React.Component{
  render(){
    return(
      <Router>
        <div className="super_container">
          <Navigation />
          <Switch>
              <PublicRoute exact path="/" component={IndexPage}/>
              <PublicRoute path="/o-nama" component={AboutPage}/>
              <PublicRoute exact path="/nekretnine" component={RealEstatesWithMapPage}/>
              <PublicRoute path="/nekretnina/:id" component={RealEstatePage}/>
              <PublicRoute exact path="/novosti" component={NewsPage}/>
              <PublicRoute path="/novost/:id" component={ArticlePage}/>
              <PublicRoute path="/kontakt" component={LoginPage}/>
              <PrivateRoute path="/nekretnine/dodaj" component={AddRealEstatePage}/>
              <PrivateRoute path="/nekretnine/lista" component={ListPage}/>
              <PrivateRoute path="/nekretnine/edit/:id" component={EditRealEstatePage}/>
              <PublicRoute path="/agent/:id" component={AgentPage}/>
              <PublicRoute path="/prijava" component={LoginPage}/>
              <PrivateRoute path="/lokacije/dodaj" component={AddLocationPage}/>
              <PrivateRoute exact path="/lokacije/lista" component={LocationListPage}/>
              <PrivateRoute exact path="/ispovijesti" component={TestimonialsEditPage}/>
              <PrivateRoute exact path="/novosti/lista" component={ArticleListPage}/>
              <PrivateRoute exact path="/novosti/dodaj" component={AddArticlePage}/>
              <PrivateRoute exact path="/agenti/lista" component={AgentListPage}/>
              <PrivateRoute exact path="/agenti/dodaj" component={AddAgentPage}/>
              <Route component={NotFoundPage}/>
          </Switch>
          </div>
        </Router>
    )
  }
}

export default AppRouter
