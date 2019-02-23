import React, { Component } from "react";

export default class ToggleButton extends Component {
  handleButtonClick = () => {
    this.props.switchRelayMode(this.props.dialValue);
  };

  render() {
    if (this.props.switchStatus !== null) {
      return (
        <div id="toggleButton">
          
          {
            <form>
              <input
                className="ch"
                type="checkbox"
                name="temperature"
                checked={this.props.switchStatus}
                value={true}
                onClick={this.handleButtonClick}
              />
            </form>
          }
        </div>
      );
    } else {
      return <div>lost connection to device</div>;
    }
  }
}
