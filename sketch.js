var bird , ground,sky;
var gameState = 0
var animals
var food1,food2,food3,food4,eagleImage
var animal1,animal2,animal3,animal4
var birdImage;
var score = 0;
var lives = 3;
function preload(){
  food3 = loadImage("food3.png")
  food4 = loadImage("food4.png")
  eagleImage = loadImage("eagleImage.png")
  animal1 = loadImage("animal1.png")
  animal2 = loadImage("animal2.png")
  birdImage = loadImage("birdImage.png")

}
 function setup(){
 createCanvas (windowWidth - 30,windowHeight-100)
 bird = createSprite(200,300,20,20)
 bird.addImage(birdImage)
 bird.scale = 0.04
 ground = createSprite(580,windowHeight-130,windowWidth-5,20)
 sky = createSprite(580,windowHeight-600,windowWidth-5,20)
 sky.visible = false
 eaglesGroup = new Group()
 foodGroup = new Group()
 animalsGroup = new Group()
 }

function draw(){
background("white")

if(gameState === 0){

if(keyDown("space")){
	bird.velocityY = -6
}
bird.velocityY = bird.velocityY + 0.7
spawnFood();
spawnEagles();
spawnAnimals();
if((eaglesGroup.isTouching(bird)) || (bird.isTouching(sky)) || (bird.isTouching(ground)) ||
 (bird.isTouching(animalsGroup))){
  lives = lives -1
 console.log(gameState)
if(lives===0){
  gameState = 1
 console.log(gameState)
}
}

if(bird.isTouching(foodGroup)){
  foodGroup.destroyEach()
  score = score + 1
}
}
else if(gameState===1 ){
  ground.velocityX = 0;
  eaglesGroup.setLifetimeEach(-1)
  eaglesGroup.setVelocityXEach(0)
 foodGroup.setVelocityEach(0,0)
 animalsGroup.setVelocityEach(0,0)
 foodGroup.setLifetimeEach(-1)
 animalsGroup.setLifetimeEach(-1)
 //background("black")
 textSize(30)
 fill("black")
  text("Game Over!" , windowWidth/2,windowHeight /2)
}
bird.collide(ground)
 drawSprites();

}


function spawnFood() {
  if(frameCount % 55 === 0) {
    var food = createSprite(windowWidth - 30,165,20,20);
    //obstacle.debug = true;
    food.velocityX = -6
    food.y = Math.round(random(40,380))
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
    case 1: food.addImage(food3);
              break;
      case 2: food.addImage(food4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    food.scale = 0.1;
    food.lifetime = 300;
    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
    foodGroup.add(food)
  }
}

function spawnEagles() {
  if(frameCount % 195 === 0) {
    var eagles = createSprite(windowWidth - 30,165,20,20);
    //obstacle.debug = true;
    eagles.velocityX = -6
    eagles.y = Math.round(random(40,290))
    eagles.shapeColor = "red"
    eagles.addImage(eagleImage)
    
    //assign scale and lifetime to the obstacle           
    eagles.scale = 0.18;
    eagles.lifetime = 300;
    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
    eaglesGroup.add(eagles)
  }
}

function spawnAnimals(){
  if(frameCount % 230  === 0) {
    animals = createSprite(windowWidth - 30,windowHeight - 180,20,20);
    //obstacle.debug = true;
    animals.velocityX = -6
    animals.shapeColor = " green "
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: animals.addImage(animal1);
              break;
      case 2: animals.addImage(animal2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    animals.scale = 0.25;
    animals.lifetime = 300;
    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
    animalsGroup.add(animals)
}
}