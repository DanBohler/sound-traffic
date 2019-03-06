import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ApiService from '../../api/service';
import AuthService from '../../api/service'

import addLogo from '../../logo/baseline-add_box-24px.svg';
import smsLogo from '../../logo/baseline-email-24px.svg';
import profilelogo from '../../logo/baseline-person-24px.svg';
import listAll from '../../logo/baseline-list_alt-24px.svg';

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
    };
    this.apiService = new ApiService();
    this.authService = new AuthService();
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
        console.log(response)
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    this.apiService
      .handleUpload(uploadData)
      .then((response) => {
        console.log(response)
        let newState = { ...this.state };
        newState.imageUrl = response.secure_url;
        this.setState({...newState }, () => {
          console.log(newState)
          this.apiService
            .saveAdvertPhoto(this.state.imageUrl)
            .then((data) => {
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
          <div className="signup-styles">
            <label>product</label>
            <input
              type="text"
              name="product"
              value={this.state.product}
              onChange={(e) => this.handleChange(e)}
            />
            <br></br>
            <label>price</label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={(e) => this.handleChange(e)}
            />
            <br></br>
            <label>description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />               
          </div>
          <input className="upload-input-style" type="submit" value="upload" />
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
