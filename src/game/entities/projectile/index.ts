import Game from '../../game';
import { IEntity } from '../../interfaces';
import Vector2D from '../../utils/vector-2d';
import Agent from '../agent';
import Entity from '../entity';
import TargetableEntity from '../targetable-entity';

export interface IProjectile extends IEntity {
  rotation: number;
  by: Agent;
  damage: number;
}

export default class Projectile extends Entity {
  public rotation: number;
  public position: Vector2D;
  public speed: number;
  public by: Agent;

  // Base projectile damage.
  protected __baseDamage: number = 0;

  // Damage added by the agent.
  private __damage: number;

  private __onImpactEvents: ((p: Projectile) => void)[] = [];
  public addOnImpactEvent(e: (p: Projectile) => void) {
    this.__onImpactEvents.push(e);
  }

  constructor(props: IProjectile) {
    super(props);

    const { rotation, position, by, damage = 0 } = props;

    this.rotation = rotation;
    this.position = position;
    this.speed = 5;
    this.by = by;
    this.__damage = damage;

    this.spriteData = {
      spriteKey: 'projectile',
      projectileKey: '', // Define in child
      width: this.width,
      height: this.height,
      position: this.position.clone(),
      rotation: rotation,
    };
  }

  public get team() {
    return this.by.team;
  }

  public get totalDamage() {
    return this.__baseDamage + this.__damage;
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    const moveX = Math.cos(this.rotation) * this.speed;
    const moveY = Math.sin(this.rotation) * this.speed;

    const vec = new Vector2D(moveX, moveY);

    vec.scaleBy(deltaTime / game.tickLengthMs);

    super.move(vec);
  }

  public canImpactWith(entity: TargetableEntity) {
    return this.team !== entity.team && this.isCollidingWith(entity);
  }

  public onImpact(game: Game, entity: Agent): boolean {
    if (this.team === entity.team) {
      return false;
    }

    game.hurtTargetableEntity(entity, this.totalDamage, this.by);

    this.__onImpactEvents.forEach((e) => e(this));

    game.deactivateProjectile(this); // Removes the projectile
    return true;
  }

  public onRemove(game: Game) {}

  public rotate(value: number) {
    this.rotation += value;
    super.rotate(value);
  }

  public lookAt(x: number, y: number) {
    const rotation = this.getRotationTo(x, y);
    this.rotation = rotation;
    super.lookAt(x, y);
  }

  public changeSource(game: Game, source: Agent) {
    this.by = source;
  }
}
