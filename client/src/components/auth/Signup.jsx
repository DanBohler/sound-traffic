import React, { Component } from 'react';
import AuthService from './AuthService';
import { Redirect, Link } from 'react-router-dom';
import Icon from '../../logo/logo-blanco.svg';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '',  redirect: false};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const profile = {
      username: this.state.username, 
      email: this.state.email, 
      password: this.state.password, 
    }

    this.service
      .signup(profile)
      .then((response) => {
        this.setState({
          username: '',
          email: '',
          password: '',
          redirect: true,
        });
        this.props.getUser(response)
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });

    console.log(this.state)
  };

  render() {
    return (
      <div className="homepage-style">
        {this.state.redirect ? <Redirect to="/login" /> : ''}
        <div className="logo-styles">
          <img src={Icon} alt=""></img>
        </div>
        <form onSubmit={this.handleFormSubmit}>
         <div className="signup-styles">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          <br></br>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />
          <br></br>
          <label>Password:</label>
          <input
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          </div>
        <input className="input-style" type="submit" value="Signup" />
        </form>
        <div className="signup-container">
          <p>
            Already have account?
          <Link to={'/login'}> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
