import React, { Component } from 'react';
import ManageUsers from './ManageUsers'
import {Link} from 'react-router-dom'


export default class Settings extends Component {
  tellajoke = () =>
  {
    let jokes =["would you like fries with that?","Coming right up.", "Not going to happen.", "Where do you think this is?"]
    const random = Math.round(Math.random() * (+jokes.length - +0) + +0);
    alert(jokes[random])

    
  }
  render() {
    return (
    <div className="SettingsPage">

      {/* <button>Manage users</button> <p/> */}
      <button>Configure Device</button> <p/>
      <button onClick={this.tellajoke}>Make a grilled cheese sandwich</button>
      <Link to='/settings/manageUsers'>Manage Users</Link>
      <Link to='/settings/manageDevice'>Manage Device</Link>


      </div>
    );
  }
}
