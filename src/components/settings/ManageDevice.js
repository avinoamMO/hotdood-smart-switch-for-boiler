import React, { Component } from 'react';

export default class ManageDevice extends Component {
  render() {
      // Make this a popup menu.
    return (
      <div className="ManageDevicePage">
        Maximal 'ON' time : <input type="text" value="#"></input><p/>

        Send SMS message after X amount of minutes to Phone#
      </div>
    );
  }
}
