class Vector{
    x;
    y;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    get length(){
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    toString(){
        return "[" + this.x + "," + this.y + "]";
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    subtract(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }

    multiply(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }

    static multiply(vector,vector2){
        return vector.x * vector2.x + vector.y * vector2.y;
    }

    normalize(){
        this.x /= this.length;
        this.y /= this.length;
    }

    clone(){
        return new Vector(this.x,this.y);
    }

    get angle() {
        return Math.atan(this.y/this.x);
    }

    isNormal(vector){
        return Vector.multiply(this,vector) == 0;
    }

    isParallell(vector){
        return (this.x/vector.x)*vector.y == this.y;
    }

    rotate(angle){
        let newX = Math.cos(angle)*this.x-Math.sin(angle)*this.y;
        let newY = Math.sin(angle)*this.x+Math.cos(angle)*this.y;
        this.x = newX;
        this.y = newY;
    }

    get normal(){
        let oldX = this.x;
        let oldY = this.y;
        this.rotate(0.5 * Math.PI);
        let newVector = new Vector(this.x,this.y);
        this.x = oldX;
        this.y = oldY
        return newVector;
    }
}