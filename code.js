let player = {
    pos:new Vector(500,700),
    v: new Vector (0,0),
    a: new Vector (0,0.3),
    checkPoint: new Vector(500,700),
    lives: 3,
    health: 100,
    width:64,
    height:64   ,
    movingLeft: false,
    movingRight: false,
    upPressed: false,
    inAir: true,
    timesJumped:0,
    frame: [0,0],
};
let arrayOfClouds = [];
let arrayOfLeaves = [];
player.kill = function(){
    console.log("you died");
    this.pos.x = this.checkPoint.x;
    this.pos.y = this.checkPoint.y;
}
let infoTiles = [
    [[false],[]], /*1*/
    [[false],[]], /*2*/
    [[false],[]], /*3*/ 
    [[false],[]], /*4*/
    [[false],[]], /*5*/
    [[false],[]], /*6*/
    [[true],[]], /*7*/
    [[true],[]], /*8*/
    [[true],[]], /*9*/
    [[true],[]], /*10*/
    [[true],[]], /*11*/ 
    [[true],[]], /*12*/
    [[true],[]], /*13*/
    [[true],[]], /*14*/
    [[true],[]], /*15*/
    [[true],player.kill], /*16*/ 
    [[false],[]], /*17*/
    [[false],[]], /*18*/
    [[false],[]], /*19*/ 
    [[false],[]], /*20*/
    [[false],[]], /*21*/
    [[false],[]], /*22*/
    [[false],[]], /*23*/
    [[false],[]], /*24*/ 
    
];
let chunk = 0;
let lastChunk = chunk;
let spawn = new Vector(player.pos.x, player.pos.y);


let enemysheet = new Image();
enemysheet.onload = thingLoaded;
enemysheet.src = "img/spritesheets/testbugs.png";


let allEnemies = [];
let enemies = [];


let spriteWidth = enemysheet.width/1;
let spriteHeight = enemysheet.height/2;

//spriteNumber, position, moveVector, size, speed, health, chunk
allEnemies.push(new Enemy(0, [2300, 1720], [1, 0], 0.2, 2, 1, 11));
allEnemies.push(new Enemy(0, [3200, 1200], [1, 0], 0.2, 2, 1, 11));
allEnemies.push(new Enemy(0, [3300, 1720], [1, 0], 0.2, 2, 1, 11));



player.collide = function(){
  //Collision on x-axis
    //Moving Left
    //Collision with enemies
    

    if(player.v.x<0){
        let checkX = this.pos.x+this.v.x;
        //TL
        let infoTL = tileCheck(map,checkX,this.pos.y+1);
        if(infoTL[0]  && (infoTiles[infoTL[3]][0][0])){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoTL[1]+64);
        };
        //BL
        let infoBL = tileCheck(map,checkX,this.pos.y+this.height);
        if(infoBL[0]  && (infoTiles[infoBL[3]][0][0])){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoBL[1]+64);
        };


        
        
    }
    //Moving Right
    if(player.v.x>0){
        let checkX = this.width+this.pos.x+this.v.x;
        //TR
        let infoTR = tileCheck(map,checkX,this.pos.y);
        if(infoTR[0]  && (infoTiles[infoTR[3]][0][0]) ){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoTR[1]);
        };
        //BR
        let infoBR = tileCheck(map,checkX,this.pos.y+this.height);
        if(infoBR[0]  && (infoTiles[infoBR[3]][0][0])){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoBR[1]);
        };
    };


  //Collision on y-axis
    
        let maxY = this.pos.y + this.height + this.v.y+1;
        let minY = this.pos.y + this.v.y;
        let minX = this.pos.x;
        let maxX = this.pos.x + this.width;

        for(let q=0; q<enemies.length; q++){
            if(maxX > enemies[q].position.x && minX < enemies[q].position.x + enemies[q].size*spriteWidth){
                if(maxY >= enemies[q].position.y - this.v.y && maxY <= enemies[q].position.y){
                    this.timesJumped = 0;
                    player.jump();
                    enemies[q].health--;
                    q--;
                }
                else if(maxY >= enemies[q].position.y && minY <= enemies[q].position.y + spriteHeight*enemies[q].size){
                    player.kill();
                }
            }
        }



if(this.v.y>=0){
let infoBL = tileCheck(map,minX,maxY);

if( (infoBL[0]) && (infoTiles[infoBL[3]-1][0][0])){
    
    if(infoBL[3] == 16){
        player.kill()};
    let deltaY = maxY-infoBL[2];
    this.v.y=0;
    this.pos.y -= deltaY;
    this.timesJumped = 0;
    this.inAir = false;
}
        maxY = this.pos.y + this.height + this.v.y+1;
        minY = this.pos.y + this.v.y;
        minX = this.pos.x;
        maxX = this.pos.x + this.width;

let infoBR = tileCheck(map,maxX,maxY);
if( (infoBR[0])  && (infoTiles[infoBR[3]-1][0][0])){
    let deltaY = maxY-infoBR[2];
    this.v.y=0;
    this.pos.y -= deltaY;
    this.timesJumped = 0;
    this.inAir = false;
}
if( infoBR[0]&& infoBL[0]){
    this.inAir = true;
}}
else{
        
    let infoTL = tileCheck(map,minX,minY)

    if( infoTL[0]){
        
        this.v.y=0;
        this.pos.y = infoTL[2]+64;
};
let infoTR = tileCheck(map,maxX,minY);
if( infoTR[0]){
        
    this.v.y=0;
    this.pos.y = infoTR[2]+65;
}
    }}
        
    
  

player.jump   = function(){
    
    
    if(this.timesJumped<1){
    console.log("jump")
    this.pos.y -=1;
    this.v.y = -12;
    this.inAir = true;
    this.timesJumped ++;}
    
    }

player.update = function(){
    if(this.upPressed){
        this.jump();
    }
    
    if(this.movingLeft){
        player.moveLeft();
    }
    if(this.movingRight){
        player.moveRight();
    }
    
    this.v.add(this.a);
    
    this.pos.add(this.v);
    this.v.x *=0.87;
    
};
player.moveRight = function(){
    if(this.v.x<4){
        this.v.x += 1;
    }
}

player.moveLeft = function(){
    if(this.v.x>-4){
        this.v.x -= 1;
    }
}
player.draw = function(){
    
    ctx.drawImage(sheetPlayer,0,0,this.width,this.height,this.pos.x+this.width%1920,(this.pos.y%1024)+1,-this.width,this.height);

    //ctx.fillRect(this.pos.x%1920,(this.pos.y%1024)+1,this.width,this.height);
};


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let things = 7;


let mapWidth = 30;

let mapUrl = "img/maps/new_map.json"
let map,newMap;
let xmlhttp;
loadFile(mapUrl);

//Buttons

let btnPlay = document.getElementById("btn-play");
let btnSettings = document.getElementById("btn-settings");
let btnLeaderboards = document.getElementById("btn-leaderboards");
btnPlay.onclick = function(){
 btnPlay.style.visibility = 'hidden';
 btnSettings.style.visibility = 'hidden';
 btnLeaderboards.style.visibility = 'hidden';
}

//Loading images
let tilesheet1 = new Image();
tilesheet1.onload = thingLoaded;
tilesheet1.src = "img/spritesheets/exampleTilesheet.png";

let mountains = new Image();
mountains.onload = thingLoaded;
mountains.src = "img/spritesheets/mountains.png";


let sheetLeaves = new Image();
sheetLeaves.onload = thingLoaded;
sheetLeaves.src = "img/spritesheets/leaf_01.png"

let sheetClouds = new Image();
sheetClouds.onload = thingLoaded;
sheetClouds.src = "img/spritesheets/clouds.png";

let sheetPlayer = new Image();
sheetPlayer.onload = thingLoaded;
sheetPlayer.src = "img/spritesheets/robot_dude.png"

document.onkeydown = function checkKeyDown(event) {

    event = event || window.event;
    

    if (event.keyCode == '38') {
        // up 
        player.upPressed = true;
    }
    else if (event.keyCode == '40') {
        // down arrow
    }
    else if (event.keyCode == '37') {
       // left arrow
       player.movingLeft = true;
    }   
    else if (event.keyCode == '39') {
       // right arrow
       player.movingRight = true;
    }
    else if ( event.keyCode == '32'){
        player.jump();
        
    }};
document.onkeyup = function checkKeyUp(e){
   
    
    if (e.keyCode == 37 ){
        player.movingLeft = false;
        
       
    }
    if (e.keyCode == 39 ){
        player.movingRight = false;
    }
    if (e.keyCode == '38') {
        // up 
        player.upPressed = false;
    }}