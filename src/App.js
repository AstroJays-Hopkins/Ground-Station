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

// import ProgressBar from 'react-progress-bar-plus'

// List of GLobal variables
var Columns = require ('react-columns');
const ProgressBar = require('react-progress-bar-plus');

//LIST OF FUNCTIONS EXECUTED BY THE USER.
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

function helpButton (helpButton) {
    var x=document.getElementById('helpPress')

    if (x.style.display == 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
}
///

class App extends Component {
  constructor(opts){
    super(opts);
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
        </div>
    );
  }
}

export default App;
