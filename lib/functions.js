function thingLoaded(){
    things--;
    if(things == 0){
        start();
    }
}

function start(){
    console.log("started");
    newMap = mapArray(map.layers[0].data);
    createClouds()
    gameLoop();
}
function createClouds(){
    let numOfClouds = 20;
    
    for(let i = 0; i<numOfClouds;i++){
        let cloud = {
            frame: Math.floor(Math.random()*4),
            pos: new Vector(Math.floor(Math.random()*1920),Math.floor(Math.random()*1024)),
            scale: Math.floor(Math.random()*3)+1,
            
            
        };
        arrayOfClouds.push(cloud);
       
    }

};
function createLeaces(){
    let numOfLeaves = 20;
    
    for(let i = 0; i<numOfLeaves;i++){
        let cloud = {
            frame: Math.floor(Math.random()*6),
            pos: new Vector(Math.floor(Math.random()*1920),Math.floor(Math.random()*1024)),
            scale: Math.floor(Math.random()*3)+1,
            
            
        };
        arrayOfClouds.push(cloud);
       
    }

};
function drawClouds(array){
    for(let i = 0; i<array.length; i++){
        //console.log(48*array[i].frame,0,48,32,array[i].pos.x,array[i].pos.y,48,32);
        ctx.drawImage(sheetClouds,48*(Math.floor(array[i].frame)%4),0,48,32,array[i].pos.x%1920,array[i].pos.y,48*array[i].scale,32*array[i].scale);
        array[i].frame +=0.05*Math.random();
        array[i].pos.x -= 0.3*array[i].scale
        if(array[i].pos.x<-420){
            array[i].pos.x = 1920;
        }
        array[i].pos.y += Math.sin(array[i].pos.x*0.01)*0.1;
    }
}

function loadFile(url){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = handleFile;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function handleFile(){
    if(xmlhttp.readyState == 4 && this.status == 200){
        map = JSON.parse(xmlhttp.responseText);
        thingLoaded();
    }
}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgb(55,122,208)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black'
    drawClouds(arrayOfClouds);
    drawTiles(newMap,ctx,tilesheet1,map.tileheight,mapWidth,chunk);
    player.collide();
    player.update();
    //chunk = changeChunk(player,chunk,ctx);
    chunk = (Math.floor(player.pos.x/canvas.width)+Math.floor(player.pos.y/1024)*10);
    player.draw();
    requestAnimationFrame(gameLoop);
}

function tileCheck(map,x,y){
    //Finds the tile in which a given point is located
    let inTile = [Math.floor(x/64),Math.floor(y/64)];
    //console.log("in tile= ", inTile);

    //Check for tile type
    let typeOfTile = map.layers[0].data[300*inTile[1]+inTile[0]];
    
    if(typeOfTile != 0){
    return([true,inTile[0]*64,inTile[1]*64,typeOfTile]);
    }
    else {
        
        return([false]);
    }

}




function drawTiles(map,ctx,tilesheet,tileSideLength,width,chunk){
    // Function for drawing tiles that the player sees. Map array is a 1 dimensional arrays that have tile values.
    let tileSheetWidth = tilesheet.width / tileSideLength;
    let x = 0;
    let y = 0;

    let scale = (canvas.width / width) / tileSideLength;

    for(let row = 0; row<map[chunk].length; row++){
        for(let col = 0; col<map[chunk][row].length; col++){
            if(map[chunk][row][col] != 0){
                ctx.drawImage(tilesheet,
                    ((map[chunk][row][col]-1) % tileSheetWidth) * tileSideLength, Math.floor((map[chunk][row][col] -1) / tileSheetWidth) * tileSideLength,
                    tileSideLength, tileSideLength,
                    x,y,
                    tileSideLength * scale, tileSideLength * scale);
            }
            x += tileSideLength;
        }
        x = 0;
        y += tileSideLength;
    }
}

function mapArray(map){
    let newArray = new Array(100);
    for(let i = 0; i<newArray.length; i++){
        newArray[i] = new Array();
    }
    let tempArray = [];
    let row = 0;
    let col = 0;
    for(let t = 0; t<map.length; t++){
        tempArray.push(map[t]);
        if((t+1) % 30 == 0){
            newArray[col + (row * 10)].push(tempArray);
            tempArray = [];
            col++;
        }
        if(col >= 10){
            col = 0;
        }
        if((t+1) % 4800 == 0){
            row++;
        }
    }
    return newArray;
}


/*function checkKeyDown(event) {

    event = event || window.event;

    if (event.keyCode == '38') {
        // up 
        player.jump(); 
    }
    else if (event.keyCode == '40') {
        // down arrow
    }
    else if (event.keyCode == '37') {
       // left arrow
       player.movingL = true;
    }   
    else if (event.keyCode == '39') {
       // right arrow
       player.movingR = true;
    }};

function checkKeyUp(e){
   
    
        if (e.keyCode == 37 ){
            player.movingL = false;
            
           
        }
        if (e.keyCode == 39 ){
            player.movingR = false;
        }};*/