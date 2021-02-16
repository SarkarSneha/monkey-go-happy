var bananaImage,obstacleImage,backImage,foodImage,overImage
var playerAnimation;
var obstacleGroup, foodGroup;
var score;
var ground,food,obstacle;
var c;
var PLAY,END,gs;


function preload()
{
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  foodImage = loadImage("banana.png");
  backImage = loadImage("jungle.jpg");
  overImage = loadImage("gameOver.png");
 
  playerAnimation1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
}

function setup() 
{
  createCanvas(400, 400);
  
  scene = createSprite(200,200,400,400);
  scene.addImage(backImage);
  scene.x = scene.width/2;
  scene.velocityX = -6;
  
  player = createSprite(40,360,10,10);
  player.addAnimation("monkey_running",playerAnimation1);

  player.scale = 0.10;
  
  ground = createSprite(200,370,400,5);
  ground.visible = false;
  
  gameover = createSprite(200,140,10,10);
  gameover.addImage(overImage);
  gameover.scale = 0.8;
  gameover.visible = false;
  
 
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  c = 0;
  PLAY = 1;
  END = 0;
  gs = PLAY;
}

function draw() 
{
  background(220);
  player.collide(ground);
  
  if(scene.x<0)
  {
    scene.x = scene.width/2;
  }
  
  if(gs == PLAY)
  {
    if(keyDown("space") && player.y >= 170)
  {
    player.velocityY = -12;
  }
    
  //console.log(c);
  if(frameCount % 80 == 0)
  {
    spawnFood();
  }
  if(frameCount % 300 == 0)
  {
    spawnObstacles();
  }
  
  if(foodGroup.isTouching(player))
  {
    score = score + 2;
   
    foodGroup.destroyEach();
    
    if(score>0 && score%10==0)
    {
      
   
    }
    
    switch(score)
    {
        case 10: player.scale = 0.12;
        break;
        case 20: player.scale = 0.15;
        break;
        case 30: player.scale = 0.18;
        break;
        case 40: player.scale = 0.21;
        break;
         case 50: player.scale = 0.24;
        break;
        case 60: player.scale = 0.27;
        break;
        case 70: player.scale = 0.30;
        break;
        case 80: player.scale = 0.33;
        break;
        default: break;
    }
  }
  if(obstacleGroup.isTouching(player))
  {
    player.scale = 0.10;
    obstacleGroup.destroyEach();
    c = c+1;

    score = score - 2;
   
  }
    if(c==2 && gs == PLAY)
    {
      gs = END;
      score = score + 2;
     
    }
  }
  if(gs == END)
  {
  
    player.visible=false
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    scene.velocityX = 0;
   
    gameover.visible = true;
   text("g",200,290)
  }
  if(keyDown("g") && gs == END)
  {
    gs = PLAY;
    reset();
  }
  player.velocityY = player.velocityY + 0.4;
  
  drawSprites();
  stroke("black");
  textSize(20);
  fill("white");
  text("SCORE :" + score,250,50);
  text("Press G when the game ends",10,30);
}

function spawnFood()
{
  var food = createSprite(400,160,10,10);
  food.addImage(foodImage);
  food.y = random(120,200);
  food.velocityX = -(6 + Math.round(score/10));
  food.lifetime = 70;
  foodGroup.add(food);
  food.scale = 0.05;
}

function spawnObstacles()
{
  obstacle = createSprite(400,350,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -(6 + Math.round(score/10));
  obstacle.lifetime = 70;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
}

function reset()
{
  player.changeAnimation("monkey_running",playerAnimation1);
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  scene.velocityX = -6;
  score = 0;
 c = 0;
 player.visible=true
  gameover.visible = false;
}



