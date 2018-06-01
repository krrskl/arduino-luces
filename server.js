var five = require("johnny-five");
var express = require('express');
var app = express();
const path = require('path');
var fs = require('fs');
var forceSsl = require('express-force-ssl');
var key = fs.readFileSync('privateKey.key').toString();
var cert = fs.readFileSync('certificate.crt').toString();
var options = {
    key: key,
    cert: cert
};

app.use(forceSsl);
app.use(express.static(__dirname + '/'));
var https = require('https').createServer(options, app);
var io = require('socket.io')(https);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

https.listen(8100, '192.168.1.23', function () {
    console.log("corriendo");
});

var pin2;
var pin3;
var pin4;
var pin5;
var pin6;
var pin7;
var pin8;
var pin9;
var pin10;
var pin11;
var pin12;
var pin13;


var board = new five.Board();


board.on("ready", function () {
    pin2 = new five.Pin(2);
    pin3 = new five.Pin(3);
    pin4 = new five.Pin(4);
    pin5 = new five.Pin(5);
    pin6 = new five.Pin(6);
    pin7 = new five.Pin(7);
    pin8 = new five.Pin(8);
    pin9 = new five.Pin(9);
    pin10 = new five.Pin(10);
    pin11 = new five.Pin(11);
    pin12 = new five.Pin(12);
    pin13 = new five.Pin(13);

    io.sockets.on('connection', function (socket) {
        socket.on('data', function (n) {
        });

        socket.on('slider', function(n){
        });
    })
});


function encenderSlider(n){
    if(n>=2 && n<= 13){
        for (i = 2; i <= n; i++) {
            eval('pin' + i).high();
        }
    }
}

/* Vumetro */
function encender(n) {
    if (n >= 2 && n <= 13) {
        for (i = 2; i <= n; i++) {
            eval('pin' + i).high();
        }
        board.wait(100, function () {
            for (i = n; i >= 2; i--) {
                eval('pin' + i).low();
            }
        });
    }
}
