from flask import Flask
from flask_cors import CORS, cross_origin
from flask import send_file
import serial
import os
import base64


api_app = Flask(__name__)
CORS(api_app, support_credentials=True)

@api_app.route("/")
@cross_origin(supports_credentials=True)
def home():
    """
        Method that constantly reads from the Arduino's serial port
        This code will continuously run while the GUI is working
        Change Timeout to read more data points.
    """
    port = '/dev/ttyS0'
    line = serial.Serial(port,9600,timeout=0)'
    line = "Altitude:0.00 Acceleration:-1.00 -1.00 -0.60 Angular orientation:4 4 4"
    print(line)
    with serial.Serial(port, 9600, timeout=0) as ser:
        # x = ser.read() #Written to read one byte
        line = ser.readline()
        print(line)
        altitude = 1
        x_acc = 1
        y_acc = 1
        z_acc = 1
        x_ang = 1
        y_ang = 1
        z_ang = 1

    return "The telemetry reading is hidden here"

@api_app.route("/getTelem")
@cross_origin(supports_credentials=True)
def getTelem():
    """
        Method to get all telemetry from the Arduino Serial port.
        When this is accessed, all data will be displayed for all systems.

        All other functions should be executed when this is called.
    """
    return ("Still in the makes")

@api_app.route("/getAlt")
@cross_origin(supports_credentials=True)
def getAlt():
    """
        Method to get the altitude value of the Rocket.
        This Method is activated only when the url /getAlt is accessed.

        Data collected here will be used in the ReactApp to create an altitude graph.
    """
    return ("Still in the makes")

@api_app.route("/getAcc")
@cross_origin(supports_credentials=True)
def getAcc():
    """
        Method to get acceleration values in the x,y, and z directions
        This method is only activated when the route /getAcc is accessed.

        Data collected here will be displayed as rising and lowering bar graph.
    """
    return ("Still in the makes")

@api_app.route("/getAng")
@cross_origin(supports_credentials=True)
def getAng():
    """
        Method to get the angular position of the rocket.
        This method is only activated when the route /getAng is accessed.

        Data collected here is to be directly displayed as numbers on ReactApp.
    """
    return ("Still in the makes")

@api_app.route("/getLoc")
@cross_origin(supports_credentials=True)
def getLoc():
    """
        Method to get the location of the rocket with respect to the launchpad
        as the origin.
        This method is only activated when the url /getLoc is reached.

        Data collected here will be overlayed with a Google map section on the
        ReactApp.
    """
    return ("Still in the makes")
