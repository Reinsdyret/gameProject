class Projectile{
    startVector;
    pos;
    spritesheetId;
    v;
    a;
    speed;
    width;
    height;

    constructor(xDirection,yDirection,x,y,spritesheetId,speed,width,height){
        this.pos = new Vector(x,y);
        this.startVector = new Vector(x,y);
        this.v = new Vector(xDirection,yDirection);
        this.a = new Vector(0,0.1);// Insert gravity variable
        this.spritesheetId = spritesheetId; 
        this.speed = speed;
        this.width = width;
        this.height = height;
    }

    update(){
        let changeableVector = this.v.clone();
        changeableVector.add(a);
        
    }

    draw(ctx,spriteSheetWidth,spriteSideLength,spritesheet){
        let scale = (canvas.width / width) / spriteSideLength;
        ctx.drawImage(spritesheet,
            ((this.spritesheetId-1) % spriteSheetWidth) * this.width, Math.floor((this.spritesheetId -1) / spriteSheetWidth) * this.height,
            this.width, this.height,
            this.posVector.x,this.posVector.y,
            this.width * scale, this.height * scale);
    }

    delete(){

    }

    get traveled(){
        let newVector = this.posVector.subtract(this.startVector);
        return newVector.length;
    }
}