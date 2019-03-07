import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../api/service';
import MapView from '../map/MapView';


import addLogo from '../../logo/baseline-add_box-24px.svg';
import smsLogo from '../../logo/baseline-email-24px.svg';
import profilelogo from '../../logo/baseline-person-24px.svg';
import listAll from '../../logo/baseline-list_alt-24px.svg';

export default class ArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
    };
    this.apiService = new ApiService();
  }

  componentDidMount() {
    this.getOneArticle();
  }

  getOneArticle() {
    let str = this.props.location.pathname;
    let id_article = str.substring(9);

    this.apiService.listOneArticle(id_article).then((article) => {
      let newState = { ...this.state };
      newState.article = article;
      this.setState(newState, () => {
        console.log(this.state);
      });
    });
  }

  render() {
    return (
      <div className="adverts-container">
        <div className="article-product-price">
        <div className="chat-product">
          <h1>{this.state.article.user}</h1>
          <Link to={'/mail'}>mail</Link>
        </div>
        <div>
          <div className="article-head">
            <h2>{this.state.article.product}</h2>
            <h3>{this.state.article.price}€</h3>
          </div>
          <img
            className="article-img"
            src={this.state.article.imageUrl}
            alt=""
          />
        <p className="article-description">{this.state.article.description}</p>
          </div>
        </div>
        <div className="article-map">
        <div className="article-map-styles">
              <MapView/>
            </div>
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
