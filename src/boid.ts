import { Vector } from "./vector";
import { randomNumBetween } from "./helpers";

export class Boid {
  private position: Vector;
  private velocity: Vector;
  private acceleration: Vector;

  private radius: number;

  private visualRange: number;
  private protectedRange: number;

  private maxSpeed: number;
  private minSpeed: number;

  private avoidFactor: number;
  private matchingFactor: number;
  private centeringFactor: number;
  private turnFactor: number;

  constructor(pos: Vector) {
    this.position = pos;
    this.velocity = Vector.random(randomNumBetween(1, 2));
    this.acceleration = new Vector(0, 0);

    this.radius = 15;

    this.visualRange = 75;
    this.protectedRange = 10;

    this.maxSpeed = 3;
    this.minSpeed = 2;

    this.turnFactor = 0.2;

    this.avoidFactor = 0.05;
    this.matchingFactor = 0.05;
    this.centeringFactor = 0.0005;
  }

  separation(neighbors: Boid[]): Vector {
    const steering = new Vector(0, 0);

    for (const boid of neighbors) {
      const diff = Vector.sub(this.position, boid.position);
      steering.add(diff);
    }

    steering.mult(this.avoidFactor);

    return steering;
  }

  align(neighbors: Boid[]): Vector {
    const steering = new Vector(0, 0);

    for (const boid of neighbors) {
      steering.add(boid.velocity);
    }

    steering.div(neighbors.length);
    steering.sub(this.velocity);

    steering.mult(this.matchingFactor);

    return steering;
  }

  cohesion(neighbors: Boid[]): Vector {
    const steering = new Vector(0, 0);

    for (const boid of neighbors) {
      steering.add(boid.position);
    }

    steering.div(neighbors.length);
    steering.sub(this.position);

    steering.mult(this.centeringFactor);

    return steering;
  }

  edges(width: number, height: number) {
    if (this.position.x < 50) {
      this.velocity.x += this.turnFactor;
    }
    if (this.position.x > width - 50) {
      this.velocity.x -= this.turnFactor;
    }
    if (this.position.y < 50) {
      this.velocity.y += this.turnFactor;
    }
    if (this.position.y > height - 50) {
      this.velocity.y -= this.turnFactor;
    }
  }

  getNeighborsInVisualRange(boids: Boid[]): Boid[] {
    const neighbors = [];
    for (const boid of boids) {
      const d = boid.position.distance(this.position);
      if (boid !== this && d < this.visualRange) {
        neighbors.push(boid);
      }
    }

    return neighbors;
  }

  getNeighborsInProtectedRange(boids: Boid[]): Boid[] {
    const neighbors = [];
    for (const boid of boids) {
      const d = boid.position.distance(this.position);
      if (boid !== this && d < this.protectedRange) {
        neighbors.push(boid);
      }
    }

    return neighbors;
  }

  update(boids: Boid[]) {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    this.velocity.limit(this.maxSpeed);
    this.velocity.base(this.minSpeed);
    this.acceleration.mult(0);

    const neighborsInVisualRange = this.getNeighborsInVisualRange(boids);
    const neighborsInProtectedRange = this.getNeighborsInProtectedRange(boids);

    if (neighborsInProtectedRange.length > 0) {
      const separation = this.separation(neighborsInProtectedRange);
      this.acceleration.add(separation);
    }

    if (neighborsInVisualRange.length > 0) {
      const alignment = this.align(neighborsInVisualRange);
      const cohesion = this.cohesion(neighborsInVisualRange);
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle);
    ctx.translate(-this.position.x, -this.position.y);
    ctx.fillStyle = "#34D399";
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(
      this.position.x - this.radius,
      this.position.y + this.radius / 3
    );
    ctx.lineTo(
      this.position.x - this.radius,
      this.position.y - this.radius / 3
    );
    ctx.lineTo(this.position.x, this.position.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
