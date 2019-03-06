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

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  getTheAdvert= (articleObj) => {
    this.setState({
      loggedInUser: articleObj
    })
  }  
  
  render() {
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/adverts" component={ListAdverts}/>
          <Route exact path="/article/:id" component={ArticleInfo}/>
          <Route exact path="/createad" render={() => <CreateAd getUser={this.getTheUser}/>}/>
          <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path="/login" render={() => <Login getUser={this.getTheUser}/>}/>
        </Switch>
      </div>
    )
  }
}

export default App;
