import { Boid } from "./boid";
import { Vector } from "./vector";
import { randomNumBetween } from "./helpers";

export class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boids: Boid[];

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.boids = [];
    this.resize();

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", () => {
      this.resize();
    });

    this.setup();
    window.requestAnimationFrame(() => this.update());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setup() {
    const NUM_BOIDS = 100;
    this.boids = new Array(NUM_BOIDS).fill(null).map(() => {
      const pos = new Vector(
        randomNumBetween(
          this.canvas.width / 2 - 100,
          this.canvas.width / 2 + 100
        ),
        randomNumBetween(
          this.canvas.height / 2 - 100,
          this.canvas.height / 2 + 100
        )
      );
      return new Boid(pos);
    });
  }

  update() {
    this.ctx.fillStyle = "rgba(0, 0, 0, .1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (const boid of this.boids) {
      boid.edges(this.canvas.width, this.canvas.height);
      boid.update(this.boids);
      boid.draw(this.ctx);
    }

    window.requestAnimationFrame(() => this.update());
  }
}
