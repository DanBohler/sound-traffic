import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../api/service';
import AuthService from '../auth/AuthService';
import MapView from '../map/MapView';

import addLogo from '../../logo/baseline-add_box-24px.svg'
import smsLogo from '../../logo/baseline-email-24px.svg'
import profilelogo from '../../logo/baseline-person-24px.svg'
import listAll from '../../logo/baseline-list_alt-24px.svg'

export default class Profile extends Component {
  static defaultProps = {
    center: {
      lat: 40.41,
      lng: -3.7,
    },
    zoom: 4,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      user: {
        articles: null,
        username: '',
        imageUrl: '',
        coordinates: { lat: null, lng: null },
      },
    };
    
    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.userLoad();
    
  }

 
  getUserArticles() {
    const user = this.state.user.username
    this.apiService.listMyAds(user)
    .then((articles) => {
      let newState = {...this.state};
      newState.user.articles = articles;
      this.setState(newState, () => {});
      console.log(this.state.user.articles.data)
      console.log(articles.data)
    });
  }

  handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    this.apiService
      .handleUpload(uploadData)
      .then((response) => {
        let newState = { ...this.state };
        newState.user.imageUrl = response.secure_url;
        this.setState({ newState }, () => {
          this.apiService
            .saveNewPhoto(this.state.user.imageUrl, this.state.user.username)
            .then((data) => {
              console.log(data);
            });
        });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  logoutUser = () => {
    this.authService.logout()
    .then((data) => {
      this.props.logOut()
    });
  };

  userLoad() {
    this.authService.loggedin()
    .then((user) => {
      let newState = { ...this.state };
      newState.user.username = user.username;
      newState.user.imageUrl = user.imageUrl;
      this.setState({ newState });
      this.getUserArticles();

    });
  }


  render() {
    let data = this.state.user.articles?(
      this.state.user.articles.data.map((article, index)=>{
        return(
          <div className="article-container">
          <div className="article-product-price">
            <div className="articles-head">
              <h2>{article.product}</h2>
              <h3>{article.price}€</h3>
            </div>
            <div>
              <img className="articles-img" src={article.imageUrl} alt="" />
            </div>
          </div>
         <p className="article-description">{article.description}</p>
     </div>
        )
      })
    ):(<h2></h2>)
    
    if (this.state.user) {
      return (
        <div className="profile-page-style">
          <div className="profile-container">
            <div className="ul-container">
              <div className="align-profile">
                <h1 className="profile-user">{this.state.user.username}</h1>
                <img
                  className="img-profile"
                  src={this.state.user.imageUrl}
                  alt=""
                />
              </div>
              {this.state.showTickOk ? <p>updated ok</p> : ''}
              <div className="edit-profile">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="photo-input"
                  onChange={(e) => this.handleFileUpload(e)}
                />
                <label for="file">Choose a file</label>
              </div>
              <Link to="/">
                <button
                  className="input-profile"
                  onClick={() => this.logoutUser()}
                >
                  Logout
                </button>
              </Link>
            </div>
            <div className="map-styles">
              <MapView/>
            </div>
          </div>
          <div className="advice-name">
          <h1>your ads:</h1>
          {data}
          </div>
          <div className="tool-bar">
          <Link to={'/createad'} ><img src={addLogo} alt="" /></Link>
          <Link to={'/adverts'} ><img src={listAll} alt="" /></Link>
          <Link to={'/mesagges'} ><img src={smsLogo} alt="" /></Link>
          <Link to={'/profile'} ><img src={profilelogo} alt="" /></Link>
          </div>
        </div>
      );
    } else {
      return <h1>LOADING...</h1>;
    }
  }
}
