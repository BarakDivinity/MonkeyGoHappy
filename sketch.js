
var monkey , monkey_running,monkeyImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,backgroundImg,gameOverImg;
var ground,dieSound,jumpSound,gameOver;
PLAY=1;
END=0;
var gameState=PLAY;

score=0;

function preload(){
  
  monkey_running =loadAnimation("Images/sprite_0.png","Images/sprite_1.png","Images/sprite_2.png","Images/sprite_3.png","Images/sprite_4.png","Images/sprite_5.png","Images/sprite_6.png","Images/sprite_7.png","Images/sprite_8.png")
  
  bananaImage = loadImage("Images/banana.png");
  obstacleImage = loadImage("Images/obstacle.png");
  monkeycollided=loadAnimation("Images/sprite_0.png");
  backgroundImg=loadImage("Images/background.jpg");

  dieSound=loadSound("Sounds/die.mp3");
  jumpSound=loadSound("Sounds/jump.mp3");

  gameOverImg=loadImage("Images/gameover.jpg");

}


function setup() {
  createCanvas(600,400)
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("gameover",monkeycollided);
  monkey.scale=0.1;
  //monkey.debug=true;
  
  ground=createSprite(300,345,700,5);
  ground.visible=false;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);

  gameOver=createSprite(300,200,100,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  gameOver.scale=1.45;
  
}

function draw() {
  background(backgroundImg);
  
  strokeWeight(2);
  stroke("Black");
  fill("white");
  textSize(15);
  text("Survival Time:"+score,400,90);
  
  if(gameState===PLAY) {
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4 + 3* score/100)
    
    if(ground.x<200) {
      ground.x=ground.width/2
    }
    
  if(keyDown("space")&&monkey.y>=311.8) {
    monkey.velocityY=-18;
    jumpSound.play();
    }
  
    monkey.velocityY=monkey.velocityY+0.9;
    
    spawnbananas();
    spawnobstacles();
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
    }
 }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    dieSound.play();
    monkey.remove();
  }

  if(gameState===END) {
    gameOver.visible=true;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    monkey.changeAnimation("gameover",monkeyImage);
    monkey.velocityY=0;
  }
  
   monkey.collide(ground)
  
   drawSprites();
}
  
function spawnbananas() {
  if(frameCount%80===0) {
     banana=createSprite(600,100,20,20);
     banana.velocityX=-6;
     banana.addImage(bananaImage)
     banana.scale=0.1;
    
     banana.y=Math.round(random(120,220))
     banana.lifetime=100;
     banana.depth=gameOver.depth;
     gameOver.depth=gameOver.depth+1;
     
     FoodGroup.add(banana)
     
  }
}

function spawnobstacles() {
  if(frameCount%100===0) {
    obstacle=createSprite(600,315,20,20);
    obstacle.velocityX=-(6 + score/100);
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.15;
    obstacle.lifetime=100;
    //obstacle.debug=true
    obstacle.setCollider("rectangle",0,0,430,350)
    obstacle.depth=gameOver.depth;
    gameOver.depth=gameOver.depth+1;
    
    obstacleGroup.add(obstacle)
  }
}
