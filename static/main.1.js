var socket = io(location.href);
var mic;
var colors = ['#F9690E', '#F22613', '#FF0000', '#1BA39C', '#36D7B7', '#3FC380', '#59ABE3'];

var rSlider;
var cv;

function setup() {
  /* var cv = createCanvas(500, 120);
  cv.parent("Micanvas1"); */

  cv = createSlider(0, 13, 0);
  cv.parent("Micanvas1");
 /*  rSlider.position(10, 130); */
}

function draw() {
  var val = cv.value();
 /*  background(200); */
  console.log(val);
  socket.emit('data', val);  
}
