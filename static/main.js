var socket = io(location.href);
var mic;
var colors = ['#F9690E', '#F22613', '#FF0000', '#1BA39C', '#36D7B7', '#3FC380', '#59ABE3'];

var osc, fft, slider, button;
var estado = 0;
var cv;

function setup() {
  cv = createCanvas(350, 120);
  cv.parent("Micanvas");

  slider = createSlider(0, 13, 0);
  slider.parent("Micanvas");

  noFill();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  button = createButton('CAMBIAR');
  button.position(40, 67);
  button.mousePressed(opcion);
}

function slidere(n) {
  if (estado == 1) {
    console.log("moviendo " + n);
    socket.emit('slider', n);
  }
}

function opcion() {
  if(estado == 0){
    estado = 1;
  }else{
    estado = 0;
  }
}

function draw() {
  if (estado == 0) {
    rectMode(CENTER);
    translate(175, 50);
    background("rgba(0,0,0,0.5)");
    var vol = mic.getLevel();
    var val = parseInt(map(vol, 0, 0.5, 1, 30));
    fill(random(colors));
    for (i = 200, j = 0; i >= 0, j <= val; i -= 10, j += 1) {
      rect(i, 10, 8, j * 3);
    }
    for (i = -200, j = 0; i <= 0, j <= val; i += 10, j += 1) {
      rect(i, 10, 8, -j * 3);
    }
    socket.emit('data', val);
  }else{
    rectMode(CENTER);
    translate(175, 50);
    background("rgba(0,0,0,0.5)");
    fill("#fff");
    for (i = 200, j = 0; i >= 0, j <= slider.value(); i -= 10, j += 1) {
      rect(i, 10, 8, j * 3);
    }

    for (i = -200, j = 0; i <= 0, j <= slider.value(); i += 10, j += 1) {
      rect(i, 10, 8, -j * 3);
    }
    slidere(slider.value());
  }
}