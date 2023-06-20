import { isCloseTo } from '../../utils/utils';
import { IEntity } from '../interfaces';
import { rotationToPoint } from '../utils';
import Vector2D from '../utils/vector-2d';

export default class Entity {
  public width: number;
  public height: number;
  public position: Vector2D;

  public spriteData?: any;
  private entities: Entity[];

  public uuid: string;

  public onMoveEvents = new Set<(vector: Vector2D) => void>();

  constructor(props: IEntity) {
    this.entities = [];
    this.position = props.position;

    this.width = 0;
    this.height = 0;

    this.uuid = props.uuid || createUUID();
  }

  public move(vector: Vector2D) {
    this.position.sum(vector);
    this.onMoveEvents.forEach((e) => e(vector));
    this.entities.forEach((e) => e.move(vector));
  }

  public moveTo(vector: Vector2D) {
    const offsetX = vector.x - this.position.x;
    const offsetY = vector.y - this.position.y;
    this.move(new Vector2D(offsetX, offsetY));
  }

  public rotate(value: number) {
    this.entities.forEach((e) => e.rotate(value));
  }

  public lookAt(x: number, y: number) {
    this.entities.forEach((e) => e.lookAt(x, y));
  }

  public getRotationTo(x: number, y: number) {
    return rotationToPoint(x, y, this.position.x, this.position.y);
  }

  public resize(x: number, y: number) {
    this.width += x;
    this.height += y;
    this.entities.forEach((e) => e.resize(x, y));
  }

  public forEach(fn: (e: any) => void) {
    fn(this);
    this.entities.forEach((e) => e.forEach(fn));
  }

  public isCollidingWith(e: Entity, customX?: number, customY?: number) {
    const hw = this.width / 2; // Half width
    const hh = this.height / 2; // Half height

    const ehw = e.width / 2; // Entity half width
    const ehh = e.height / 2; // Entity half height

    const posX = customX !== undefined ? customX : this.position.x;
    const posY = customY !== undefined ? customY : this.position.y;

    const isXColliding =
      e.position.x + hw >= posX - ehw && e.position.x - hw <= posX + ehw;
    const isYColliding =
      e.position.y + hh >= posY - ehh && e.position.y - hh <= posY + ehh;

    return isXColliding && isYColliding;
  }

  public addEntity(e: Entity) {
    this.entities.push(e);
  }

  public removeEntity(e: Entity) {
    const index = this.entities.indexOf(e);
    if (index > -1) {
      this.entities.splice(index, 1);
    } else {
      throw new Error('Entity not found');
    }
  }

  public hurt(n: number, notAnimate: boolean = false) {
    this.entities.forEach((e) => e.hurt(n, notAnimate));
  }

  public heal(n: number, addToMaxHp: boolean = false) {
    this.entities.forEach((e) => e.heal(n, addToMaxHp));
  }

  public attack() {
    this.entities.forEach((e) => e.attack());
  }

  // public getDistance(x: number, y: number, sumX = 0, sumY = 0) {
  //   let y0 = x - this.position.x + sumX;
  //   let x0 = y - this.position.y + sumY;
  //   return Math.sqrt(x0 * x0 + y0 * y0);
  // }

  /**
   * Calculates the squared distance between two points.
   * It's better in performance than getDistance but returns the result squared.
   */
  public getDistanceSquared(x: number, y: number, sumX = 0, sumY = 0) {
    const dx = x - this.position.x + sumX;
    const dy = y - this.position.y + sumY;
    return dx * dx + dy * dy;
  }

  public getOrthogonalMovementTo(
    x: number,
    y: number,
    movement: Vector2D,
    obstaclePosition: Vector2D,
  ) {
    // Getting orthogonal
    // http://stackoverflow.com/questions/1560492/how-to-tell-whether-a-point-is-to-the-right-or-left-side-of-a-line
    const side =
      (x - this.position.x) * (obstaclePosition.y - this.position.y) -
        (y - this.position.y) * (obstaclePosition.x - this.position.x) >=
      0;

    return movement.getOrthogonal(side);
  }

  public isCloseTo(entity: Entity, tolerance: number) {
    return (
      isCloseTo(this.position.x, entity.position.x, tolerance) &&
      isCloseTo(this.position.y, entity.position.y, tolerance)
    );
  }
}

function createUUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}
