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
import ReactSpeedometer from "react-d3-speedometer";
import update from 'immutability-helper';
import {LineChart} from 'react-easy-chart';

// import ProgressBar from 'react-progress-bar-plus'

// List of GLobal variables
var Columns = require ('react-columns');
const ProgressBar = require('react-progress-bar-plus');

//LIST OF FUNCTIONS EXECUTED BY THE USER.
function AllButton (AllButton) {
  var x=document.getElementById('SpeePress')
  if (x.style.display == 'block') {
    x.style.display = 'none'
  } else {
    x.style.display = 'block'
  }
}
function helpButton (helpButton) {
  alert("To make sure you are seeing the correct readings please connect your ARDUINO to your computer and expose it to PORT11")
}
///

class App extends Component {
  constructor(opts){
    super(opts);
    this.state = {
        accelDataX:[
            {
                points: []
            }
        ],
        accelDataY:[
            {
                points: []
            }
        ],
        accelDataZ:[
            {
                points: []
            }
        ],
        altitudeData:[
            {
                points: []
            }
        ],
        anglData1:[
            {
                points: []
            }
        ],
        anglData2:[
            {
                points: []
            }
        ],
        anglData3:[
            {
                points: []
            }
        ],
        accel: [0,0,0],
	altitude: 0,
	angl: [0, 0, 0],
        accelDataset: true,
        accelDatapoint: 0,
        showAccel: false,
	showAlt: false,
	showAngl: false,
    };
    this.AccelButton = this.AccelButton.bind(this);
    this.AltButton = this.AltButton.bind(this);
    this.AnglButton = this.AnglButton.bind(this);
  }

  //Fetch Telemetry Data
  fetchTelem() {
    fetch("http://127.0.0.1:5000/getTelem/")
    .then(res => res.text())
    .then(res=> {
        this.setState({
            image: res,
            })
    var status = this.state.image
    alert("Telemetry Incoming...")
    })
  }

  AccelButton () {
    this.setState(prevState => ({
  showAccel: !prevState.showAccel
}));
  }

  AltButton () {
    this.setState(prevState => ({
  showAlt: !prevState.showAlt
}));
  }

  AnglButton () {
    this.setState(prevState => ({
  showAngl: !prevState.showAngl
}));
  }

  GpsButton () {
  }

  AllButton () {
  }

  updateAccel() {
    fetch('http://127.0.0.1:5000/getAcc').then(res => {
                return res.json();
        }).then(data => {
        this.setState({
		accel:data.accel,
		altitude:data.altitude,
		angl: data.angl
	})
        }).then(data => {
        console.log(this.state.accelDataX[0].points);
        this.setState(update(this.state,{accelDataX:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.accel[0]}]]}}}}));
        this.setState(update(this.state,{accelDataY:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.accel[1]}]]}}}}));  
        this.setState(update(this.state,{accelDataZ:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.accel[2]}]]}}}}))
        this.setState(update(this.state,{altitudeData:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.altitude}]]}}}}))
        this.setState(update(this.state,{anglData1:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.angl[0]}]]}}}}))
        this.setState(update(this.state,{anglData2:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.angl[1]}]]}}}}))
        this.setState(update(this.state,{anglData3:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.angl[2]}]]}}}}))

	}).then(data => {this.setState(update(this.state,{accelDatapoint : {$apply:function(x) {return (x+1)%20;}}}))});
  }

  componentDidMount(){
      this.interval = setInterval(() => this.updateAccel(),1000);
  }


//WHAT IS RENDERED FOR THE USER TO SEE.

  render() {

    return (
      <div className="App">

        <div className="App-header">
	<div className="Logo">
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
	</div>
        <div className = "line1">______________________________________________________________________________________________________________________________________</div>

        <div className="Updates">
          Telemetry
        </div>
        <div className = "line2">________________________________________________________________________________________________________________________________________________________</div>

        <div className="App-intro">
        </div>

	<div className = "Buttons">
        <button onClick = {this.AllButton} className = "AllButton">
          <img src = {all}
            className = "all" />
        </button>
{/*-----------------------------------Altemeter------------------------------------*/}
        <button onClick = {this.AltButton} className = "AltiButton">
          <img src = {AltiIcon}
            className = "AltiIcon" />
        </button>
{/*---------------------------------Altimeter-Press---------------------------------*/}
          <div id = "AltiPress">

          </div>
{/*-----------------------------------Speedometer-----------------------------------*/}
        <button onClick = {this.AccelButton} className = "SpeeButton">
          <img src = {SpeedIcon}
            className = "SpeedIcon" />
        </button>
{/*-----------------------------------Angular------------------------------------*/}
        <button onClick = {this.AnglButton} className = "AnguButton">
          <img src = {AnguIcon}
            className = "AnguIcon" />
        </button>
{/*---------------------------------Angular-Press---------------------------------*/}
	</div>

          <div id = "SpeePress">
          {this.state.showAccel
            &&
            <div className="Readings">
              Speedometer Readings
            </div>
          }
	<div className = "Speedometer">
              {this.state.showAccel
                &&
              <div className="AccelSpeedometer">
                Acceleration in X-axis
                <ReactSpeedometer value={this.state.accel[0]}/>
                Acceleration in Y-axis
                <ReactSpeedometer value={this.state.accel[1]}/>
                Acceleration in Z-axis
                <ReactSpeedometer value={this.state.accel[2]}/>
                </div>
		}{this.state.showAngl 
		&&
		<div className="AnglSpeedometer">
		Angle in first axis
                <ReactSpeedometer value={this.state.angl[0]} minValue="-180" maxValue="180"/>
                Angle in second axis
                <ReactSpeedometer value={this.state.angl[1]} minValue="-180" maxValue="180"/>
                Angle in third axis
                <ReactSpeedometer value={this.state.angl[2]} minValue="-180" maxValue="180"/>
              </div>
              }
		{this.state.showAlt
		&&
		<div className="AltSpeedometer">
		Altitude
                <ReactSpeedometer value={this.state.altitude}/>
                </div>
		}
	</div>
              <div className="lineChart"> 
		{this.state.showAccel && 
                <div className="accelCharts">
		<div className="firstChart">
                Acceleration in X-axis
                <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.accelDataX[0].points]}
                    width={500}
                    height={200}

                    />
                        </div>

                  <div className="secondChart">
                Acceleration in Y-axis
                  <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.accelDataY[0].points]}
                    width={500}
                        height={200}

                  />
                  </div>
                  <div className="thirdChart">
                Acceleration in Z-axis
                  <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.accelDataZ[0].points]}
                    width={500}
                    height={200}
                  />
                  </div> 
		</div>
		}
              {this.state.showAlt &&  
		<div className="fourthChart">
                Altitude
                  <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.altitudeData[0].points]}
                    width={500}
                    height={200}
                  />
                  </div>
                 }
              {this.state.showAngl &&
		<div className="anglCharts">
		 <div className="fifthChart"> 
                Angle in Axis-1
                  <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.anglData1[0].points]}
                    width={500}
                    height={200}
                  />
                  </div>
                  <div className="sixthChart"> 
                Angle in Axis-2
                  <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.anglData2[0].points]}
                    width={500}
                    height={200}
                  />
                  </div>
                  <div className="seventhChart">
                Angle in Axis-3
                  <LineChart 
                    axes
                    xDomainRange={[0,20]}
                    yDomainRange={[450,600]}
                    data={[this.state.anglData3[0].points]}
                    width={500}
                    height={200}
                  />
                  </div>
		</div>
       		}       
	 </div>
              
          </div>
          </div>
    );
  }
}

export default App;
