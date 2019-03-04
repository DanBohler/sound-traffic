import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../api/service';
import AuthService from '../auth/AuthService';
import MapView from '../map/MapView';

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
        username: '',
        imageUrl: '',
        coordinates: { lat: null, lng: null },
      },
    };

    this.authService = new AuthService();
    this.apiService = new apiService();
    this.userLoad();
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
    this.authService.logout().then((data) => {
      this.setState({ loggedInUser: null });
    });
  };

  userLoad() {
    this.authService.loggedin().then((user) => {
      let newState = { ...this.state };
      newState.user.username = user.username;
      newState.user.imageUrl = user.imageUrl;
      newState.user.campus = user.campus;
      newState.user.course = user.course;
      this.setState({ newState });
    });

    console.log(this.state);
  }

  render() {
    if (this.state.user) {
      return (
        <div className="homepage-style">
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
        </div>
      );
    } else {
      return <h1>LOADING...</h1>;
    }
  }
}
