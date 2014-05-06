var firebase = require('firebase');
var fireClientDeliveries = new firebase('');;

fireClientDeliveries.on('child_added', function(snapshot){
  var userName = snapshot.name();
  userData = snapshot.val();
  console.log(userData["recipient"]);
});
