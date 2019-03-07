import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import addLogo from '../../logo/baseline-add_box-24px.svg'
import smsLogo from '../../logo/baseline-email-24px.svg'
import profilelogo from '../../logo/baseline-person-24px.svg'
import listAll from '../../logo/baseline-list_alt-24px.svg'

export default class MailMessage extends Component {

  handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    axios({
        method: "POST", 
        url:"http://localhost:3000/send", 
        data: {
            name: name,   
            email: email,  
            messsage: message
        }
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Message Sent."); 
            this.resetForm()
        }else if(response.data.msg === 'fail'){
            alert("Message failed to send.")
        }
    })
}

  render() {
    return (
      <div className="mail-styles">
        <h1>Contact User</h1>
        <form
          id="contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          method="POST"
        >
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label for="message">Message</label>
            <textarea className="form-control" rows="5" id="message" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="tool-bar">
          <Link to={'/createad'} ><img src={addLogo} alt="" /></Link>
          <Link to={'/adverts'} ><img src={listAll} alt="" /></Link>
          <Link to={'/mesagges'} ><img src={smsLogo} alt="" /></Link>
          <Link to={'/profile'} ><img src={profilelogo} alt="" /></Link>
          </div>
      </div>
    );
  }
}
