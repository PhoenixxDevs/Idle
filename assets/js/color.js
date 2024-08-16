class Color {
  constructor(r = 0, g = 0, b = 0, a = 1){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.value = rgbaString(this.r, this.g, this.b, this.a);
  }
  update(){
    this.value = rgbaString(this.r, this.g, this.b, this.a);
    return this.value;
  }
}