/*This is a simple flappy bird game made with canvas
There is no concern for performance or
score in this*/

// Getting canvas object and context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// Declaring canvas attributes
var cWidth = 500;
var cHeight = 300;

// Creating obstacles array
var obst = [];

// Number of frames, used to create objects
var frames = 0;

// Create the obstacle class
function obstacle(x,y,gap,width,height) {
	this.x = x;
  this.y = y;
  this.gap = gap;
  this.width = width;
  this.height = height;
  this.newX = function() {
  	this.x -= 2;
  };
};
// Creating the player object
var player = {
	x:30,
  y:cHeight / 2,
  width:20,
  height:20,
  alive: true,
  speed: -0.1
};

// Create a random number generator for object randomizing
function rNum(max,min) {
	var number = Math.floor(Math.random() * (max + 1 - min) + min);
  return number;
};

// Crash function
function crash(obstacle) {
	if (
  (((player.x > obstacle.x) && (player.x < obstacle.x + obstacle.width)) || (player.x + player.width > obstacle.x) 	&& (player.x + player.width < obstacle.x + obstacle.width)) && ((player.y < obstacle.height) || (player.y > obstacle.height + obstacle.gap))
  ) {
  	player.alive = false;
  };
};

// Animation frame
function newFrame() {
	// Establish the velocity of the player, max is 5
  player.speed -= 0.3;
  if (player.speed < -5){
  	player.speed = -5;
  };
  
  // Adding borders so you can't go too far up or down
  if (player.y < 0) {
  	player.y = 0;
    player.speed = 0;
  } else if (player.y > cHeight - player.height - 5) {
  	player.y = cHeight - player.height - 5;
  };
  
  // Change y by speed
  player.y -= player.speed;

	// Fading animation
  ctx.fillStyle = "rgba(239,239,239,0.3)";
  ctx.fillRect(0,0,cWidth,cHeight);
  
  // Draw player
	ctx.fillStyle = "rgba(39,177,255,1)";
  ctx.fillRect(player.x,player.y,player.width,player.height);
  
  // Create new object at interval
  if (frames % 100 == 0) {
  	obst.push(new obstacle(cWidth,0,rNum(100,120),40,rNum(50,250)));
 };

  // Loop through objs array
  for(var i = 0;i < obst.length;i++) {
  	obst[i].newX();
    ctx.fillStyle = "rgba(102,255,153,1)";
    ctx.fillRect(obst[i].x,obst[i].y,obst[i].width,obst[i].height);
    ctx.fillRect(obst[i].x,obst[i].height + obst[i].gap,obst[i].width,250);
    crash(obst[i]);
 };
  
  document.getElementById("frames").innerHTML = "Score: " + frames;
  
  // If dead stop game
  if (player.alive) {
  	window.requestAnimationFrame(newFrame);
  };
  frames += 1;
};

// Creating jumping
document.body.addEventListener("keydown",function() {
	player.speed = 6;
});

// Call animation
newFrame();
