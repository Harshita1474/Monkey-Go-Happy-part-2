var player, back,banana;
var backImage, player_running, bananImage;
var ground, back, obstacle;
var bananasGroup, score, obstaclesGroup;

function preload(){
  
  backImage=loadImage("jungle.jpg")
  player_running = 
  loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  obstacleImage=loadImage("stone.png");
  
  bananaImage=loadImage("banana.png");

}
function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200, 200, 200, 400);
  back.addImage("back", backImage);
  back.velocityX=-3;
  
  player = createSprite(50, 340, 100, 100);
  player.scale=0.1;
  player.addAnimation("player", player_running);
  
  ground = createSprite(200,380,400,20);
  ground.visible=false;
  
  player.collide(ground);
  
  score=0;  
  
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("white");
  
    

    if(keyDown("space") && player.y>200){ 
      player.velocityY = -12 ;  
    } 
  player.velocityY = player.velocityY + 0.8; 
  player.collide(ground);

    
    //Setting a infinite background
    if (back.x < 300){
      back.x = back.width/2;
    }
    
    //if the player is touching the banana group the bananas will be destroyed
    if (player.isTouching(bananasGroup)){
    bananasGroup.destroyEach();
    score=score+2;}
      
    if(obstaclesGroup.isTouching(player)){
    player.scale=0.05;
    }
  
    switch(score){
    case 10: player.scale=0.12;
             break;
    case 20: player.scale=0.14;
             break;
    case 30: player.scale=0.16;
             break;
    case 40: player.scale=0.18;
             break;
             default: break;
    }
 
  
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,300,50)
}

  function spawnBananas() {
  if (frameCount % 200 ===0) {
    var banana = createSprite(400, 320, 20, 20);
    banana.y = Math.round(random(200,280));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.05;
    bananasGroup.add(banana);

  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(400,350,10,40);
    obstacle.velocityX = - (3 + (10*score)/50);
    
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    obstacle.setCollider("circle",0,0,200);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}