var firebase = require('firebase');
var fireClientDeliveries = new firebase('https://brilliant-fire-2550.firebaseio.com/deliveries');;

fireClientDeliveries.on('child_added', function(snapshot){
  var userName = snapshot.name();
  userData = snapshot.val();
  console.log(userData["recipient"]);
});
