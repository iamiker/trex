var trex, trex_running, trex_collided,trexEnd;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var Cactus1,Cactus2,Cactus3,Cactus4,Cactus5,Cactus6;
var cactusImage1,cactusImage2,cactusImage3,cactusImage4,cactusImage5,cactusImage6;
var puntaje;
var cactusGroup,cloudGroup,pterodactiloGroup;
var gameState,play,end;
var pterodactilo,pterodactilofly;
var trex_crouching;
var dead,dead1,dead2,dead3;
var jump,die,checkpoint


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
   trexEnd = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cactusImage1 = loadImage("obstacle1.png");
  cactusImage2 = loadImage("obstacle2.png");
  cactusImage3 = loadImage("obstacle3.png");
  cactusImage4 = loadImage("obstacle4.png");
  cactusImage5 = loadImage("obstacle5.png");
  cactusImage6 = loadImage("obstacle6.png");
  pterodactilofly = loadImage("terodactilos.png")
  trex_crouching = loadAnimation("trex7.png","trex8.png");
  dead1 = loadImage("gameOver.png")
  dead2 = loadImage("restart.png")
  checkpoint = loadSound("checkPoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexEnd)
  trex.addAnimation("crouching",trex_crouching)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 puntaje = 0;
  
 play = 0
 end = 1
 
 gameState = play;
  
  cactusGroup = new Group();
  cloudGroup = new Group();
  pterodactiloGroup = new Group();
  
  
   trex.setCollider ("circle",0,0,50)
  
  dead= createSprite(300,100);
  dead.addImage(dead1);
  dead.scale = 0.5;
  
  dead3 = createSprite(300,140);
  dead3.addImage(dead2);
  dead3.scale = 0.3;
  
}

function draw() {
  background(180);
  
  text("puntuacion"+puntaje,500,20)
 
  if (mousePressedOver(dead2)){
    
    reset()
    
  }
 
  trex.collide(invisibleGround);
  
  if (gameState == play){
    
   puntaje = puntaje+Math.round(frameCount/190) 
    if(puntaje>0 && puntaje%100 ==0){
    checkpoint.play ()
  }
    ground.velocityX =- (6+3*puntaje/100)
    
  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -14;
    jump.play ()
  }
  
  if(keyDown("up")&& trex.y >= 160) {
    trex.velocityY = -14;
    jump.play ()
  }
  
   if(keyWentDown("down")) {
   trex.changeAnimation("crouching",trex_crouching)
  }
    
  if(keyWentUp("down")) {
   trex.changeAnimation("running", trex_running)
  }  
  
 trex.changeAnimation("running", trex_running)
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  
    if (cactusGroup.isTouching(trex)){
      die.play () 
      gameState = end
      
      Cactus.lifetime = 454;
    
    }
    
    dead.visible =false
    dead3.visible =false
  }
  else if (gameState == end){
    
    trex.changeAnimation("collided",trexEnd)
    trex.velocityY = 0
    
   
    if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = 0;
  }
  
  if(keyDown("up")&& trex.y >= 160) {
    trex.velocityY = 0;
  }
    
    ground.velocityX = 0
    
    cactusGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    pterodactiloGroup.setVelocityXEach(0)
    
    cactusGroup.setLifetimeEach (1454);
    cloudGroup.setLifetimeEach (1454);
    
    dead.visible =true
    dead3.visible =true
  }
  
  
  
  //aparece las nubes
  spawnClouds();
  
  spawnCactus();
  
  pterodactilo1();
  
  drawSprites();
}

function reset(){
  
  gameState = play
  dead1.visible = false
  dead2.visible = false
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running)
}

function spawnClouds() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(650,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -2;
    
    
    //asigna ciclo de vida a la variable
    cloud.lifetime = 454
    
    //ajusta la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
    }
}

function spawnCactus() {
  
  if (frameCount % 60 === 0) {
  Cactus = createSprite(660,161,30,60)
  catu= Math.round(random(1,6))
  switch(catu){
  case 1: Cactus.addImage(cactusImage1)
  Cactus.scale = 0.6
  break;
  case 2: Cactus.addImage(cactusImage2)
  Cactus.scale = 0.6
  break;
  case 3: Cactus.addImage(cactusImage3)
  Cactus.scale = 0.5
  break;
  case 4: Cactus.addImage(cactusImage4)
  Cactus.scale = 0.7
  break;
  case 5: Cactus.addImage(cactusImage5)
  Cactus.scale = 0.6
  break;
  case 6: Cactus.addImage(cactusImage6)
  Cactus.scale = 0.3
  break;
  default: break
  }
  Cactus.velocityX = -(6+puntaje/100);
  
  Cactus.lifetime = 454;
    
  
      
  cactusGroup.add(Cactus);
  }
}
  
function pterodactilo1() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 200 === 0) {
    pterodactilo = createSprite(650,100,40,10);
    pterodactilo.addImage(pterodactilofly)
    pterodactilo.y = Math.round(random(60,200))
    pterodactilo.scale = 0.15;
    pterodactilo.velocityX = -9;
    
    
    //asigna ciclo de vida a la variable
    pterodactilo.lifetime = 454
    
    //ajusta la profundidad
    pterodactilo.depth = trex.depth
    trex.depth = trex.depth + 1;
    
     
    
    pterodactiloGroup.add(pterodactilo);
    }
  
}
  