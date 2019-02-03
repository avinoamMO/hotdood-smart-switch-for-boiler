import React, { Component } from 'react';

export default class ManageUsers extends Component {

  componentDidMount(){
    this.props.getUsers(); 
  }

  render() {
      // Make this a popup menu.
      if(this.props.users!=null){
        console.log(this.props.users)
      }
    return (
      <div className="ManageUsersPage">
      User photo, Remove User, Make Admin, Limit usage/Kid mode
      <p/>Add a new user
      </div>
    );
  }
}
