//var firebase = require('firebase');
//var fire = new firebase('https://abhi.firebaseio.com');

var express = require("express");
var app = express();
var url = require("url");
app.use(express.logger());
var port = process.env.PORT || 5001;
app.listen(port, function() {
    console.log("Client listening on " + port);
});

var nonDormIndividuals = {
	name: ['Abhi', 'Emanuel'],
	phone: ['+13473076953']
};
var dormsIndividuals = {
	name: ['Bob', 'Abhinay', 'Ben', 'Max', 'Terri', 'Kim'],
	phone: ['+14256149938']
};
var twilio = require('twilio')('ACd44100ff63d9f063b149272c1c9b8f64', '372306737e389b83729d9d7f5c0fe1e2');
var techatnyuNumbers = ['+13473076953', '+14256149938'];

var sendAllSMS = function(){
	for(smsNumber in techatnyuNumbers){
		twilio.sendMessage({
			to: techatnyuNumbers[smsNumber],
			from: '+14423337001',
			body: 'hello yo'
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

app.all('/getsms', function(req, res) {
	var message = req.query.Body;
    var from = req.query.From;
    console.log(from + message);
});
