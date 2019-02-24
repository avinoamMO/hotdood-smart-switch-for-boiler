Water Heater Management System.

This web-app enables remote management of a water heater system. This software relies on interaction with a smart relay switch device called 'shelly1' (https://shelly.cloud/shelly1-open-source/)

The project was built in a hackathon during a coding bootcamp and is currently being omptimized to comply with proper coding practices and standards.

Supported features:

- Immediate turn on/off.
- Turn on with a set-off timer (i.e turn on the water heater for x minutes)
- A repeating weekly scheduling system.

Todo:

- The app is currently only functional when operated within the same LAN as the shelly 1 device. This will be solved by either port forwarding the device communication through the router (bad security practice) or by running a node that will be accessible from the WWW and handle the communication within the LAN. 
- The client-side is under heavy coding at the moment as it is being re-structured to work with MobX, most features are broken in the current version. 
- Once MobX is set up, a logging system will be implemented that will document all operations and display them in the analytics module.
- Unit tests and input validation will be implemented after MobX.
- Implement count-down timer
- Customizable quick-action buttons to be added to main module.
- A 'maximal up time' setting will be developed as well.
