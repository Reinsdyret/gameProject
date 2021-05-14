
let maxY = this.pos.y + this.height + this.v.y + this.a.y;
let minX = this.pos.x;




let infoBL = tileCheck(map,minX,maxY);
if( infoBL[0]){
    let deltaY = maxY-infoBL[2];
    this.v.y=0;
    this.pos.y -= deltaY;
    this.inAir = false;
}
    
  
