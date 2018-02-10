from flask import Flask
from flask_cors import CORS, cross_origin
from flask import send_file
from intern.remote.boss import BossRemote
from intern.resource.boss.resource import ChannelResource
from intern.remote.dvid import DVIDRemote
import matplotlib.pyplot as plt
import numpy as np
import os
import platform
from PIL import Image
import base64


api_app = Flask(__name__)
CORS(api_app, support_credentials=True)

@api_app.route("/")
@cross_origin(supports_credentials=True)
def home():
    return "The intern access code is hidden in here"

@api_app.route("/getCutBoss/<chan>/<col>/<exp>/<res>/<tok>/<xb>/<yb>/<zb>")
@cross_origin(supports_credentials=True)
def getCutBOSS(chan,col,exp,res,tok,xb,yb,zb):

		x_array = xb.split(",")
		x_start = int(x_array[0])
		x_stop = int(x_array[1])

		y_array = yb.split(",")
		y_start = int(y_array[0])
		y_stop = int(y_array[1])

		z_array = zb.split(",")
		z_start = int(z_array[0])
		z_stop = int(z_array[1])

		res = int(res)

		boss = BossRemote({
			"protocol":"https",
			"host":"api.theboss.io",
			"token": tok
		})

		volumeBOSS = boss.get_cutout(
		    boss.get_channel(chan, col, exp), res,
		    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

		figure1 = plt.figure(1)
		plt.imshow(volumeBOSS[0], cmap="gray")
		figure1.savefig("temp1.png")
		filename2='temp1.png'
		with open("temp1.png","rb") as imageFile:
			imageString = base64.b64encode(imageFile.read())

		return imageString
@api_app.route("/getCutBossnpy/<chan>/<col>/<exp>/<res>/<tok>/<xb>/<yb>/<zb>")
@cross_origin(supports_credentials=True)
def getCutBOSSnpy(chan,col,exp,res,tok,xb,yb,zb):

		x_array = xb.split(",")
		x_start = int(x_array[0])
		x_stop = int(x_array[1])

		y_array = yb.split(",")
		y_start = int(y_array[0])
		y_stop = int(y_array[1])

		z_array = zb.split(",")
		z_start = int(z_array[0])
		z_stop = int(z_array[1])

		res = int(res)

		boss = BossRemote({
			"protocol":"https",
			"host":"api.theboss.io",
			"token": tok
		})

		volumeBOSS = boss.get_cutout(
		    boss.get_channel(chan, col, exp), res,
		    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)
		volumeBOSSstr = str(volumeBOSS)
		np.set_printoptions(threshold=np.nan)
		print(volumeBOSSstr)
		return volumeBOSSstr

@api_app.route("/getCutBossOL/<chan>/<col>/<exp>/<res>/<tok>/<xb>/<yb>/<zb>")
@cross_origin(supports_credentials=True)
def getCutBOSSOL(chan,col,exp,res,tok,xb,yb,zb):

		x_array = xb.split(",")
		x_start = int(x_array[0])
		x_stop = int(x_array[1])

		y_array = yb.split(",")
		y_start = int(y_array[0])
		y_stop = int(y_array[1])

		z_array = zb.split(",")
		z_start = int(z_array[0])
		z_stop = int(z_array[1])

		chan_array = chan.split(",")
		length = len(chan_array)

		if length == 4 : 

			chan1 = chan_array[0]
			chan2 = chan_array[1]
			chan3 = chan_array[2]
			chan4 = chan_array[3]

			res = int(res)

			boss = BossRemote({
				"protocol":"https",
				"host":"api.theboss.io",
				"token": tok
			})

			volumeBOSScc = boss.get_cutout(
			    boss.get_channel(chan1, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			volumeBOSSmit = boss.get_cutout(
			    boss.get_channel(chan2, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			volumeBOSSsyn = boss.get_cutout(
			    boss.get_channel(chan3, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			volumeBOSSneu = boss.get_cutout(
			    boss.get_channel(chan4, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			fig1 = plt.figure(1)
			plt.imshow(volumeBOSScc[0,:,:])
			fig2 = plt.figure(2)
			plt.imshow(volumeBOSSmit[0,:,:])
			fig3 = plt.figure(3)
			plt.imshow(volumeBOSSsyn[0,:,:])
			fig4 = plt.figure(4)
			plt.imshow(volumeBOSSneu[0,:,:])

			fig1.savefig("cc.png")
			fig2.savefig("mit.png")
			fig3.savefig("syn.png")
			fig4.savefig("neu.png")

			#Blending all the images requires we assign a variable to each image.
			background = Image.open("cc.png")
			overlay1 = Image.open("mit.png")
			overlay2 = Image.open("syn.png")
			overlay3 = Image.open("neu.png")

			#This will blend all the images together.
			new_img = Image.blend(background, overlay1, 0.5)
			new_img2 = Image.blend(new_img, overlay2, 0.5)
			new_img3 = Image.blend(new_img2, overlay3, 0.5)

			new_img3.save("temp1.png", "PNG")
			filename2='temp1.png'
			with open("temp1.png","rb") as imageFile:
				imageString = base64.b64encode(imageFile.read())
		elif length == 3 :
			chan1 = chan_array[0]
			chan2 = chan_array[1]
			chan3 = chan_array[2]

			res = int(res)

			boss = BossRemote({
				"protocol":"https",
				"host":"api.theboss.io",
				"token": tok
			})

			volumeBOSScc = boss.get_cutout(
			    boss.get_channel(chan1, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			volumeBOSSmit = boss.get_cutout(
			    boss.get_channel(chan2, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			volumeBOSSsyn = boss.get_cutout(
			    boss.get_channel(chan3, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			fig1 = plt.figure(1)
			plt.imshow(volumeBOSScc[0,:,:])
			fig2 = plt.figure(2)
			plt.imshow(volumeBOSSmit[0,:,:])
			fig3 = plt.figure(3)
			plt.imshow(volumeBOSSsyn[0,:,:])

			fig1.savefig("cc.png")
			fig2.savefig("mit.png")
			fig3.savefig("syn.png")

			#Blending all the images requires we assign a variable to each image.
			background = Image.open("cc.png")
			overlay1 = Image.open("mit.png")
			overlay2 = Image.open("syn.png")

			#This will blend all the images together.
			new_img = Image.blend(background, overlay1, 0.5)
			new_img2 = Image.blend(new_img, overlay2, 0.5)

			new_img2.save("temp1.png", "PNG")
			filename2='temp1.png'
			with open("temp1.png","rb") as imageFile:
				imageString = base64.b64encode(imageFile.read())
		elif length == 2 :
			chan1 = chan_array[0]
			chan2 = chan_array[1]

			res = int(res)

			boss = BossRemote({
				"protocol":"https",
				"host":"api.theboss.io",
				"token": tok
			})

			volumeBOSScc = boss.get_cutout(
			    boss.get_channel(chan1, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			volumeBOSSmit = boss.get_cutout(
			    boss.get_channel(chan2, col, exp), res,
			    [x_start, x_stop], [y_start, y_stop], [z_start, z_stop],)

			fig1 = plt.figure(1)
			plt.imshow(volumeBOSScc[0,:,:])
			fig2 = plt.figure(2)
			plt.imshow(volumeBOSSmit[0,:,:])

			fig1.savefig("cc.png")
			fig2.savefig("mit.png")

			#Blending all the images requires we assign a variable to each image.
			background = Image.open("cc.png")
			overlay1 = Image.open("mit.png")

			#This will blend all the images together.
			new_img = Image.blend(background, overlay1, 0.5)

			new_img.save("temp1.png", "PNG")
			filename2='temp1.png'
			with open("temp1.png","rb") as imageFile:
				imageString = base64.b64encode(imageFile.read())
		else:
			imageString = "For just one channel please click Download entire data and specify slice"
		
		imageString = imageString
		return imageString

@api_app.route("/createCutBoss/<chan>/<col>/<exp>/<tok>/<xb>/<yb>/<zb>")
@cross_origin(supports_credentials=True)
def createCutBOSS(chan,col,exp,res,tok,xb,yb,zb):

		rmt = BossRemote({
		    "protocol": "https",
		    "host": "api.theboss.io",
		    "token": tok
		})

		COLL_NAME = col
		EXP_NAME = exp
		CHAN_NAME = chan

		# Create a new channel that uses uint16 data.
		chan_setup = ChannelResource(CHAN_NAME, COLL_NAME, 
			EXP_NAME,'image', datatype='uint16')
		chan = rmt.create_project(chan_setup)

		# Upload the cutout to the channel.  The zero parameter specifies native
		# resolution.
		rmt.create_cutout(chan, 0, x_rng, y_rng, z_rng, data)

		# Ranges use the Python convention where the second number is the stop
		# value.  Thus, x_rng specifies x values where: 0 <= x < 8.
		x_rng = [0, 8]
		y_rng = [0, 4]
		z_rng = [0, 5]

		# Note that the numpy matrix is in Z, Y, X order.
		data = numpy.random.randint(0, 3000, (5, 4, 8))
		# Make data match what was specified for the channel.
		data = data.astype(numpy.uint16)

		return 'Your data has been uploaded successfully!'


@api_app.route("/getCutDVID/<tag>/<xb>/<yb>/<zb>")
@cross_origin(supports_credentials=True)
def getChan_dvid(tag,xb,yb,zb):

	#Next three blocks of code split the x start and stop into an array
	#and calculate the amount of pixels desired in the x, y and z directions
	x_array = xb.split(",")
	x_start = int(x_array[0])
	x_stop = int(x_array[1])
	xpix = x_stop-x_start

	y_array = yb.split(",")
	y_start = int(y_array[0])
	y_stop = int(y_array[1])
	ypix = y_stop-y_start

	z_array = zb.split(",")
	z_start = int(z_array[0])
	z_stop = int(z_array[1])
	zpix = z_stop-z_start

	#makes sure the given tag is a string
	tag = str(tag)

	#calls the function in intern which allows for data download from DVID
	#Arguments:

	volumeDVID = DVIDRemote.get_cutout("http://34.200.231.1/api/node",tag, "grayscale", "raw", "xy", xpix, ypix, zpix, x_start, y_start, z_start)
	
	#Creates a figure
	figure1 = plt.figure(1)
	#Plots figure
	plt.imshow(volumeDVID[0], cmap="gray")
	#Saves the figure on the server as a temporary file
	figure1.savefig("temp2.png")
	filename2='temp2.png'
	#Encodes image as a 64 bit
	with open("temp2.png","rb") as imageFile:
		imageString = base64.b64encode(imageFile.read())
	#Returns specific string encode of the image
	return imageString

@api_app.route("/getCutDVIDnpy/<tag>/<xb>/<yb>/<zb>")
@cross_origin(supports_credentials=True)
def getChan_dvidnpy(tag,xb,yb,zb):

	#Next three blocks of code split the x start and stop into an array
	#and calculate the amount of pixels desired in the x, y and z directions
	x_array = xb.split(",")
	x_start = int(x_array[0])
	x_stop = int(x_array[1])
	xpix = x_stop-x_start

	y_array = yb.split(",")
	y_start = int(y_array[0])
	y_stop = int(y_array[1])
	ypix = y_stop-y_start

	z_array = zb.split(",")
	z_start = int(z_array[0])
	z_stop = int(z_array[1])
	zpix = z_stop-z_start

	#makes sure the given tag is a string
	tag = str(tag)

	#calls the function in intern which allows for data download from DVID
	#Arguments:

	volumeDVID = DVIDRemote.get_cutout("http://34.200.231.1/api/node",tag, "grayscale", "raw", "xy", xpix, ypix, zpix, x_start, y_start, z_start)
	volumeDVIDstr = str(volumeDVID)
	np.set_printoptions(threshold=np.nan)
	return print(volumeDVIDstr)

@api_app.route("/getHelp")
@cross_origin(supports_credentials=True)
def getHelp():
	return ("INTERNFACEMANUALWhat is InternFACE?" +
"InternFACE is designed to simplify the process for users wishing to access data from the BOSS and/or the DVID database." + 

"How to Access Data from the BOSS Database" +
"Security Permission:" +
"In order to access data from the BOSS, a user must generate a BOSS API Token. A user goes to https://api.theboss.io/v1/mgmt/token to receive their token. Each token is specific to every user. No more than one user can use a single token. Users enter their token into the text box under the APL BOSS button." +

"Specifying the Location:"
"To access a specific portion of data, a user must enter the Channel, Collection, Experiment, and Resolution in which the desired data can be found in the database." +

"Specifying the Size: " +
"A user must specify the desired x, y, and z bounds of the data they would like to access. These bounds must be entered in the form of two numbers (the first being the lower bound and the second being the upper bound) separated by a single comma." 
"Example: 10000,15000"+

"Saving Images:"+
"After data has been successfully accessed, the resulting image will be displayed under “Results” in the form of an image. In order to save the image, a user must right click on the image and select “Save Image As…”." 

"How to Upload Data to the BOSS Database"+
"Security Permission:"+
"Only users with specific tokens are permitted to upload data to the BOSS database. If you do not have permission to upload to BOSS, then you will be prompted with an error message if you attempt to upload data." +

"Specifying the Location:"+
"Just like what is required for downloading data from BOSS, a user must specify the Channel, Collection, and Experiment for the data they wish to upload. The Resolution value for uploaded data is 0 by default." +

""+
"Specifying the Size: "+
"Before uploading data to BOSS, a user must specify the x, y, and z bounds for the data they wish to upload. These bounds must be entered in the form of two numbers (the first being the lower bound and the second being the upper bound) separated by a single comma. Unlike downloading data, the bounds for uploading data must be between 0 and 8."+ 
"Example: 0,8 or 1,5"+

"How to Access Data from the DVID Database"+
"Security Permission:"+
"In order to access data from DVID, a user must provide the DVID API address and specific 32 character-long location tag for the data they wish to download. Note: the DVID API address should be entered without “http://” or domain name (.com, .edu, etc). "+
 
"Specifying the Size:"+
"A user must specify the desired x, y, and z bounds of the data they would like to access. These bounds must be entered in the form of two numbers (the first being the lower bound and the second being the upper bound) separated by a single comma. "+
"Example: 10000,15000"+

"How to Upload Data to the DVID Database "+
"Specifying the Size:"+
"Before uploading data to DVID, a user must specify the x, y, and z bounds for the data they wish to upload. These bounds must be entered in the form of two numbers (the first being the lower bound and the second being the upper bound) separated by a single comma. Unlike downloading data, the bounds for uploading data must be between 0 and 8."+ 
"Example: 0,8 or 1,5"+

"Using Location Tag:"+
"After you upload data to DVID, you will be automatically assigned a 32 character-long location tag that is specific to your portion of data. This tag is confidential and should be kept private. "+
"More Questions? Send an email to dataaccessAPL@gmail.com!"
)
api_app.run(debug=True)

#STRICTLY FOR TESTING:
#http://34.200.231.1/api/node
#5cc94d532799484cb01788fcdb7cd9f0
#grayscale
#raw
#xy
#2050,2050,20,2050,2060,1380
#http://localhost:5000/getCutDVID/5cc94d532799484cb01788fcdb7cd9f0/2050,4100/2050,4100/1380,1390