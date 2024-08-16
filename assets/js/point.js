class Point {
  constructor(){
    this.size = 8;
    this.vel = new Vector2(0,0);
    this.acceleration = new Vector2(0,0);
    this.a = 1;
    this.flashSpeed = 0.02;
    this.color = new Color(239, 245, 66, 1);
    this.safety = 20;
    this.count = 0;
    this.resetPosition();
  }
  handleRing(){
    if (this.ring.size > this.size) {
    
    ctx.beginPath();
    ctx.arc(this.ring.pos.x, this.ring.pos.y, this.ring.size, 0, Math.PI * 2);
    ctx.strokeStyle = this.color.value;
    ctx.lineWidth = 8;
    ctx.stroke();
    this.ring.size -= this.ring.shrinkSpeed;
    }
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color.value;
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle='black';
    ctx.stroke();
  }
  setColor(){
    this.color.update();
  }
  resetPosition(){
    this.pos = new Vector2(randFloat(this.size, width - this.size),randFloat(this.size, height - this.size));
    this.ringSize = this.size * 20;
    this.ring = {
      pos: this.pos,
      size: this.ringSize,
      shrinkSpeed: 5
    }
    this.count++;
    //console.log(this.count);
    if(this.touchingPlayer() && this.count < this.safety){
      this.resetPosition();
    }
    this.ring.size = this.ringSize;
  }
  touchingPlayer(){
    if(checkContact(this, player)){
      
      return true;
    }
    else { return false; }
  }
  update(){
    if(this.touchingPlayer()){
      this.resetPosition();
    }
    if(this.color.a < 0.15||this.color.a > 1){
      this.flashSpeed *= -1;
    }
    this.color.a -= this.flashSpeed;
    this.setColor();
    this.handleRing();
    this.draw();
  }
}