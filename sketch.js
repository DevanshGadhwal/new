var bg,bgimage;
var player,playerimage;
var jetleft,jetright;
var bulletgroup;
var heligroup;
var blastImg;
var heli;
var blast2img;
var edges;
var bulletImage;
var bomb,bombimage;
var bombgroup;
var playerleft,playerright,playerstand,playershot;
var gamestate="play";
var jetsound,bombsound,gunsound;
var gameover,gameoverImg;

function preload(){
  bgimage=loadImage("bg.jpg");
  bg2image=loadImage("ground.png");
  //playerimage=loadAnimation("DYing1.png","DYing2.png","DYing3.png","DYing4.png","DYing5.png","DYing6.png","DYing7.png","DYing8.png","DYing9.png");
  jetleft=loadImage("Jetleft.png");
  jetright=loadImage("jetright.png");
    blastImg=loadImage("blast.png");
    blast2img=loadImage("blast2.png");
    bulletImage=loadImage("Bullet.png");
    bombimage=loadImage("bombblast.png");
    gameoverImg=loadImage("gameover.png");
  
    playerright=loadAnimation("right1.png","right2.png","right3.png","right4.png","right5.png","right6.png");
    playershot=loadAnimation("shot.png");
    playerstart=loadAnimation("start.png");
    playerleft=loadAnimation("left1.png","left2.png","left3.png","left4.png","left5.png","left6.png");
  jetsound=loadSound("Jetsound.mp3");
  gunsound=loadSound("GunSound.mp3");
  bombsound=loadSound("BombSound.mp3");
  }

function setup() {
  createCanvas(1600,800);
  bg=createSprite(800, 380, 1600, 800);
  bg.addImage(bgimage);
  bg2=createSprite(800, 460, 1600, 800);
  bg2.addImage(bg2image);

  player=createSprite(800,560,20,40);
  player.addAnimation("p1",playerstart);
  player.addAnimation("p2",playerright);
  player.addAnimation("p3",playerleft);
  player.addAnimation("p4",playershot);
  player.addAnimation("b",blast2img);

  gameover=createSprite(800, 300, 1600, 800);
  gameover.addImage(gameoverImg);
  gameover.scale=2;
  gameover.visible=false;

 bulletgroup=new Group();
  heligroup=new Group();
  bombgroup=new Group();

  edges=createEdgeSprites();
}

function draw() {
  background(0,0,0); 

  if(gamestate==="play"){
  
  if(keyDown("left")){
    player.x=player.x-5;
    player.changeAnimation("p3",playerleft);
    player.scale=0.5;
  }
  if(keyDown("right")){
    player.x=player.x+5;
    player.changeAnimation("p2",playerright);
    player.scale=0.5
  }
  helicopter();
  spawnbullet();

  if(bulletgroup.isTouching(heligroup)){
    heli.addImage(blastImg);
    heli.scale=0.3;
    heli.velocityY=7;
    heli.velocityX=0;
  }
  if(bombgroup.isTouching(player)){
    bombsound.play();
   gamestate="end";
   
  }
}
drawSprites();
 if(gamestate==="end"){
   bombgroup.destroyEach();
   heligroup.setVelocityXEach(0);
  player.changeAnimation("b",blast2img);
  player.scale=1.5;

  gameover.visible=true;
 }
  
}
function helicopter(){
  if(frameCount%300===0){
    var num=Math.round(random(1,2));
    if(num===1){
      jetsound.play();
      heli=createSprite(1400,100,50,50);
      heli.addImage(jetleft);
      heli.velocityX=-5;
      heli.y=random(50,400);
    }
    else if(num===2){
      jetsound.play();
      heli=createSprite(0,100,50,50);
      heli.addImage(jetright);
      heli.velocityX=5;
      heli.y=random(50,400);
    }
   heli.scale=0.25;
    heligroup.add(heli);

      bomb=createSprite(1400,100,50,50);
      bomb.addImage("22",bombimage);
      bomb.scale=0.08;
      bomb.y=heli.y;
      
      bomb.x=heli.x;

     
      if(num===1){
        bomb.velocityX=-random(3,15);
        bomb.velocityY=5;
      }
      if(num===2){
        bomb.velocityX=random(3,10);
        bomb.velocityY=5;
      }
      bombgroup.add(bomb);
    }
}
function spawnbullet(){
  if(keyWentDown("b")){
    var bullet=createSprite(0,0,10,10);
    player.changeAnimation("p4",playershot);
    gunsound.play();
    player.scale=1;
    bullet.addImage(bulletImage);
    bullet.scale=0.05;
    bullet.x=player.x;
    bullet.y=480;
    bullet.velocityY=-4;
    bulletgroup.add(bullet);
  }
}