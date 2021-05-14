let playerBox = {
    x:100,
    y:100,
    width:20,
    height:20,
    xSpeed:0,
    ySpeed:-10
};

playerBox.update = function(){
    this.x+=this.xSpeed;
    this.y += this.ySpeed;
};

playerBox.draw = function(){
    ctx.fillRect(this.x,this.y,this.width,this.height);
};


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let things = 2;
let chunk = 14;

let mapWidth = 30;

let mapUrl = "img/maps/test_map2.json"
let map,newMap;
let xmlhttp;
loadFile(mapUrl);

let a = new Image();
a.onload = thingLoaded;
a.src = "img/spritesheets/exampleTilesheet.png";


