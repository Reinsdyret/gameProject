let player = {
    pos:new Vector(2300,700),
    v: new Vector (0,0),
    a: new Vector (0,0.1),
    width:32,
    height:48,
    movingLeft: false,
    movingRight: false,
    upPressed: false,
    inAir: true,
    timesJumped:0
};
let arrayOfClouds = [];


player.collide = function(){
  //Collision on x-axis
    //Moving Left
    if(player.v.x<0){
        let checkX = this.pos.x+this.v.x;
        //TL
        let infoTL = tileCheck(map,checkX,this.pos.y+1);
        if(infoTL[0]){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoTL[1]+64);
        };
        //BL
        let infoBL = tileCheck(map,checkX,this.pos.y+this.height);
        if(infoBL[0]){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoBL[1]+64);
        };


        
        
    }
    //Moving Right
    if(player.v.x>0){
        let checkX = this.width+this.pos.x+this.v.x;
        //TR
        let infoTR = tileCheck(map,checkX,this.pos.y);
        if(infoTR[0]){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoTR[1]);
        };
        //BR
        let infoBR = tileCheck(map,checkX,this.pos.y+this.height);
        if(infoBR[0]){
            this.v.x = 0; 
            this.pos.x -= checkX-(infoBR[1]);
        };
    };


  //Collision on y-axis
    
        let maxY = this.pos.y + this.height + this.v.y + 1 ;
        let minY = this.pos.y + this.v.y;
        let minX = this.pos.x;
        let maxX = this.pos.x + this.width;



if(this.v.y>=0){
let infoBL = tileCheck(map,minX,maxY);

if( infoBL[0]){
    let deltaY = maxY-infoBL[2];
    this.v.y=0;
    this.pos.y -= deltaY+this.v.y;
    this.timesJumped = 0;
    this.inAir = false;
}

let infoBR = tileCheck(map,maxX,maxY);
if( infoBR[0]){
    let deltaY = maxY-infoBR[2];
    this.v.y=0;
    this.pos.y -= deltaY;
    this.timesJumped = 0;
    this.inAir = false;
}
if(!(infoBR[0])&& !(infoBL[0])){
    this.inAir = true;
}}
else{
    let infoTL = tileCheck(map,minX,minY)
    
    if( infoTL[0]){
        
        this.v.y=0;
        this.pos.y = infoTL[2]+65;
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
    this.v.y = -5;
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
    ctx.fillRect(this.pos.x%1920,this.pos.y%1024,this.width,this.height);
};


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let things = 4;
let chunk = 0;

let mapWidth = 30;

let mapUrl = "img/maps/new_map.json"
let map,newMap;
let xmlhttp;
loadFile(mapUrl);

let tilesheet1 = new Image();
tilesheet1.onload = thingLoaded;
tilesheet1.src = "img/spritesheets/exampleTilesheet.png";


let leaf = new Image();
leaf.onload = thingLoaded;
leaf.src = "img/spritesheets/leaf_01.png"

let sheetClouds = new Image();
sheetClouds.onload = thingLoaded;
sheetClouds.src = "img/spritesheets/clouds.png";

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