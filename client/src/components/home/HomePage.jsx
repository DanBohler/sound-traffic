import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div className="homepage-style">
        <h1>Sound Traffic Profile</h1>
        <p>Comparte y compra equipamiento musical de segunda mano</p>
        <Link className="homepage-a" to={'/signup'}>Sign Up</Link>
        <Link className="homepage-a" to={'/login'}>Log In</Link>
      </div>
    )
  }
}