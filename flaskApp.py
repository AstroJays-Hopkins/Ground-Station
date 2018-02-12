from flask import Flask
from flask_cors import CORS, cross_origin
from flask import send_file
import pySerial
import os
import base64


api_app = Flask(__name__)
CORS(api_app, support_credentials=True)

@api_app.route("/")
@cross_origin(supports_credentials=True)
def home():
    return "The telemetry reading is hidden here"

@api_app.route("/getTelem")
@cross_origin(supports_credentials=True)
def getTelem():
    with serial.Serial('/dev/ttyS1', 19200, timeout=0) as ser:
        x = ser.read()
        line = ser.readline()
    print(x)
