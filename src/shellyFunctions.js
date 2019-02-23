import axios from "axios";

function getSchedules () {
    axios
      .get(`http://localhost:3007/getSchedules`)
      .then(res => {
        this.setState({
          schedules: res.data.schedule_rules,
          isScheduleOn: res.data.schedule
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  function setNewSchedule(sch) {
    let data = JSON.stringify(sch)
    axios
      .get(`http://localhost:3007/saveNewEvent/${data}`)
      .then(res => {
        this.setState({ operationrecords: res.data });

        this.getSchedules();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  function deleteAnEvent(sch){
    let data = JSON.stringify(sch);
    axios
      .get(`http://localhost:3007/deleteAnEvent/${data}`)
      .then(res => {
        this.setState({ operationrecords: res.data });
        this.getSchedules();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

export function getSwitchStatus () {
    axios
      .get(`http://localhost:3007/status`)
      .then(res => {
        this.setState({ dataLoaded: true, switchStatus: res.data });
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });
  };

  export function switchRelayMode(interavlValueInMinutes, props) {
    axios
      .get(
        `http://localhost:3007/switchRelayMode/${interavlValueInMinutes * 60}`
      )
      .then(res => {});
  };
