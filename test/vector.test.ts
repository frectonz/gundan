import { describe, expect, test } from "vitest";
import { Vector } from "../src/vector";

const DELTA = 0.00001;

describe("Vector", () => {
  test("add", () => {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);

    v1.add(v2);

    expect(v1).toEqual(new Vector(4, 6));
  });

  test("sub", () => {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);

    v1.sub(v2);

    expect(v1).toEqual(new Vector(-2, -2));
  });

  test("mult", () => {
    const v1 = new Vector(1, 2);

    v1.mult(2);

    expect(v1).toEqual(new Vector(2, 4));
  });

  test("div", () => {
    const v1 = new Vector(1, 2);

    v1.div(2);

    expect(v1).toEqual(new Vector(0.5, 1));
  });

  test("mag", () => {
    const v1 = new Vector(1, 2);

    expect(v1.mag()).toBe(Math.sqrt(5));
  });

  test("distance", () => {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);

    expect(v1.distance(v2)).toBe(Math.sqrt(8));
  });

  test("normalize", () => {
    const v1 = new Vector(1, 1);
    v1.normalize();
    expect(v1.mag()).approximately(1, DELTA);
  });

  test("set mag", () => {
    const v1 = new Vector(1, 1);
    v1.setMag(10);
    expect(v1.mag()).toBe(10);
  });

  test("limit", () => {
    const v1 = new Vector(6, 8);
    expect(v1.mag()).toBe(10);
    v1.limit(12);
    expect(v1.mag()).toBe(10);
    v1.limit(4);
    expect(v1.mag()).toBe(4);
  });

  test("base", () => {
    const v1 = new Vector(6, 8);
    expect(v1.mag()).toBe(10);
    v1.base(4);
    expect(v1.mag()).toBe(10);
    v1.base(16);
    expect(v1.mag()).toBe(16);
  });

  test("random vector", () => {
    expect(Vector.random().mag()).toBe(1);
    expect(Vector.random(16).mag()).approximately(16, DELTA);
  });

  test("subtract vector", () => {
    expect(Vector.sub(new Vector(1, 1), new Vector(1, 1))).toEqual(
      new Vector(0, 0)
    );
  });
});
