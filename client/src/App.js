import React, { Component } from 'react';
import './App.css';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import HomePage from './components/home/HomePage'
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/auth/AuthService';
import Profile from './components/profile/Profile';
import ListAdverts from './components/advert/ListAdverts';
import ArticleInfo from './components/advert/Article';
import CreateAd from './components/advert/CreateAd';
import MailMessage from './components/mail/MailMessage'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  logOut = ()=>{
    this.setState({ loggedInUser: null });
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  

  render() {
    if(!this.state.loggedInUser){
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path="/login" render={() => <Login getUser={this.getTheUser}/>}/>
          <Route exact path="/adverts" component={ListAdverts}/>
         </Switch>
      </div>
          )
        }else{
          return(
            <div className="App">
         <Switch>
            <Route exact path="/mail" component={MailMessage}/>
            <Route exact path="/profile" render={() => <Profile logOut={this.logOut}/>}/>
            <Route exact path="/adverts" component={ListAdverts}/>
            <Route exact path="/article/:id" component={ArticleInfo}/>
            <Route exact path="/createad" render={() => <CreateAd user={this.state.loggedInUser}/>}/>
           </Switch>
       </div>
      )
    }   
  }
}

export default App;
