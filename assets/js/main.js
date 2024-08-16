const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const points = document.getElementById('points');
const touch = {
  pos1: new Vector2(undefined, undefined),
  pos2: new Vector2(undefined, undefined),
  num: [],
}
const chance = {
  spark: 0.6,
  fire: 0.7
}
const shop = document.getElementById('shop');
const shopToggle = document.getElementById('shop-toggle');

let width, height, player, point;
let gravity = 0.2;
let particles = [];
let clouds = [];

function main(){
  width = window.innerWidth;
  height = window.innerHeight;
  //width = 400;
  //height = 600;
  canvas.width = width;
  canvas.height = height;
  
  player = new Player();
  point = new Point();
  
  
  touch.pos1.x = undefined;
  touch.pos1.y = undefined;
  touch.pos2.x = undefined;
  touch.pos2.y = undefined;
  
  
  //console.log(player.color.value, point.color.value, particles[0].color.value)
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  //ctx.fillStyle = 'rgba(0,0,0,0.3)';
  //ctx.fillRect(0,0,width,height);
  ctx.clearRect(0,0,width,height)
  for (cloud of clouds) {
    cloud.update();
    if (cloud.remove) {
      clouds.splice(clouds.indexOf(cloud), 1);
    }
  }
  for (particle of particles){
    particle.update();
    if(particle.remove){
      particles.splice(particles.indexOf(particle), 1);
    }
    // console.log(particle)
  }
  point.update();
  player.update();
 
  if(Math.round(randFloat(0,0.502,2))){
    clouds.push(new Cloud());
    //console.log(clouds[0], clouds[1])
  }
  points.innerText = `${point.count - 1}pts`;
}

main();

function shopToggler(){
 if(shop.classList.contains('active')){
   shop.classList.remove('active');
  points.classList.remove('active');
 } 
 else {
   shop.classList.add('active');
   points.classList.add('active');
 }
 //console.log(shop.classList.contains('active'))
}

////// TOUCH EVENTS

window.addEventListener('touchstart', (e) => {
  handleTouch(e,0);
  //animate();
});
window.addEventListener('touchmove', (e) => {
  handleTouch(e,0);
  
});
window.addEventListener('touchend', (e)=> {
  handleTouch(e, 1);
});
window.addEventListener('touchexit', (e)=> {
  handleTouch(e, 1);
});