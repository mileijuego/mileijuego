export default class Vector2D {
  private __x: number;
  private __y: number;

  constructor(x: number, y: number) {
    this.__x = x;
    this.__y = y;
  }

  public get x() {
    return this.__x;
  }

  public get y() {
    return this.__y;
  }

  public set(value: number) {
    this.__x = value;
    this.__y = value;
  }

  public setX(x: number) {
    this.__x = x;
  }

  public setY(y: number) {
    this.__y = y;
  }

  /**
   * Sums a Point (X and Y) to direction object
   */
  public sum(direction: Vector2D) {
    this.__x += direction.x;
    this.__y += direction.y;
    return this;
  }

  /**
   * Subs a Point (X and Y) to direction object
   */
  public sub(direction: Vector2D) {
    this.__x -= direction.x;
    this.__y -= direction.y;
    return this;
  }

  /**
   * Modifies the vector scaling it by a number.
   * @param i
   */
  public scaleBy(i: number) {
    this.__x *= i;
    this.__y *= i;
    return this;
  }

  public clone(offSetX: number = 0, offSetY: number = 0) {
    return new Vector2D(this.x + offSetX, this.y + offSetY);
  }

  /**
   * Gets orthogonal vector
   */
  public getOrthogonal(rightSide: boolean) {
    return new Vector2D(
      rightSide ? this.y : -this.y,
      rightSide ? -this.x : this.x,
    );
  }

  public normalize() {
    const lengthSquared = this.x * this.x + this.y * this.y;

    if (lengthSquared !== 0) {
      const inverseLength = 1 / Math.sqrt(lengthSquared);
      this.__x = this.x * inverseLength;
      this.__y = this.y * inverseLength;
    } else {
      this.__x = 0;
      this.__y = 0;
    }

    return this;
  }

  public isZero() {
    const margin = 0.0001;
    return (
      this.x < margin && this.x > -margin && this.y < margin && this.y > -margin
    );
  }

  // public getDistance(to: Vector2D, sumX = 0, sumY = 0) {
  //   let y0 = to.x - this.x + sumX;
  //   let x0 = to.y - this.y + sumY;

  //   return Math.sqrt(x0 * x0 + y0 * y0);
  // }

  /**
   * Calculates the squared distance between two points.
   * It's better in performance than getDistance but returns the result squared.
   */
  public getDistanceSquared(to: Vector2D, sumX = 0, sumY = 0) {
    const dx = to.x - this.x + sumX;
    const dy = to.y - this.y + sumY;
    return dx * dx + dy * dy;
  }

  public magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

  public dotProduct(vec: Vector2D): number {
    return this.x * vec.x + this.y * vec.y;
  }

  public isEqual(vec: Vector2D) {
    return this.x === vec.x && this.y === vec.y;
  }
}
