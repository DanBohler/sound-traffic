import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../api/service';

import searchLogo from '../../logo/baseline-search-24px.svg'
import addLogo from '../../logo/baseline-add_box-24px.svg';
import smsLogo from '../../logo/baseline-email-24px.svg';
import profilelogo from '../../logo/baseline-person-24px.svg';
import listAll from '../../logo/baseline-list_alt-24px.svg';


export default class ListAdverts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      filterList: [],
      search:""
    };
    this.getListArticles();
    this.apiService = new ApiService();
  }
  
  // componentDidMount() {
  // }

  getListArticles() {
    
    this.apiService.listAdverts().then((articles) => {
      let newState = {...this.state};
      newState.articles = articles;
      newState.filterList= articles;
      this.setState(newState,()=>{
      });
    });
  }

  onChangeHandler = e => {
    const newState = {...this.state}
    newState.search = e.target.value
    this.setState(newState,()=>{
      this.filterProducts(this.state.search)
    })
  }

  filterProducts = (filt) => {
    
    let newState = this.state;
    let newArr = [];
    for (var i = 0; i < newState.articles.length; i++) {
      if(newState.articles[i].product.includes(filt)) {
        newArr.push(newState.articles[i])
      }
    }   
    this.setState ({filterList:newArr},()=>{
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="adverts-container">
        <div className="adverts-styles">
        <div className="advert-search">
        <input 
            type="text"
            name="search"
            placeholder="search..."
            onChange={this.onChangeHandler}
          />
        <button type="button">
        <img src={searchLogo}/>
        </button>
        </div>
        </div>     
        {this.state.filterList.map((article) => (
          
          <div className="article-container">
            <Link to={`/article/${article._id}`} key={article._id}>
              <div className="article-product-price">
                <div className="article-head">
                  <h2>{article.product}</h2>
                  <h3>{article.price}€</h3>
                </div>
                <div>
                  <img className="article-img" src={article.imageUrl} alt="" />
                </div>
              </div>
              <p className="article-description">{article.description}</p>
            </Link>
          </div>
        ))}
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
