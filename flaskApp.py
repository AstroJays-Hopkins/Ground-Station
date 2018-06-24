from flask import Flask
from flask_cors import CORS, cross_origin
from flask import send_file
import serial
import os
import base64
import json
import numpy as np
from datetime import datetime
import time
import re

api_app = Flask(__name__)
CORS(api_app, support_credentials=True)


#port = '/dev/cu.usbmodem1411'
port = 'COM3'
ser = serial.Serial(port,9600, bytesize=8, parity=serial.PARITY_NONE, stopbits=1, timeout=2)
input_data = np.zeros(9)

def get_data():
	ibuffer = ""  # Buffer for raw data waiting to be processed
	while True:
		time.sleep(.05)  # Best between .1 and 1
		#data = ser.read(4096).decode('utf-8')  # May need to adjust read size
		data = re.sub("SETUP\r\n","",data).replace("\r\n","/")
		data = re.sub("(//)*","",data).split("/")
		if(len(data)>0):
			if(data[0] == ''):
				data = data[1:]
		if(len(data)>0):
			if(data[len(data)-1] == ''):
				data = data[:len(data)-1]
		if (len(data) == 13):
			input_data = [data[1],data[3],data[4],data[5],data[7],data[8],data[9],data[11],data[12]]
			print(input_data)
	'''
	ibuffer += data  # Concat data sets that were possibly split during reading
        if '\r\n' in ibuffer:  # If complete data set
            line, ibuffer = ibuffer.split('\r\n', 1)  # Split off first completed set
            yield line.strip('\r\n')  # Sanitize and Yield data
	'''

#ser_data = get_data()
'''

while True:
    data = next(ser_data).replace(' ','').split(',')
    data = re.sub("SETUP\r\n","",data).replace("\r\n","/")
    data = re.sub("(//)*","",data).split("/")
    print(data)
    if len(data) > 0:
        """
        data processing down here

        """

ser.close()
'''
@api_app.route("/")
@cross_origin(supports_credentials=True)
def home():
    """
        Method that constantly reads from the Arduino's serial port
        This code will continuously run while the GUI is working
        Change Timeout to read more data points.
    """
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
    
    #accel = {'altitude':(np.random.rand()/10+.5)*1000, 'accel':[(np.random.rand()/10+.5)*1000,(np.random.rand()/10+.5)*1000,(np.random.rand()/10+.5)*1000], 'angl':[(np.random.rand())*90-45,np.random.rand()*90-45,np.random.rand()*90-45],'gps':[np.random.rand()*90-45,np.random.rand()*90-45]}
    global input_data   
    time.sleep(.1)  # Best between .1 and 1
    data = ser.read(4096).decode('utf-8')  # May need to adjust read size
    data = re.sub("SETUP\r\n","",data).replace("\r\n","/")
    data = re.sub("(//)*","",data).split("/")
    print(data)
    if(len(data)>0):
        if(data[0] == ''):
            data = data[1:]
    if(len(data)>0):
        if(data[len(data)-1] == ''):
            data = data[:len(data)-1]
    if (len(data) == 13):
        input_data = [data[1],data[3],data[4],data[5],data[7],data[8],data[9],data[11],data[12]]
        print(input_data)
  
    #process data into aarray input_data

    print(input_data)
    accel = {'altitude':input_data[0], 'accel':[input_data[1],input_data[2],input_data[3]], 'angl':[input_data[4],input_data[5],input_data[6]],'gps':[input_data[7],input_data[8]]}
    print(json.dumps(accel))
    f = open("./AvionicsData/accel.txt","a+")
    f.write(str(datetime.today().isoformat(' ')) + "\t" + str(json.dumps(accel))+"\n")
    f.close()
    return(json.dumps(accel))
    
@api_app.route("/getAng")
@cross_origin(supports_credentials=True)
def getAng():
    """
        Method to get the angular position of the rocket.
        This method is only activated when the route /getAng is accessed.

        Data collected here is to be directly displayed as numbers on ReactApp.
    """
    ang = {'ang':(np.random.rand()/10+.5)*1000}
    f = open("./AvionicsData/angul.txt","a+")
    f.write(str(ang['ang'])+"\n")
    f.close()
    return (json.dumps(ang))

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
