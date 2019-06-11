import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScrollToTop from "react-scroll-up"
import { Provider } from 'react-redux'
import AppRouter from './routers/appRouter'
import {store} from './redux/store'
import Newsletter from './components/newsletter'
import Footer from './components/footer'
import upArrow from '../public/images/toTop.svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'


 //const foo = setInterval(() => console.log(store.getState()), 2000)

library.add(faBars, faInstagram, faFacebook)

const App = () => {
    return (
      <Provider store={store}>
          <AppRouter />
          <ScrollToTop showUnder={160}>
            <span><button className="material-scrolltop" type="button"><img src={upArrow}/></button></span>
          </ScrollToTop>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
