import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Icon from '../auth/logo-blanco.svg'

export default class Home extends Component {
  render() {
    return (
      <div className="homepage-style">
        <div className="logo-styles">
          <img src={Icon} alt=""></img>
        </div>
        <div className="home-container">
        <p>Comparte y compra equipamiento musical de segunda mano</p>
        <Link className="link-style" to={'/signup'}>Sign Up</Link>
        <Link className="link-style" to={'/login'}>Log In</Link>
        </div>
      </div>
    )
  }
}