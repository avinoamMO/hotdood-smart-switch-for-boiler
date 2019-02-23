// docs : https://github.com/negomi/react-burger-menu#animations
import { Link} from 'react-router-dom'

import React from "react";
import { fallDown as Menu } from "react-burger-menu";


export default props => {
  return (
    
    <Menu width="55%" >
      
      <Link to='/status'>Status</Link>
      <Link to='/schedules'>Schedules</Link>
      <Link to='/analytics'>Analytics</Link>
      <Link to='/settings'>Settings</Link>
      <Link id= 'logoutButton' to='/'>Logout</Link>
    </Menu>
  );
};
