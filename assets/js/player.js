class Player {
  constructor() {
    this.size = Math.floor(width * height) / 9400;
    this.pos = new Vector2(width / 2, height / 2);
    this.vel = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.topSpeed = -12;
    this.thrust = {
      left: {
        pos: this.pos,
        offset: new Vector2(-this.size * 0.7, this.size * 0.7),
        active: false
      },
      right: {
        pos: this.pos,
        offset: new Vector2(this.size * 0.7, this.size * 0.7),
        active: false
      },
      force: new Vector2(0.1, -0.3),
      size: this.size * 0.4,
      color: new Color(180, 248, 220, 1)
    }
    this.color = new Color(255, 135, 230, 1);
    this.r = 0;
    this.count = 1;
    this.bounce = 0.4;
    this.mass = 1;
  }
  calibrateThrusters() {
    this.thrust.left.pos = this.pos.add(this.thrust.left.offset);
    this.thrust.right.pos = this.pos.add(this.thrust.right.offset);
    if (this.thrust.right.active) {
      this.thrust.right.pos.x += randFloat(-2, 2, 2);
      this.thrust.right.pos.y += randFloat(-2, 2, 2)
    }
    if (this.thrust.left.active) {
      this.thrust.left.pos.x += randFloat(-2, 2, 2);
      this.thrust.left.pos.y += randFloat(-2, 2, 2)
    }
  }
  colorRotate() {
    this.color.r = this.r;
    this.color.update();
    this.r = Math.abs((255 / this.topSpeed) * this.vel.y * 0.8);
    //if(this.r > 254 || this.r < 1){this.count *= -1;}
  }
  applyGravity() {
    this.vel.y += gravity * this.mass;
  }
  applyAcceleration() {
    this.vel = this.vel.add(this.acceleration);
    this.acceleration.zero();
  }
  move() {
    this.applyAcceleration();
    this.applyGravity();

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

    if (this.vel.y <= 0.015 && this.vel.y >= -0.015) {
      this.vel.y = 0;
    }
    this.pos = this.pos.add(this.vel);
    this.checkBounds();
  }
  checkBounds() {
    if (this.pos.y < this.size) {
      this.vel.y *= -this.bounce;
      this.pos.y = this.size;
    }
    if (this.pos.y > height - this.size) {
      this.vel.y *= -this.bounce;
      this.pos.y = height - this.size;
    }
    if (this.pos.x < this.size) {
      this.vel.x *= -this.bounce;
      this.pos.x = this.size;
    }
    if (this.pos.x > width - this.size) {
      this.vel.x *= -this.bounce;
      this.pos.x = width - this.size;
    }
  }
  checkTouch() {
    if (touch.pos1.x <= width / 2 || touch.pos2.x <= width / 2) {
      this.thrust.left.active = true;
    }
    else {
      this.thrust.left.active = false;
    }
    if (touch.pos1.x >= width / 2 || touch.pos2.x >= width / 2) {
      this.thrust.right.active = true;
    }
    else {
      this.thrust.right.active = false;
    }
  }
  handleInput() {
    if (this.thrust.left.active) {
      if (Math.round(Math.random() * chance.spark)) {
        createParticles('spark', 1, 0);
      }
      if (Math.round(Math.random() * chance.fire)) {
        createParticles('fire', 1, 0);
      }
      this.acceleration = this.acceleration.add(this.thrust.force);
    }
    if (this.thrust.right.active) {
      if (Math.round(Math.random() * chance.spark)) {
        createParticles('spark', 1, 1);
      }
      if (Math.round(Math.random() * chance.fire)) {
        createParticles('fire', 1, 1);
      }

      this.acceleration.x -= this.thrust.force.x;
      this.acceleration.y += this.thrust.force.y;
    }
    if (this.thrust.left.active && this.thrust.right.active) {
      if (Math.round(Math.random() * chance.spark)) {
        createParticles('spark', 1, 0);
      }
      if (Math.round(Math.random() * chance.fire)) {
        createParticles('fire', 1, 0);
      }
      if (Math.round(Math.random() * chance.spark)) {
        createParticles('spark', 1, 1);
      }
      if (Math.round(Math.random() * chance.fire)) {
        createParticles('fire', 1, 1);
      }
      this.acceleration.x = 0;
      this.acceleration.y / 2;
    }
    if (!this.thrust.left.active && !this.thrust.right.active)
    {
      this.acceleration.zero();
    }
  }
  drawBody() {
    // body
    ctx.beginPath();
    ctx.fillStyle = this.color.value;
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    this.drawThrusters();
  }
  drawEyes(){
    // left eye
    ctx.beginPath();
    ctx.fillStyle = this.eye.color.value;
    ctx.arc(this.eye.left.pos.x, this.eye.left.pos.y, this.eye.size, 0, Math.PI * 2);
    ctx.fill();
    
    // right eye
    ctx.beginPath();
    ctx.fillStyle = this.eye.color.value;
    ctx.arc(this.eye.left.pos.x, this.eye.left.pos.y, this.eye.size, 0, Math.PI * 2);
    ctx.fill();
  }
  drawThrusters() {
    // left thrust
    ctx.beginPath();
    ctx.fillStyle = this.thrust.color.value;
    ctx.arc(this.thrust.left.pos.x, this.thrust.left.pos.y, this.thrust.size, 0, Math.PI * 2);
    ctx.fill();

    // right
    ctx.beginPath();
    ctx.fillStyle = this.thrust.color.value;
    ctx.arc(this.thrust.right.pos.x, this.thrust.right.pos.y, this.thrust.size, 0, Math.PI * 2);
    ctx.fill();
  }
  draw() {
    this.drawBody();
    //this.drawEyes();
    this.drawThrusters();
  }
  update() {
    this.checkTouch();
    this.handleInput();
    this.move();
    this.calibrateThrusters();
    this.draw();
    this.colorRotate();
  }
}