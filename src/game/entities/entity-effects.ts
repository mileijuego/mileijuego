import Vector2D from '../utils/vector-2d';
import Entity from './entity';

export class EntityEffects {
  private __isFrozen = false;
  private __isSlowedDown = false;
  private __isBurning = false;
  private __speedToSum = 0;
  private __entity: Entity;
  private __drunkTime = 0;
  private __drunkDeviation: Vector2D = new Vector2D(0, 0);

  constructor(entity: Entity) {
    this.__entity = entity;
  }

  get isFrozen() {
    return this.__isFrozen;
  }
  get isSlowedDown() {
    return this.__isSlowedDown;
  }
  get isBurning() {
    return this.__isBurning;
  }

  get speedToSum() {
    return this.__speedToSum;
  }

  get drunkTime() {
    return this.__drunkTime;
  }
  get drunkDeviation() {
    return this.__drunkDeviation;
  }

  public setFrozen(value: boolean) {
    this.__isFrozen = value;
    this.updateEntityEffects();
  }
  public setSlowedDown(value: boolean) {
    this.__isSlowedDown = value;
    this.updateEntityEffects();
  }
  public setBurning(value: boolean) {
    this.__isBurning = value;
    this.updateEntityEffects();
  }
  public setSpeedToSum(value: number) {
    this.__speedToSum = value;
  }
  public setDrunkTime(value: number) {
    this.__drunkTime = value;
  }

  public updateEntityEffects() {
    this.__entity.forEach((e) => {
      if (e.updateEntityEffects) e.updateEntityEffects(this);
    });
  }
}
