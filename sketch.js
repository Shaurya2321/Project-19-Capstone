var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOverImg;
var gameOver;
var reset;
var resetImage
var PLAY = 1;
var END = 2;
var GAMESTATE = PLAY;
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("coin.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostJumping = loadImage("ghost-jumping.png");
  gameOverImg = loadImage("gameOver.png");
  resetImage = loadImage("resetImage.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(300,500);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
 ghost.debug = false;
 ghost.setCollider("circle",0,0,40)

 gameOver = createSprite(300,300);
 gameOver.addImage(gameOverImg);
 gameOver.visible = false;

 reset = createSprite(300,380);
 reset.addImage(resetImage);
 reset.scale = 0.4;
 reset.visible = false;
 
  edge = createEdgeSprites();

  climberGroup = new Group();
  doorsGroup = new Group();
}

function draw() {
  background(200);
  
  if (GAMESTATE === PLAY) {
        
    if(tower.y > 400){
        tower.y = 300
      }
      if (keyDown("space")) {
        //ghost.changeImage(ghostJumping);
        ghost.velocityY = -5
      }
      //ghost.changeImage(ghostImg);
      ghost.velocityY = ghost.velocityY + 0.2

      
  
      if (keyDown(RIGHT_ARROW)&&ghost.x<500) {
        ghost.x = ghost.x + 5;
      }
      if (keyDown(LEFT_ARROW)&&ghost.x>110) {
        ghost.x = ghost.x - 5;
      }
      if (ghost.isTouching(climberGroup)) {
        GAMESTATE = END
      }
      if(ghost.isTouching(doorsGroup)) {
        score = score+1;
        //doorsGroup.destroyEach();
        //climberGroup.destroyEach();
        ghost.x += 50;
      }
      
      spawnDoors();
      
  }
 else if (GAMESTATE === END) {
    climberGroup.setVelocityYEach(0);
    doorsGroup.setVelocityYEach(0);
    climberGroup.destroyEach();
    doorsGroup.destroyEach();
    ghost.velocityX = 0;
    ghost.velocityY = 0;
    tower.y = 0;
    gameOver.visible = true;
    reset.visible = true;
    if (mousePressedOver(reset)) {
      resetGame();
    }      

  }
  ghost.collide(edge[3]);
  drawSprites();
  text("Score: "+score,500,50);
}

function resetGame() {
  GAMESTATE = PLAY;
  reset.visible = false;
  gameOver.visible = false;
  score = 0;

}


function spawnDoors() {
  if (frameCount%80===0) {
    doors = createSprite(random(100,500),50);
    doors.velocityY = 3;
    doors.debug = false;
    doors.scale = 0.04
    doors.addImage(doorImg);
    climber = createSprite(doors.x,doors.y+65);
    climber.velocityY = doors.velocityY;
    climber.addImage(climberImg);
    ghost.depth = doors.depth+1;
    doorsGroup.add(doors);
    climberGroup.add(climber);
  }
}


  
   
    

  

  
  


