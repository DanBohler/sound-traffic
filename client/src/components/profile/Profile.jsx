import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../api/service';
import AuthService from '../auth/AuthService'

export default class Profile extends Component {
  constructor(props) {
		super(props);
    this.state = {
    user : { username: '', campus: '', course: '', imageUrl: ''}
    }
  
    this.authService = new AuthService();
    this.apiService = new apiService();
    this.userLoad()
	}
  
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.apiService.handleUpload(uploadData)
    .then(response => {
      let newState = {...this.state}
      newState.user.imageUrl = response.secure_url;
      this.setState({newState}, () =>{
        this.apiService.saveNewPhoto(this.state.user.imageUrl, this.state.user.username)
        .then((data) => {
          console.log(data)
        })
      })
    })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
    });
  }
    
  
  logoutUser = () =>{
    this.authService.logout()
    .then((data) => {     
      this.setState({ loggedInUser: null });
    })
  }
  
  userLoad() {
    this.authService.loggedin()
    .then(user=>{
      
      let newState = {...this.state}
      newState.user.username = user.username;
      newState.user.imageUrl = user.imageUrl;
      newState.user.campus = user.campus;
      newState.user.course = user.course;
      this.setState({newState})
      
      // this.setState({...this.state,user})
    }
      );
    
    console.log(this.state)
	}
  
  render() {
    if(this.state.user){
      return(
        <div className="profile-style">
        <div className="ul-container">
          <h1>{this.state.user.username}</h1>
          <img className="img-profile" src={this.state.user.imageUrl} alt=""/>
          <p>Photo edit</p>
        </div>
        {(this.state.showTickOk) ? <p>updated ok</p> : ""}

          <input type="file" onChange={(e) => this.handleFileUpload(e)}/>
          <button type="submit">Save Profile</button>

          <Link to='/'>
            <button onClick={() => this.logoutUser()}>Logout</button>
          </Link> 
      </div>
    )
    }else{
      return(
        <h1>LOADING...</h1>
      )
    }
  }
}
