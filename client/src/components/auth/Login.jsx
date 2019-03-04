import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import AuthService from './AuthService';
import Icon from '../auth/logo-blanco.svg';

class Login extends Component {
  constructor (props) {
    super (props);
    this.state = {username: '', password: '', redirect: false};
    this.service = new AuthService ();
  }

  handleFormSubmit = event => {
    event.preventDefault ();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login (username, password)
      .then (response => {
        this.setState ({
          username: username,
          password: password,
          redirect: true,
          error: false,
        });
        console.log (response);
        this.props.getUser (response);
      })
      .catch (error => {
        this.setState ({
          username: username,
          password: password,
          error: true,
        });
      });
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState ({...this.state, [name]: value});
  };

  render () {
    return (
      <div className="homepage-style">
        {this.state.redirect ? <Redirect to="/profile" /> : ''}
        <div className="logo-styles">
          <img src={Icon} alt="" />
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="signup-styles">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange (e)}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange (e)}
            />
          </div>
          <p>
          {this.state.error
              ? 'Please, confirm your user and your password'
              : ''}
          </p>
          <input className="input-style" type="submit" value="Login" />
        </form>
        <div className="signup-container">
          <p>
            If you don't have an account yet, you can create your account
            <Link to={'/signup'}> here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
