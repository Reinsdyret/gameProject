class Enemy {

    enemyType;
    spriteNumber;
    position;
    moveVector;
    size;
    speed;
    health;
    chunk;

    constructor(spriteNumber, position, moveVector, size, speed, health, chunk){
        this.enemyType = 0; //type of enemy (row in spritesheet)
        this.spriteNumber = spriteNumber; //(column in spritesheet)
        this.position = new Vector(position[0], position[1]); //array [x, y]
        this.moveVector = new Vector(moveVector[0], moveVector[1]); //array [dX, dY]
        this.size = size; //multiplier
        this.speed = speed; //multiplier
        this.health = health; //default = 1, dead = 0
        this.chunk = chunk; //where the enemy spawns and lives
    }

    move(){
        let mov = this.moveVector;
        mov.normalize();
        mov.x *= this.speed;
        mov.y *= this.speed;
        this.position.add(mov);
    }

    collide(){
        //Collision on x-axis
          //Moving Left
          if(this.moveVector.x<0){
              let checkX = this.position.x+this.moveVector.x*this.speed;
              let infoTL = tileCheck(map,checkX,this.position.y+1);
              let infoBL = tileCheck(map,checkX,this.position.y+this.size*spriteHeight);
              if(infoTL[0] && (infoTiles[infoTL[3]-1][0][0])){
                  this.moveVector.x *= -1; 
                  this.position.x -= checkX-(infoTL[1]+64);
              }
              else if(infoBL[0]  && (infoTiles[infoBL[3]-1][0][0])){
                  this.moveVector.x *= -1; 
                  this.position.x -= checkX-(infoBL[1]+64);
              }
              if(checkX%1920 <= this.speed*this.moveVector.x){
                this.moveVector.x *= -1; 
              }

              let infoGroundLeft = tileCheck(map, checkX, this.position.y+this.size*spriteHeight+64);
              if(!infoGroundLeft[0]){
                  this.moveVector.x *= -1;
              }
          }
          //Moving Right
          if(this.moveVector.x>0){
              let checkX = this.size*spriteWidth+this.position.x+this.moveVector.x;
              let infoTR = tileCheck(map,checkX,this.position.y);
              let infoBR = tileCheck(map,checkX,this.position.y+this.size*spriteHeight);
              if(infoTR[0] && (infoTiles[infoTR[3]-1][0][0])){
                  this.moveVector.x *= -1; 
                  this.position.x -= checkX-(infoTR[1]);
              }
              else if(infoBR[0] && (infoTiles[infoBR[3]-1][0][0])){
                  this.moveVector.x *= -1; 
                  this.position.x -= checkX-(infoBR[1]);
              }
              if(checkX%1920 >= 1920 - this.speed*this.moveVector.x){
                this.moveVector.x *= -1; 
              }

              let infoGroundLeft = tileCheck(map, checkX, this.position.y+this.size*spriteHeight+64);
              if(!infoGroundLeft[0]){
                  this.moveVector.x *= -1;
              }
          };
      
        //Collision on y-axis
          
        let maxY = this.position.y + this.size*spriteHeight + this.moveVector.y + 1 ;
        let minY = this.position.y + this.moveVector.y;
        let minX = this.position.x;
        let maxX = this.position.x + this.size*spriteWidth;      
      
        //Moves down
        if(this.moveVector.y>=0){
            if(minY%1024 >= 1024-this.speed*this.moveVector.y){
                console.log("test");
                this.health = 0;
              }
              
            let infoBL = tileCheck(map,minX,maxY);
            
            if(infoBL[0] && (infoTiles[infoBL[3]-1][0][0])){
                //let deltaY = maxY-infoBL[2];
                this.moveVector.y=0;
                //this.position.y -= deltaY+this.moveVector.y;
                //this.timesJumped = 0;
                //this.inAir = false;
              }

            let infoBR = tileCheck(map,maxX,maxY);
            if( infoBR[0] && (infoTiles[infoBR[3]-1][0][0])){
                //let deltaY = maxY-infoBR[2];
                this.moveVector.y = 0;
                //this.position.y -= deltaY;
                //this.timesJumped = 0;
                //this.inAir = false;
            }
            if(!(infoBR[0])&& !(infoBL[0])){
                this.moveVector.y = 1;
                //this.inAir = true;
            }
        }

        //Moves up
        else{
            console.log("up");
            let infoTL = tileCheck(map,minX,minY)

            if(infoTL[0]){

                this.moveVector.y=0;
                this.position.y = infoTL[2]+65;
            }
            let infoTR = tileCheck(map,maxX,minY);
            if(infoTR[0]){

                this.moveVector.y=0;
                this.position.y = infoTR[2]+65;
            }
        }
    }
}

class Wasp extends Enemy {

    constructor(spriteNumber, position, moveVector, size, speed, health, chunk){
        super(spriteNumber, position, moveVector, size, speed, health, chunk);
        this.enemyType = 1;
    }

    detectPlayer(playerVector){
        //console.log("position: ", this.position);
        let pl = new Vector(playerVector.x, playerVector.y);
        //console.log("pl: ", pl);
        let pos = this.position;
        //console.log("pos", pos);
        pl.subtract(pos);//this.position); //GIVES NAN
        //console.log("pl: ", pl);
        pl.normalize();
        //console.log("normalized: ", pl);
        this.moveVector.x = pl.x;
        this.moveVector.y = pl.y;
        //console.log(this.moveVector);
    }
}