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
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
import update from 'immutability-helper';

// import ProgressBar from 'react-progress-bar-plus'

// List of GLobal variables
var Columns = require ('react-columns');
const ProgressBar = require('react-progress-bar-plus');

function AltiButton (AltiButton) {
    var x=document.getElementById('AltiPress')
    fetch("http://127.0.0.1:5000/getAlt").then(res => {
        return res.json();
    }).then(data => {
        alert(data.alti)
    });
    if (x.style.display == 'block') {
        x.style.display = 'none'
    } else {
        x.style.display = 'block'
    }
}

function SpeeButton (SpeeButton) {
    var x=document.getElementById('SpeePress')
    fetch('http://127.0.0.1:5000/getAcc').then(res => {
                return res.json();
        }).then(data => {
            data.accel
            });
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
    fetch('http://127.0.0.1:5000/getAng').then(res => {
                return res.json();
        }).then(data => {
            data.accel
            });
    // if (x.style.display == 'block') {
    //   x.style.display = 'none'
    // } else {
    //   x.style.display = 'block'
    // }
}

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
        accelData1:[
            {
                color: "steelblue",
                points: []
            }
        ],
        accelData2:[
            {
                color: "steelblue",
                points: [{x: 1, y: 3}, {x: 3, y: 5}, {x: 7, y: -3}]
            }
        ],
        altiData1:[
            {
                color: "steelblue",
                points: []
            }
        ],
        altiData2:[
            {
                color: "steelblue",
                points: [{x: 1, y: 3}, {x: 3, y: 5}, {x: 7, y: -3}]
            }
        ],
        accel: 0,
        alti: 0,
        time: 0,
        day: "Today's Date",
        accelDataset: true,
        accelDatapoint: 1,
        altiDataset: true,
        altiDatapoint: 1,
        showAccel: false,
        showAlti: false
    };
    this.AccelButton = this.AccelButton.bind(this);
    this.AltiButton = this.AltiButton.bind(this);
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

  AltiButton () {
      this.setState(prevState => ({
          showAlti: !prevState.showAlti
      }));
  }

  updateAccel() {
    fetch('http://127.0.0.1:5000/getAcc').then(res => {
                return res.json();
        }).then(data => {
        this.setState({accel:data.accel})
        }).then(data => {
        this.setState(update(this.state,{accelData1:{0:{points:{$splice:[[this.state.accelDatapoint,1,{x:this.state.accelDatapoint,y:this.state.accel}]]}}}}))}).then(data => {this.setState(update(this.state,{accelDatapoint : {$apply:function(x) {return (x+1)%20;}}}))});
  }

  updateAlti() {
      fetch('http://127.0.0.1:5000/getAlt').then(res => {
          return res.json();
      }).then(data => {
          this.setState({alti:data.alti})
      }).then(data => {
      this.setState(update(this.state,{altiData1:{0:{points:{$splice:[[this.state.altiDatapoint,1,{x:this.state.altiDatapoint,y:this.state.alti}]]}}}}))}).then(data => {this.setState(update(this.state,{altiDatapoint : {$apply:function(x) {return (x+1)%20;}}}))});
}

  updateTime() {
      fetch('http://127.0.0.1:5000/getTime').then(res => {
          return res.json();
      }).then(data => {
      this.setState({time:data.time,day:data.day})
      });
  }

  componentDidMount(){
      this.interval = setInterval(() => this.updateAccel(),1000);
      this.interval = setInterval(() => this.updateAlti(),1000);
      this.interval = setInterval(() => this.updateTime(),1000);
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
            <div className = "date">{this.state.day}</div>
            <div className = "message">This web interface is currently undergoing maintenance.</div>
        </div>

        <div className="Updates">
          Telemetry
        </div>
        <div className = "line2">______________________________________________________________________________________________________________</div>

        <div className="App-intro">
        </div>

        <button onClick = {AllButton} className = "AllButton">
          <img src = {all}
            className = "all" />
        </button>
{/*-----------------------------------Altimeter------------------------------------*/}
        <button onClick = {this.AltiButton} className = "AltiButton">
          <img src = {AltiIcon}
            className = "AltiIcon" />
        </button>

{/*-----------------------------------Speedometer-----------------------------------*/}
        <button onClick = {this.AccelButton} className = "SpeeButton">
          <img src = {SpeedIcon}
            className = "SpeedIcon" />
        </button>
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
{/*---------------------------------Speed-Press---------------------------------*/}
          <div id = "SpeePress">
          {this.state.showAccel
            &&
            <div className="Readings">
              Speedometer Readings
            </div>
          }
              {this.state.showAccel
                &&
              <div className="Speedometer">
                <ReactSpeedometer value={this.state.accel}/>
              </div>
              }
              {this.state.showAccel &&
              <div className="lineChart">
                    <LineChart
                        width={600}
                        height={200}
                        yMax = {'600'}
                        yMin = {'450'}
                        xMax = {'20'}
                        data={this.state.accelData1}
                    />
                </div>
              }
          </div>

{/*---------------------------------Altimeter-Press---------------------------------*/}
            <div id = "AltiPress">
            {this.state.showAlti
              &&
              <div className="Readings">
                Altimeter Readings
              </div>
            }

            {this.state.showAlti
              &&
              <div className="Altimeter">
                  <div style={{width: "300px", height: "300px"}}>
                      {this.state.showAlti &&
                          <ReactSpeedometer
                              fluidWidth
                              value={this.state.alti}
                              startColor="green"
                              endColor="blue"
                              segments={10}
                              textColor="gray"
                              needleColor="red"
                              currentValueText="${value}"
                          />
                      }
                  </div>
              </div>
            }

            {this.state.showAlti && this.state.showAccel &&
            <div className="lineChartAlti">
                  <LineChart
                      width={600}
                      height={300}
                      yMax = {'1000'}
                      yMin = {'0'}
                      xMax = {'20'}
                      data={this.state.altiData1}
                  />
              </div>
            }

            {this.state.showAlti && !this.state.showAccel &&
            <div className="lineChart">
                  <LineChart
                      width={600}
                      height={300}
                      yMax = {'1000'}
                      yMin = {'0'}
                      xMax = {'20'}
                      data={this.state.altiData1}
                  />
              </div>
            }
        </div>
     </div>
    );
  }
}

export default App;
