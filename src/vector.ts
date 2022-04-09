export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector): void {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v: Vector): void {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n: number): void {
    this.x *= n;
    this.y *= n;
  }

  div(n: number): void {
    this.x /= n;
    this.y /= n;
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distance(v: Vector): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  normalize(): void {
    const m = this.mag();
    if (m > 0) {
      this.div(m);
    }
  }

  setMag(mag: number): void {
    this.normalize();
    this.mult(mag);
  }

  limit(max: number): void {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
  }

  base(min: number): void {
    if (this.mag() < min) {
      this.normalize();
      this.mult(min);
    }
  }

  static random(mag: number = 1): Vector {
    const angle = Math.random() * Math.PI * 2;
    const length = mag;
    return new Vector(length * Math.cos(angle), length * Math.sin(angle));
  }

  static sub(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }
}
