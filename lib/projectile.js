class Projectile{
    startVector;
    pos;
    spritesheetId;
    v;
    a;
    speed;
    width;
    height;

    constructor(x,y,spritesheetId,speed,width,height){
        this.pos = new Vector(x,y);
        this.startVector = new Vector(x,y);
        this.v = new Vector(10,0); // starting velocity;
        this.a = new Vector(0,0.1);// Insert gravity variable
        this.spritesheetId = spritesheetId; 
        this.speed = speed;
        this.width = width;
        this.height = height;
    }

    update(){
        this.v.add(this.a);
        this.pos.add(this.v);
        
    }

    draw(ctx,spriteSheetWidth,spriteSideLength,spritesheet){
        //let scale = (canvas.width / this.width) / spriteSideLength;
        //IMAGE
        /*ctx.drawImage(spritesheet,
            ((this.spritesheetId-1) % spriteSheetWidth) * this.width, Math.floor((this.spritesheetId -1) / spriteSheetWidth) * this.height,
            this.width, this.height,
            this.pos.x,this.pos.y,
            this.width , this.height); //*SCALE på begge*/
        
            //BOX
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos.x%1920,this.pos.y%1024,this.width,this.height);
    }

    delete(){

    }

    get traveled(){
        console.log(this.pos);
        let copiedPos = this.pos.clone();
        let newVector = copiedPos.subtract(this.startVector);
        console.log(newVector);
        return newVector.length();
    }
}