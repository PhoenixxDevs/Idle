class Cloud {
  constructor(){
    this.maxSize = 255;
    this.grayScale = randFloat(100,this.maxSize,2);
    this.size = this.grayScale / 7;
    //this.thickness = randFloat(0.6, 1, 2);
    this.offset = new Vector2(randFloat(this.size * 1.2, this.size * 1.7, 2), -randFloat(-this.size * 0.4, -this.size * 0.25, 2));
    this.width = this.offset.x * 2;
    this.pos = new Vector2(
      (width / 2) * 2 + (this.offset.x * 2),
      //(height - this.size * (height / this.size))
      //(height / this.grayScale * this.size) * this.size
      (height - (this.size * this.size) * 0.6)
      //(height / 20) * (this.maxSize - this.grayScale)
      );
    this.color = `rgba(${this.grayScale}, ${this.grayScale}, ${this.grayScale}, 1)`;
    this.acceleration = new Vector2(0,0);
    this.vel = new Vector2(-1 / 40 * this.size,0);
    this.remove = false;
  }
  isVisible(){
    let r = true;
    if (this.pos.x < -this.offset.x * 3) r = false;
    return r;
  }
  draw(){
    this.color = `rgba(${this.grayScale + this.pos.y}, ${this.grayScale}, ${this.grayScale}, 1)`;
    //mid
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    //left
    ctx.beginPath();
    ctx.arc(this.pos.x - this.offset.x, this.pos.y + this.offset.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ;
    //right
    ctx.beginPath();
    ctx.arc(this.pos.x + this.offset.x, this.pos.y + this.offset.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    //bottom
    ctx.fillRect(this.pos.x - this.offset.x, this.pos.y + this.offset.y, this.width, this.size);
    
  }
  applyAcceleration() {
    this.vel = this.vel.add(this.acceleration);
    this.acceleration.zero();
  }
  move() {
    this.applyAcceleration();
    
    //this.applyGravity();
  
    //top speed
    if (this.vel.y < this.topSpeed) {
      this.vel.y = this.topSpeed;
    }
    if (this.vel.y > -this.topSpeed) {
      this.vel.y = -this.topSpeed;
    }
    if (this.vel.x < this.topSpeed) {
      this.vel.x = this.topSpeed;
    }
    if (this.vel.x > -this.topSpeed) {
      this.vel.x = -this.topSpeed;
    }
  
    if (this.vel.y <= 0.01 && this.vel.y >= 0.01) {
      this.vel.y = 0;
    }
    this.pos = this.pos.add(this.vel);
    if (!this.collidesWall) {
      return
    }
    this.checkBounds();
  }
  update(){
    this.move();
    this.draw();
    this.remove = !this.isVisible();
  }
}