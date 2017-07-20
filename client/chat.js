
var allow = false;
var io = require('socket.io-client'),
socket = io.connect('https://sc.lefty.cf', {
    port: 443
});

socket.on("a-join", function(msg) {
  if (msg == "ACCEPT") {
    allow = true;
    console.log('------ CONNECTION SUCCESS ------');
    promptMe();
  } else {
    console.log("------ REJECTED ------");
    process.exit(1);
  }
  });

socket.on("recieve", function(msg) {
  if (allow == true) {
  console.log(decrypt(msg[0]) + ": " + decrypt(msg[1]));
}
});

//from http://lollyrock.com/articles/nodejs-encryption/
var username, socket;
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '00';

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

    // end

    // from https://www.npmjs.com/package/prompt


        var schema = {
      properties: {
        username: {
          pattern: /^[a-zA-Z\s\-]+$/,
          message: 'Name must be only letters, spaces, or dashes, this value is required',
          required: true
        },
        room_password: {
          hidden: true,
          message: 'Room Password',
          required: true
        }
      }
    };


    var prompt = require('prompt');


    //
    // Start the prompt
    //
    prompt.start();

    //
    // Get two properties from the user: username and email
    //
    prompt.get(schema, function (err, result) {

      console.log('------ RECIEVED DATA ------');
      console.log('  username: ' + result.username);
      //console.log('  room-password: ' + result.room_password);
      username = result.username;
      password = result.room_password;


      console.log('------ CONNECTING ------');




    socket.emit("join", [encrypt("HANDSHAKE"), encrypt(username)]);





    });
 // end
 var schema2 = {
properties: {
 message: {
   required: true,
   description: '>'
 }
 }
};

 function promptMe() {
   prompt.get(schema2, function (err, result) {
   socket.emit("send", [encrypt(username), encrypt(result.message)]);
   console.log("You: " + result.message);
    promptMe();
 });
 }
