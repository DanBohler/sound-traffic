import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const profile = {
      username: this.state.username, 
      password: this.state.password, 
    }

    this.service
      .signup(profile)
      .then((response) => {
        this.setState({
          username: '',
          password: '',
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
      <div className="signup-styles">
        <h1>IronProfile</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          <br></br>
          <label>Password:</label>
          <input
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          <br></br>
          <input type="submit" value="Create the account" />
        </form>

        <p>
          Already have account?
          <Link to={'/login'}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
