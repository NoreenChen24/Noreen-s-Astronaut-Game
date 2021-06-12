var PLAY = 1;
var END = 0;
var gameState = PLAY;
var astronaut;
var astronautImg;
var bg;
var bgImg;
var invisibleGround;
var obstacle1, obstacle2, obstacle3;
var score;
var gameOverImg, resetImg;
var astronaut2;


function preload(){
  astronautImg = loadImage('Images/astronaut.png');
  astronaut2Img = loadImage('Images/astronaut2.png');
  bgImg = loadImage('Images/spaceBackground.jpeg');
  obstacle1_Img = loadImage('Images/obstacle1.png');
  obstacle2_Img = loadImage('Images/obstacle2.png');
  obstacle3_Img = loadImage('Images/obstacle3.png');
  star1_Img = loadImage('Images/star.gif');
  star2_Img = loadImage('Images/star2.png');
  star3_Img = loadImage('Images/star3.png');
  gameOverImg = loadImage('Images/gameOver.jpeg');
  resetImg = loadImage('Images/reset.png');

}

function setup() {
  createCanvas(1000,500);

  bg = createSprite(500,250);
  bg.addImage("bg", bgImg);
  bg.scale = 1.0;
  

  score = 0;

  astronaut = createSprite(50,400);
  astronaut.addImage("astronaut", astronautImg);
  astronaut.addImage("collided", astronaut2Img);
  astronaut.scale = 0.5;

  gameOver = createSprite(500,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;

  reset = createSprite(500,300);
  reset.addImage(resetImg);
  reset.scale = 0.2;
  

  invisibleGround = createSprite(250,490,1000,10);
  invisibleGround.visible = false;

  obstacleGroup = createGroup();
  star1Group = createGroup();
  star2Group = createGroup();
  star3Group = createGroup();
  astronaut.setCollider("rectangle", 0, 0, 220, astronaut.height);
  //astronaut.debug = true;
}

function draw() {
  background(0);  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    reset.visible = false;

    bg.velocityX = -4;

    if(bg.x < 0){
      bg.x = bg.width/2;
    } 
  
    if(keyDown("space")){
      astronaut.velocityY = -10;
    }
    astronaut.velocityY = astronaut.velocityY + 0.8;

    spawnObstacles();
    spawnStar1();
    spawnStar2();
    spawnStar3();

    if(star1Group.isTouching(astronaut)){
      score = score + 2;
    }
    if(star2Group.isTouching(astronaut)){
      score = score + 3;
    }
    if(star3Group.isTouching(astronaut)){
      score = score + 5;
    }

    if(obstacleGroup.isTouching(astronaut)){
      gameState = END;
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    reset.visible = true;
    bg.velocityX = 0;
    astronaut.velocityY = 0;

    astronaut.changeAnimation("collided", astronaut2Img);
    obstacleGroup.setLifetimeEach(-1);
    star1Group.setLifetimeEach(-1);
    star2Group.setLifetimeEach(-1);
    star3Group.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    star1Group.setVelocityXEach(0);
    star2Group.setVelocityXEach(0);
    star3Group.setVelocityXEach(0);
    
    if(mousePressedOver(reset)){
      restart();
    }
  }

  
  astronaut.collide(invisibleGround);

  drawSprites();
  stroke("white");
  textSize(30);
  text("Score: " + score, 750, 50);
}

function spawnObstacles(){
  if(frameCount%60 === 0){
    var obstacle = createSprite(900, 420, 10, 40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addImage(obstacle1_Img);
      break;
      case 2: obstacle.addImage(obstacle2_Img);
      break;
      case 3: obstacle.addImage(obstacle3_Img);
      break;
      default: break;
    }
    obstacle.scale = 0.3;
    obstacle.lifetime = 150;

    obstacleGroup.add(obstacle);

  }
}

function spawnStar1(){
  if(frameCount%180 === 0){
    star1 = createSprite(900, 300, 10, 40);
    star1.y = Math.round(random(300, 400));
    star1.addImage(star1_Img);
    star1.velocityX = -3;
    star1.scale = 0.3;
    star1.lifetime = 300;
    star1Group.add(star1);
  }

}

function spawnStar2(){
  if(frameCount%280 === 0){
    star2 = createSprite(900, 300, 10, 40);
    star2.y = Math.round(random(250,350));
    star2.addImage(star2_Img);
    star2.velocityX = -4;
    star2.lifetime = 225;
    star2.scale = 0.2;
    star2Group.add(star2);
  }
}

function spawnStar3(){
  if(frameCount%400 === 0){
    star3 = createSprite(900,300,10,40);
    star3.y = Math.round(random(250,400));
    star3.addImage(star3_Img);
    star3.velocityX = -5;
    star3.lifetime = 180;
    star3.scale = 0.2;
    star3Group.add(star3);
  }
}

function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  reset.visible = false;
  obstacleGroup.destroyEach();
  star1Group.destroyEach();
  star2Group.destroyEach();
  star3Group.destroyEach();
  score = 0;
  astronaut.changeAnimation("astronaut", astronautImg);
}