class Particle {
  constructor() {
    this.pos,
      this.vel,
      this.acceleration,
      this.size,
      this.color,
      this.fadeMutator;
    this.stroke = "#ddd";
    this.collidesWall = false;
    this.remove = false;
  }
  applyFade(){
    this.color.a -= this.fadeMutator;
    if(this.color.a < 0.1){
      this.remove = true;
    }
    this.color.update();
  }
  applyGravity() {
    this.vel.y += gravity * this.mass;
  }
  applyAcceleration() {
    this.vel = this.vel.add(this.acceleration);
    this.acceleration.zero();
  }
  chooseSide(side) {
    if (!side) {
      this.pos = player.pos.add(player.thrust.left.offset);
      this.vel.x = randFloat(-1, -4);
    }
    else {
      this.pos = player.pos.add(player.thrust.right.offset);
      this.vel.x = randFloat(1, 4) ;
    }
  }
  isVisible() {
    if (this.pos.x + this.size > 0 &&
      this.pos.x - this.size < width &&
      this.pos.y + this.size > 0 &&
      this.pos.y + this.size < height) {
      return true;
    }
    else {
      return false;
    }
  }
  move() {
    this.applyAcceleration();
    this.applyGravity();

    //top speed
    if (this.vel.y < this.topSpeed) {
      this.vel.y = this.topSpeed;
    }
    if (this.vel.y > -this.topSpeed) {
      this.vel.y = -this.topSpeed
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
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color.value;
    ctx.strokeStyle = this.stroke;
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
    //console.log('is visible:' + this.isVisible());
  }
  update() {
    this.draw();
  }
}

function createParticles(type, num, side) {
  for (let i = 0; i < num; i++) {
    switch (type) {
      case 'spark':
        particles.push(new Spark(side));
        break;
        case 'fire':
        particles.push(new Fire(side));
        break;
    }

  }
}

class Spark extends Particle {
  constructor(side) {
    super();
    this.vel = new Vector2(0, randFloat(2, 4));
    this.chooseSide(side)
    this.mass = 0.1;
    this.acceleration = new Vector2();
    this.size = randFloat(2, 5, 2);
    this.color = new Color(255, 250, 205);
    this.fadeMutator = 0.04;
  }
  update() {
    this.remove = !this.isVisible();
    this.vel.y += Math.cos(this.pos.x) * 1.5;
    this.applyFade();
    this.move();
    this.draw();
  }
}

class Fire extends Particle {
  constructor(side) {
    super();
    this.vel = new Vector2(0, randFloat(0.5, 5));
    this.chooseSide(side);
    this.mass = 0.2;
    this.acceleration = new Vector2();
    this.size = randFloat(4, 8, 2);
    this.color = new Color(randFloat(230,255,2), randFloat(100,180,2), randFloat(70,120,2));
    this.fadeMutator = 0.02;
  }
  attemptSmoke(){
    if(this.color.a < 0.3){
      if(Math.round(Math.random() - 0.7)){
        let a = particles.indexOf(this);
        particles[particles.indexOf(this)] = new Smoke(this);
      }
    }
  }
  update() {
    this.remove = !this.isVisible();
    this.attemptSmoke();
    this.applyFade();
    //this.vel.y += Math.cos(this.pos.x) * 1.5;
    this.mass -= 0.02;
    this.move();
    this.draw();
  }
}

class Smoke extends Particle {
  constructor(fire){
    super();
    this.pos = fire.pos;
    this.size = fire.size;
    this.vel = fire.vel;
    this.acceleration = fire.acceleration;
    this.mass = fire.mass + 0.7;
    this.darkness = randFloat(25, 70, 2);
    this.color = new Color(this.darkness, this.darkness, this.darkness, 0.6);
    
  }
  update(){
    this.remove = !this.isVisible();
    this.fadeMutator = 0.01;
    this.applyFade();
    this.vel.x += Math.sin(this.pos.y) * 0.5;
    this.mass -= 0.08;
    this.move();
    this.draw();
  }
}