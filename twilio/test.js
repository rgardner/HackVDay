var firebase = require('firebase');
var fireClient = new firebase('https://brilliant-fire-2550.firebaseio.com/deliveries');


fireClient.on('child_added', function(snapshot) {
  var userName = snapshot.name(), userData = snapshot.val();
  console.log('User ' + userName + ' has entered the chat');
});
