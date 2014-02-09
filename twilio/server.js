var firebase = require('firebase');
var fireClientDeliveries = new firebase('https://brilliant-fire-2550.firebaseio.com/deliveries');;
var express = require("express");
var app = express();
var url = require("url");
var port = process.env.PORT || 5001;
app.use(express.logger());
app.listen(port, function() {
    console.log("Client listening on " + port);
});
var twilio = require('twilio')('ACd44100ff63d9f063b149272c1c9b8f64', '372306737e389b83729d9d7f5c0fe1e2');

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

var WSP = [''];
var Greenwich = [''];
var UnionSquare = [''];
var SOHO = [''];
var ThirdAve = ['+13473076953'];
var Gramarcy = [''];
var Others = [''];

var determinePhoneByLocation = function(location, obj){
	if(WSPLocations.indexOf(location) >= 0){
		WSPrequests.push(obj);
	} else if(GreenwichLocations.indexOf(location) >= 0){
		Greenwichrequests.push(obj);
	} else if(UnionSquareLocations.indexOf(location) >= 0){
		UnionSquarerequests.push(obj);
	} else if(SOHOLocations.indexOf(location) >= 0) {
		SOHOrequests.push(obj);
	} else if(ThirdAveLocations.indexOf(location) >= 0) {
		ThirdAverequests.push(obj);
	} else if(GramarcyLocations.indexOf(location) >= 0) {
		Gramarcyrequests.push(obj)
	}
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
	determinePhoneByLocation(location, obj);
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

var filledForNow = function(from){
    twilio.sendMessage({
		to: from,
		from: '+14423337001',
		body: "All requests have been filled?? FOR NOW :)"
		}, function(err, responseData){
			if(err){
				console.log(err);
			}
	});
}

app.all('/getsms', function(req, res){
	var message = req.query.Body;
    var from = req.query.From;
    if(techatnyuNumbers.indexOf(from) >= 0){
    	if(message.toLowerCase() == "done"){
    		if(WSP.indexOf(from) >= 0){
    			if(WSPrequests.length != 0){
	    			submitRequestToIndividual(WSPrequests[0], from);
	    			WSPrequests.shift();
    			} else {
    				filledForNow(from);
    			}
    		} else if(Greenwich.indexOf(from) >= 0){
    			if(Greenwichrequests.length != 0){
	    			submitRequestToIndividual(Greenwichrequests[0], from);
	    			Greenwichrequests.shift();
    			} else {
    				filledForNow(from);
    			}
    		} else if(UnionSquare.indexOf(from) >= 0){
    			if(UnionSquarerequests.length != 0){
	    			submitRequestToIndividual(UnionSquarerequests[0], from);
	    			UnionSquarerequests.shift();
	    		} else {
	    			filledForNow(from);
	    		}
    		} else if(SOHO.indexOf(from) >= 0){
    			if(SOHOrequests.length != 0){
	    			submitRequestToIndividual(SOHOrequests[0], from);
	    			SOHOrequests.shift();
	    		} else {
	    			filledForNow(from);
	    		}
    		} else if(ThirdAve.indexOf(from) >= 0){
    			console.log(ThirdAverequests);
    			if(ThirdAverequests.length != 0){
	    			submitRequestToIndividual(ThirdAverequests[0], from);
	    			ThirdAverequests.shift();
	    		} else {
	    			filledForNow(from);
	    		}
    		} else if(Gramarcy.indexOf(from) >= 0){
    			if(Gramarcyrequests.length != 0){
	    			submitRequestToIndividual(Gramarcyrequests[0], from);
	    			Gramarcyrequests.shift();
	    		} else {
	    			filledForNow(from);
	    		}
    		}
    	}
    }
});
