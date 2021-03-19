let playerBox = {
    x:100,
    y:100,
    width:20,
    height:20,
    xSpeed:100,
    ySpeed:1
};

playerBox.update = function(){
    this.x+=this.xSpeed;
};

playerBox.draw = function(){
    ctx.fillRect(this.x,this.y,this.width,this.height);
};


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let things = 2;
let chunk = 0;

let mapWidth = 30;

let mapUrl = "img/maps/test_map2.json"
let map,newMap;
let xmlhttp;
loadFile(mapUrl);

let a = new Image();
a.onload = thingLoaded;
a.src = "img/spritesheets/exampleTilesheet.png";


