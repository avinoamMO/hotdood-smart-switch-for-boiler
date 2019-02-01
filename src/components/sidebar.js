// docs : https://github.com/negomi/react-burger-menu#animations

import React from "react";
import { bubble as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu width="22%">
      <a className="menu-item" href="/status" onClick={console.log("yo")}>
        Status
      </a>

      <a className="menu-item" href="/Schedule">
        Schedule
      </a>

      <a className="menu-item" href="/Analytics">
        Analytics
      </a>

      <a className="menu-item" href="/Settings">
        Settings
      </a>
      <div id="logoutButton"><i>Logout</i></div>
    </Menu>
  );
};
