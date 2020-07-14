var monkey,banana,obstacle,backGround,score,invisibleGround,
gameState,PLAY,END,gameOver,restart,touch,
monkeyRunning,bananaImage,obstacleImage,backImage,
gameOverImage,
restartImage,
BananaGroup, ObstacleGroup;


function preload(){

  monkeyRunning=loadAnimation("Monkey_03.png",
  "Monkey_02.png","Monkey_01.png","Monkey_10.png",
  "Monkey_08.png","Monkey_09.png","Monkey_07.png",
  "Monkey_05.png","Monkey_06.png","Monkey_04.png");
  backImage = loadImage("jungle.jpg");
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png");
  groundImage = loadImage("ground.jpg");
}

function setup() {
  createCanvas(600,300);
   
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  backGround= createSprite(300,150,1000,30);
  backGround.addImage("back",backImage);
  backGround.scale = 0.85;
  backGround.velocityX = -4;
  
  monkey = createSprite(80,270,20,20);
  monkey.addAnimation("animal",monkeyRunning);
  monkey.scale = 0.08;
  
  gameOver = createSprite(300,150,20,20);
  gameOver.addAnimation("gameover",gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,180,20,20);
  restart.addAnimation("restart",restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  BananaGroup = new Group();
  ObstacleGroup = new Group();
  
  touch = 0;
  
  score = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  

}


function draw(){
 background(255); 
  

  
  if(gameState === PLAY){
    
  
      if(keyDown("space")&&monkey.y>=150 ){
     monkey.velocityY = -12 ;
     
    }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
  
  
   if(monkey.isTouching(BananaGroup)){
      BananaGroup.destroyEach();
      score = score+1;
      }
  

  
  switch(score){
      
    case 10: monkey.scale = 0.09;
           break;
    case 20: monkey.scale = 0.10;   
           break;
    case 30: monkey.scale = 0.11;
           break;
    case 40: monkey.scale = 0.12;
           break;
     default: break;
     
  }
  
    if (backGround.x < 170){
      
      backGround.x = backGround.width/4;
    }

   food();
   stone();
    

    
  if(touch===0&&monkey.isTouching(ObstacleGroup))
     {
       if(score === 10||score === 20||score === 30||
         score === 40){
         score = score-1
       }
      monkey.scale = 0.08;
      touch = touch+1
      ObstacleGroup.destroyEach();
      
     }
    

    
  else if(touch === 1&&monkey.isTouching(ObstacleGroup))
     {
      gameState = END;
     }


  }
  
  else if(gameState === END){
    backGround.velocityX = 0;
    
   ObstacleGroup.setVelocityXEach(0);
   BananaGroup.setVelocityXEach(0);
    
    BananaGroup.setLifetimeEach(-1);
    ObstacleGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      

  monkey.addAnimation("animal",monkeyRunning);
  monkey.scale = 0.08;
     
      
       
      
      gameState = PLAY;
      
    backGround.velocityX = -4;
    
    ObstacleGroup.destroyEach();
    BananaGroup.destroyEach();
      
    gameOver.visible = false;
    restart.visible = false;
      
    score = 0;
      
    touch = 0;
      
    }
  }
  
   monkey.collide(invisibleGround);
  
  drawSprites();
  text("score = "+score,500,50)
  text(mouseX+" "+mouseY,50,50);
}

function food (){
  if(World.frameCount % 130 === 0){
    banana = createSprite(600,250,20,20);
    banana.addImage("fruit",bananaImage);
    banana.scale = 0.03;
    var rand = random(50,150);
    banana.y = rand;
    banana.velocityX = -4;
    banana.lifetime = 150;
    BananaGroup.add(banana);
  }
}
function stone() {
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite(600,260,20,20);
    obstacle.addImage("stone",obstacleImage);
     obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    ObstacleGroup.add(obstacle);
  }
}