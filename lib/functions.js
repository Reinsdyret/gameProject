function thingLoaded(){
    things--;
    if(things == 0){
        start();
    }
}

function start(){
    console.log("started");
    newMap = mapArray(map.layers[0].data);
    createClouds();
    createLeaves();
    gameLoop();
}
function createClouds(){
    let numOfClouds = 15;
    let scale = 0;
    for(let i = 0; i<numOfClouds;i++){
        if(i<(20/3)){
            scale = 2;
        }
        else if(i<((20*2)/3)){
            scale = 3;
        }
        else {
            scale = 4
        }
        let cloud = {
            frame: Math.floor(Math.random()*5),
            pos: new Vector(Math.floor(Math.random()*1920),Math.floor(Math.random()*512)-128),
            scale: scale,
            
            
        };
        arrayOfClouds.push(cloud);
       
    }

};
function createLeaves(){
    let numOfLeaves = 40;
    
    for(let i = 0; i<numOfLeaves;i++){
        let leaf = {
            frame: Math.floor(Math.random()*6),
            pos: new Vector(Math.floor(Math.random()*1920),Math.floor(Math.random()*1024)),
            scale: Math.floor(Math.random()*3)+1,
            v: new Vector(Math.random()*-2,Math.random()*3+0.5)
            
            
        };
        arrayOfLeaves.push(leaf);
       
    }

};
function drawClouds(array){
    for(let i = 0; i<array.length; i++){
        
        
        array[i].frame +=0.05*Math.random();
       if(array[i].pos.x<-800){
         array[i].pos.x = 2000;
        }
        array[i].pos.x -= 0.2*array[i].scale;
        
        array[i].pos.y += Math.sin(array[i].pos.x*0.01)*0.1;
        ctx.drawImage(sheetClouds,48*4*(Math.floor(array[i].frame)%4),0,47*4,4*32,array[i].pos.x,array[i].pos.y,48*2*array[i].scale,2*32*array[i].scale);
    }
};
function drawLeaves(){
    for( let i = 0; i<arrayOfLeaves.length; i++){
        ctx.drawImage(sheetLeaves, 32*(Math.floor(arrayOfLeaves[i].frame)%5), 0,32,32, arrayOfLeaves[i].pos.x%1920, arrayOfLeaves[i].pos.y%1024,32,32);
        arrayOfLeaves[i].frame +=0.2*Math.random();
        arrayOfLeaves[i].pos.add(arrayOfLeaves[i].v);

        if(arrayOfLeaves[i].pos.y>1024){
            arrayOfLeaves[i].pos.x = Math.random()*2400;
            arrayOfLeaves[i].pos.y = -64;
        }
        if(arrayOfLeaves[i].pos.x<-64){
            arrayOfLeaves[i].pos.x = Math.random()*2400;
            arrayOfLeaves[i].pos.y = -64;
        
        }
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
    //ctx.drawImage(mountains,0,0);
    ctx.fillStyle = 'black'
    drawClouds(arrayOfClouds);
    drawTiles(newMap,ctx,tilesheet1,map.tileheight,mapWidth,chunk);
    enemyInteract();
    drawEnemies();
    player.collide();
    player.update();
    
    //project.update();
    
    //chunk = changeChunk(player,chunk,ctx);
    chunk = (Math.floor(player.pos.x/canvas.width)+Math.floor(player.pos.y/1024)*10);
    player.draw();
    drawLeaves();
    //project.draw(ctx,a.width,4,a);
    requestAnimationFrame(gameLoop);
    
}
function killPlayer(){
    player.kill();
};
function specialTiles(){
    
};
function enemyInteract(){
 
    //Load and unload enemies
    if(lastChunk != chunk){
        lastChunk = chunk;
        enemies = [];
        let i = 0;
        while(i<allEnemies.length){
            if(allEnemies[i].health == 0){
                allEnemies.splice(i, 1);
                i--;
            }
            i++;
        }
 
        let j = 0;
        while(j<allEnemies.length){
            if(allEnemies[j].chunk >= chunk){
                if(allEnemies[j].chunk > chunk){
                    j = allEnemies.length;
                }
                else{
                    enemies.push(allEnemies[j]);
                }
            }
            j++;
        }
    }
 
    let i = 0;
    while(i<enemies.length){
        if(enemies[i].health <= 0){
            enemies.splice(i, 1);
        }
        else{
            /*if(enemies[i].enemyType == 1){
                enemies[i].detectPlayer(player.position);
            }*/
            enemies[i].collide();
            enemies[i].move();
        }
        i++;
    }
};
 
function drawEnemies(){
    for(let i=0; i<enemies.length; i++){
        ctx.drawImage(
            enemysheet,
            enemies[i].spriteNumber*spriteWidth, enemies[i].enemyType*spriteHeight, spriteWidth, spriteHeight,
            enemies[i].position.x%1920, enemies[i].position.y%1024, spriteWidth*enemies[i].size, spriteHeight*enemies[i].size
        );
    }
};
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