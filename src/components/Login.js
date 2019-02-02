import React, { Component } from 'react';
import { Link} from 'react-router-dom'

import Morgan from '../assets/morgan.png'
export default class Login extends Component {
  render() {
    return (
      <div className="LoginPage">
      <center>
          <p/>
      Welcome back, Morgan.
      <Link to='/status'><img alt='user's profile photo width="50%" height="50%" src={Morgan}/></Link>

      <p/>
      Not you?<p/> sign in as another user.
      </center>
      </div>
    );
  }
}
