process.on('uncaughtException', function (err) {
  console.log("Error: " + err);
});

var app = require('express')();
var http = require('http').Server(app);
 var io = require('socket.io')(http);
 var port = "44443";


 var crypto = require('crypto'),
     algorithm = 'aes-256-ctr',
     password = 'T0PSecr3t';

 function encrypt(text){
       var cipher = crypto.createCipher(algorithm,password)
       var crypted = cipher.update(text,'utf8','hex')
       crypted += cipher.final('hex');
       return crypted;
     }

 function decrypt(text){
       var decipher = crypto.createDecipher(algorithm,password)
       var dec = decipher.update(text,'hex','utf8')
       dec += decipher.final('utf8');
       return dec;
     }




 io.on('connection', function(socket){

   socket.on('join', function(message) {
     if (decrypt(message[0]) == "HANDSHAKE") {
     this.emit("a-join", "ACCEPT");
     socket.broadcast.emit("recieve", [encrypt("@SERVER"), encrypt(decrypt(message[1]) + " joined the server")]);

   } else {
     console.log(decrypt(message));
     this.emit("a-join", "DENY");

   }
 	});
  socket.on("send", function(msg) {
   socket.broadcast.emit("recieve", msg);
   });
 });



 http.listen(port, function(){
   console.log('Encrypted server started. listening on port ' + port, 0);
 });
