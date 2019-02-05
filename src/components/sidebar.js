// docs : https://github.com/negomi/react-burger-menu#animations
import { Link, NavLink, BrowserRouter as Router, Route} from 'react-router-dom'

import React from "react";
import { bubble as Menu } from "react-burger-menu";


export default props => {
  return (
    
    <Menu width="22%" >
      
      <Link to='/status'>Status</Link>
      <Link to='/schedules'>Schedules</Link>
      <Link to='/analytics'>Analytics</Link>
      <Link to='/settings'>Settings</Link>
      <Link id= 'logoutButton' to='/'>Logout</Link>
    </Menu>
  );
};
