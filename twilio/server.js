var firebase = require('firebase');
var fireClientDeliveries = new firebase('https://brilliant-fire-2550.firebaseio.com/deliveries');;
var express = require("express");
var app = express();
var url = require("url");
var queue = [];
var port = process.env.PORT || 5001;
app.use(express.logger());
app.listen(port, function() {
    console.log("Client listening on " + port);
});

var WSPrequests = [];
var Greenwichrequests = [];
var UnionSquarerequests = [];
var SOHOrequests = [];
var ThirdAverequests = [];
var Gramarcyrequests = [];

var WSPLocations = ['Weinstein Hall', 'Hayden Hall', 'Founders Hall', 'Brittany Hall', 'Goddard Hall', 'Rubin Hall'];
var GreenwichLocations = ['Greenwich Hotel'];
var UnionSquareLocations = ['Carlyle Court', 'Coral Towers', 'Palladium Hall', 'W. 13th Street', 'University Hall'];
var SOHOLocations = ['Broome Street', 'Lafayette Hall', 'Second Street'];
var ThirdAveLocations = ['Alumni Hall', 'Seventh Street', 'Third Avenue North'];
var GramarcyLocations = ['Gramercy Green', '26th Street'];

var WSP = [];
var Greenwich = [];
var UnionSquare = [];
var SOHO = [];
var ThirdAve = [{'Bob', '+14256149938', 0}];
var Gramarcy = [];
var Others = [{'Emanuel', '+13476068244', 0}];

var determinePhoneByLocation = function(location){
	if(WSPLocations.indexOf(location) >= 0){

	} else if(GreenwichLocations.indexOf(location) >= 0){

	} else if(UnionSquareLocations.indexOf(location) >= 0){

	} else if(SOHOLocations.indexOf(location) >= 0) {

	} else if(ThirdAveLocations.indexOf(location) >= 0) {

	} else if(GramarcyLocations.indexOf(location) >= 0) {

	}
};

var addtoQueue = function(){

};

var techatnyuNumbers = ['+13473076953'];

var submitRequestToIndividual = function(request, giveRequestTo){
	twilio.sendMessage({
		to: giveRequestTo,
		from: '+14423337001',
		body: "Location: " + request.location + ", Name: " + request.name + ", Phone Number: " + request.phonenumber
	}, function(err, responseData){
		if(!err){
			console.log(responseData.from);
			console.log(responseData.body);
		} else {
			console.log(err);
		}
	});
};

var sendAllTechatNYUPeopleSMS = function(){
	for(smsNumber in techatnyuNumbers){
		twilio.sendMessage({
			to: techatnyuNumbers[smsNumber],
			from: '+14423337001',
			body: "Hey y'all Tech@NYU peeps, Valentines day is beginning. Lets do this. - valentinebot"
		}, function(err, responseData){
			if(!err){
				console.log(responseData.from);
				console.log(responseData.body);
			} else {
				console.log(err);
			}
		});
	}
};

var sendSMSforConfirmation = function(name, phonenumber, location, recipient){
	twilio.sendMessage({
			to: phonenumber,
			from: '+14423337001',
			body: "Hey " + name + " we're out to deliver the rose for " + recipient + " now :) It will be at " + location + " soon!"
	}, function(err, responseData){
		if(err){
			console.log(err);
		}
	});
};

var incomingRequest = function(ID, requestData){
	var name = requestData["sender"];
	var recipient = requestData["recipient"];
	var phonenumber = requestData["phoneNumber"];
	var location = (requestData["dorm"]) + " " + (requestData["roomNumber"]);
	var obj = {ID:ID, name:recipient, phonenumber:phonenumber, location:location};
	queue.push(obj);
	addtoQueue(obj));
	sendSMSforConfirmation(name, phonenumber, location, recipient);
};

var finishRequest = function(ID){
	var fireClientOutDeliveries = new firebase('https://brilliant-fire-2550.firebaseio.com/outdeliveries/' + ID);
	fireClientOutDeliveries.set(userData);
};

fireClientDeliveries.on('child_added', function(snapshot){
	var ID = snapshot.name(), requestData = snapshot.val();
	incomingRequest(ID, requestData);
});

app.all('/getsms', function(req, res){
	var message = req.query.Body;
    var from = req.query.From;
    if(techatnyuNumbers.indexOf(from) >= 0){
    	if(message.toLowerCase() == "done"){
    		if(queue.length != 0){
    			submitRequestToIndividual(queue[0], from);
    			queue.shift();
    		} else {
    			twilio.sendMessage({
					to: from,
					from: '+14423337001',
					body: "All requests have been filled??"
				}, function(err, responseData){
					if(err){
						console.log(err);
					}
				});
    		}
    	}
    }
});
