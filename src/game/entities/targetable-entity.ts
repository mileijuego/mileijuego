import Game from '../game';
import { TRIGGER_MODIFIER_ADDED } from '../game-triggers';
import { IEntity } from '../interfaces';
import Agent from './agent';
import Entity from './entity';

export interface IModifier {
  type: 'speed' | 'burning' | 'slowdown' | 'drunk';
  value: number;
  duration: number;
  by?: Agent;
}

export interface ITargetableEntity extends IEntity {
  team: number;
}

export default class TargetableEntity extends Entity {
  public maxHp: number;
  public hp: number;
  public team: number;
  protected __modifiers: IModifier[];
  private __onDeadEvents: (() => any)[] = [];

  constructor(props: ITargetableEntity) {
    super(props);

    this.maxHp = 100;
    this.hp = 100;
    this.team = props.team;

    this.__modifiers = [];
  }

  public get entityType() {
    return 'targetable-entity';
  }

  public heal(healing: number, addToMaxHp: boolean = false) {
    this.hp += healing;

    if (addToMaxHp) {
      this.maxHp += healing;
    }

    super.heal(healing, addToMaxHp);
  }

  public hurt(damage: number, notAnimate: boolean = false) {
    this.hp -= damage;
    super.hurt(damage, notAnimate);
  }

  public get isDead() {
    return this.hp <= 0;
  }

  public onDead(game: Game) {
    this.__onDeadEvents.forEach((event) => event());
  }

  public addOnDeadEvent(event: () => any) {
    this.__onDeadEvents.push(event);
  }

  // Modifiers
  get modifiers() {
    return this.__modifiers;
  }
  public addModifier(game: Game, modifier: IModifier) {
    this.__modifiers.push(modifier);

    game.trigger(TRIGGER_MODIFIER_ADDED, [this, modifier]);

    game.addTimeout(() => {
      this.removeModifier(modifier);
    }, modifier.duration * 1000);
  }

  public removeModifier(modifier: IModifier) {
    const index = this.__modifiers.indexOf(modifier);
    if (index > -1) {
      this.__modifiers.splice(index, 1);
    } else {
      throw new Error('Modifier not found');
    }
  }
}
