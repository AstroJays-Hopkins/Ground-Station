import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Button from 'react-uikit-button';
import Dropdown from 'react-dropdown'
import base64 from 'base-64';
import ReactLoading from 'react-loading'
import Popup from 'react-popup'
import AstroJLogo from './AstroJLogo.png';
import SpeedIcon from './SpeedIcon2.png';
import AltiIcon from './AltiIcon1.png';
import AnguIcon from './angularIcon.png';
import gpsIcon from './gpsIcon.png'
import all from './all.png';

// import ProgressBar from 'react-progress-bar-plus'

// List of GLobal variables
var Columns = require ('react-columns');
const ProgressBar = require('react-progress-bar-plus');

//LIST OF FUNCTIONS EXECUTED BY THE USER.
function AllButton (AllButton) {
  alert("This button will open all telemtry ports.")
}

function AltiButton (AltiButton) {
    var x=document.getElementById('AltiPress')
    if (x.style.display == 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
}

function SpeeButton (SpeeButton) {
    var x=document.getElementById('SpeePress')

    if (x.style.display == 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
}

function gpsButton (gpsButton) {
    var x=document.getElementById('gpsPress')
    if (x.style.display == 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
}

function AnguButton (AnguButton) {
    var x=document.getElementById('AnguPress')
    if (x.style.display == 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
}

function helpButton (helpButton) {
  alert("Help option is still under maintenance.")
}
///

class App extends Component {
  constructor(opts){
    super(opts);
  }
  //Fetch Telemetry Data
  fetchTelem() {
    fetch("http://127.0.0.1:5000/getTelem/")
    .then(res => res.text())
    .then(res=> {
        this.setState({image: res})
    var status = this.state.image
    alert("Telemetry Incoming...")
    })
  }

//WHAT IS RENDERED FOR THE USER TO SEE.

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={AstroJLogo} className="AstroJLogo"/>
          <button onClick = {helpButton} className = "helpButton">
            Help
          </button>
        </div>
        <div className = "title">
          Avionics Telemetry
        </div>
        <div className = "title2">
          Tracking your telemetry readings since today.
        </div>
        <div className = "line1">____________________________________________________________________________________________________________________________</div>

        <div className= "Updates">
          Announcements:
        </div>
         <div className = "line2">______________________________________________________________________________________________________________</div>
        <div className = "Updates2">
          Currently Under Development
            <div className = "date">February 10, 2018</div>
            <div className = "message">This webinterface is currently undergoing maintenance.</div>
        </div>

        <div className="Updates">
          Telemetry
        </div>
        <div className = "line2">______________________________________________________________________________________________________________</div>

        <div className="App-intro">
          What readings would you like to be running?
        </div>

        <button onClick = {AllButton} className = "AllButton">
          <img src = {all}
            className = "all" />
        </button>
{/*-----------------------------------Altemeter------------------------------------*/}
        <button onClick = {AltiButton} className = "AltiButton">
          <img src = {AltiIcon}
            className = "AltiIcon" />
        </button>
{/*---------------------------------Altimeter-Press---------------------------------*/}
          <div id = "AltiPress">

          </div>
{/*-----------------------------------Speedometer-----------------------------------*/}
        <button onClick = {SpeeButton} className = "SpeeButton">
          <img src = {SpeedIcon}
            className = "SpeedIcon" />
        </button>
{/*-------------------------------Speedometer-Press---------------------------------*/}
        <div id = "SpeePress" />
{/*-----------------------------------GPS------------------------------------*/}
        <button onClick = {gpsButton} className = "gpsButton">
          <img src = {gpsIcon}
            className = "gpsIcon" />
        </button>
{/*---------------------------------GPS-Press---------------------------------*/}
          <div id = "gpsPress">

          </div>
{/*-----------------------------------Angular------------------------------------*/}
        <button onClick = {AnguButton} className = "AnguButton">
          <img src = {AnguIcon}
            className = "AnguIcon" />
        </button>
{/*---------------------------------Angular-Press---------------------------------*/}
          <div id = "AnguPress"/>
          </div>
    );
  }
}

export default App;
