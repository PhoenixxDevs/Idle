class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  setTo(x,y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  multiply(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    if (scalar !== 0) {
      return new Vector2(this.x / scalar, this.y / scalar);
    } else {
      throw new Error("Division by zero");
    }
  }
  zero() {
    this.x = 0;
    this.y = 0;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let mag = this.magnitude();
    if (mag > 0) {
      return this.divide(mag);
    }
    return new Vector2(0, 0);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  // Rotate the vector by a given angle in radians
  rotate(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    return new Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }

  // Create a new vector with a random direction but same magnitude
  randomizeDirection() {
    let angle = Math.random() * 2 * Math.PI;
    return this.rotate(angle);
  }

  // Create a new vector that is the reflection of this vector off a normal vector
  reflect(normal) {
    let dotProduct = this.dot(normal);
    return this.subtract(normal.multiply(2 * dotProduct));
  }

  // Randomly add or subtract the x and y components of this vector
  chaos() {
    let randomFactorX = (Math.random() - 0.5) * 2; // Range: -1 to 1
    let randomFactorY = (Math.random() - 0.5) * 2; // Range: -1 to 1
    return new Vector2(
      this.x + randomFactorX * this.x,
      this.y + randomFactorY * this.y
    );
  }
}

function checkContact(a,b){
  let dx = a.pos.x - b.pos.x;
  let dy = a.pos.y - b.pos.y;
  let result = false;
  Math.sqrt(dx * dx  + dy * dy) > a.size + b.size ? result = false : result = true;
  return result;
}

function rgbaString(r, g, b, a) {
  // Wrap the RGB values to be within 0-255
  r = r % 256;
  g = g % 256;
  b = b % 256;

  // Ensure alpha value is within 0-1  clamping
  a = Math.max(0, Math.min(1, a));

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function randFloat(a, b, precision = 1) {
  let factor = Math.pow(10, precision);
  let randomFloat = Math.random() * (b - a) + a;
  // move to left of decimal place by factor
  // chop decimals off
  // move back
  return Math.round(randomFloat * factor) / factor;
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function drawCircle(c){
  ctx.beginPath();
  ctx.fillStyle = c.color.value;
  ctx.arc(c.pos.x, c.pos.y, c.size, 0, Math.PI * 2);
  ctx.fill();
}

function handleTouch(e, reset) {
  // Tab to edit
  //e.preventDefault();

  if (reset) {
    if (e.changedTouches[0].identifier ===
      0) {
      touch.pos1.x = undefined;
      touch.pos1.y = undefined;
    }
    else {
      touch.pos2.x = undefined;
      touch.pos2.y = undefined;
    }
    return
  }

  if (e.changedTouches[0].identifier === 0) {
    touch.pos1 = new Vector2(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
  }
  else {
    touch.pos2 = new Vector2(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
  }
}