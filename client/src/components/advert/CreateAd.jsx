import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ApiService from '../../api/service';
import AuthService from '../../api/service';

import addLogo from '../../logo/baseline-add_box-24px.svg';
import smsLogo from '../../logo/baseline-email-24px.svg';
import profilelogo from '../../logo/baseline-person-24px.svg';
import listAll from '../../logo/baseline-list_alt-24px.svg';
import Chatmessage from '../chat/ChatMessage';

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      product: '',
      price: '',
      description: '',
      imageUrl: '',
      redirect: false,
      buttonDisabled: true,
    };
    this.apiService = new ApiService();
    this.authService = new AuthService();
    // this.userLoad();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const advert = {
      user: this.state,
      product: this.state.product,
      price: this.state.price,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      redirect: true,
    };

    this.apiService
      .uploadAdvert(advert)
      .then((response) => {
        this.setState({
          user: '',
          product: '',
          price: '',
          description: '',
          imageUrl: '',
          redirect: false,
        });
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    // function consoleLogElegant(t) {
    //   console.log('*'.repeat(100));
    //   console.log(t);
    //   console.log('*'.repeat(100));
    // }

    // consoleLogElegant('dan' + 1111);

    this.setState({ ...this.state, [name]: value }, function() {
      let buttonDisabledCalculation = true;

      if (
        this.state.product.length > 0 &&
        this.state.price.length > 0 &&
        this.state.description.length > 0
      ) {
        buttonDisabledCalculation = false;
      }

      this.setState({
        ...this.state,
        buttonDisabled: buttonDisabledCalculation,
      });
    });
  };

  userLoad() {
    this.authService.loggedin().then((user) => {
      let newState = { ...this.state };
      newState.user.username = user.username;
      this.setState({ newState });
      console.log(newState);
    });
  }

  handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    this.apiService
      .handleUpload(uploadData)
      .then((response) => {
        console.log(response);
        let newState = { ...this.state };
        newState.imageUrl = response.secure_url;
        this.setState({ ...newState }, () => {
          console.log(newState);
          this.apiService.saveAdvertPhoto(this.state.imageUrl).then((data) => {
            console.log(data);
          });
        });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  render() {
    return (
      <div className="homepage-style">
        <form onSubmit={this.handleFormSubmit}>
          <h1>Create your ad</h1>
          <div className="createad-styles">
            <label>product:</label>
            <input
              type="text"
              name="product"
              value={this.state.product}
              onChange={(e) => this.handleChange(e)}
            />

            <label>price:</label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="createad-description">
            <label>description:</label>
            <textarea
              name="description"
              cols="40"
              rows="5"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <input
            className="upload-input-style"
            type="submit"
            value="upload"
            disabled={this.state.buttonDisabled}
          />
        </form>
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
        <div className="tool-bar">
          <Link to={'/createad'}>
            <img src={addLogo} alt="" />
          </Link>
          <Link to={'/adverts'}>
            <img src={listAll} alt="" />
          </Link>
          <Link to={'/mesagges'}>
            <img src={smsLogo} alt="" />
          </Link>
          <Link to={'/profile'}>
            <img src={profilelogo} alt="" />
          </Link>
        </div>
      </div>
    );
  }
}
