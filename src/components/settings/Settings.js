import React, { Component } from 'react';
import ManageUsers from './ManageUsers'
import {Link} from 'react-router-dom'


export default class Settings extends Component {
  
  render() {
    return (
    <div className="SettingsPage">

      
     
      <Link to='/settings/manageUsers'>Manage Users</Link><p/>
      <Link to='/settings/manageDevice'>Manage Device</Link>


      </div>
    );
  }
}
