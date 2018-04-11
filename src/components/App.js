import React, { Component } from 'react';
import {
  Route, // standart route geçişlerini sağlayan react componenti aşağıda en alt katmanda kullandık, sayfa geçişleri için.
  Switch  // Route'larda olan sayfa geçişlerini yakalayıp aktif hale getirip componentleri çağıran üst component.
} from 'react-router-dom'; // Reactın Son sürümüyle bu özellikler dom içerisinde geliyor.
import { store, history} from "../store/index.js"; // oluşturduğumuz store 'u export etmiştik burda kullanmak adına import ediyoruz.
import { Provider } from "react-redux"; // Reactin store'u yayıp diğer componentlerde de kullanmamızı sağlayan ana component. Diğer componentler
                                        // bunun içerisine konuluyor.
import { ConnectedRouter } from 'react-router-redux' // History'i componentlerde kullanmak adına yaymamızı sağlıyor ayrıca componentlerle history'i birbirine bağlayan component.
import './app.scss';

import Content from './Content.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Layout from './Layout.js';
import Logout from './Logout.js';
import About from './About.js';
import Contact from './Contact.js';
import Admin from './Admin.js';
import Profile from './Profile.js';
import ProfileDetail from'./ProfileDetail'
import Access from './Access'
import AuthAccess from './AuthAccess'
import Search from './Search'
import NoLoginSearch from './NoLoginSearch'
import LoginViewProfile from './LoginViewProfile'
import ViewProfile from './ViewProfile'
import PasswordReset from './PasswordReset'
import PasswordUpdate from './PasswordUpdate'
import CatMain from './CatMain'
import LoginBestPosts from './LoginBestPosts'
import NoLoginBestPosts from './NoLoginBestPosts'
import TopBestPosts from './TopBestPosts'
import NoLoginTopBestPosts from './NoLoginTopBestPosts'

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <Switch>
          <Layout>
              <Route exact path="/" component={Content}/>
              <Route exact path="/category/:category_id" component={Content}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/passwordreset" component={PasswordReset} />
              <Route exact path="/password_update/:token" component={PasswordUpdate} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/admin" component={(props) => <AuthAccess roles={[1]} Comp={Admin} />} />
              <Route exact path="/profile" component={(props) => <AuthAccess roles={[1,0,2]} Comp={Profile} />} />
              <Route exact path="/loginsearch/:search" component={Search} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/logout"  component={Logout} />
              <Route exact path="/search/:search" component={NoLoginSearch} />
              <Route exact path="/loginviewprofile/user/:username" component={LoginViewProfile} />
              <Route exact path="/viewprofile/user/:username" component={ViewProfile} />
              <Route path="/loginbestpost/:post_id" component={LoginBestPosts} />
              <Route exact path="/bestpost/:post_id" component={NoLoginBestPosts} />
              <Route exact path="/topbestpost" component={TopBestPosts} />
              <Route exact path="/nologintopbest" component={NoLoginTopBestPosts} />
          </Layout>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App
