import Agent from '../entities/agent';
import { ISkill } from '../interfaces';
import Game from '../game';
import { TRIGGER_SKILL_EXECUTED } from '../game-triggers';
import { soundKey } from '../sounds';
import { skillKey } from './skill-map';

export default class Skill {
  public skillKey?: skillKey;

  // Skill points
  protected __points: number = 1;
  public setPoints(value: number, game: Game) {
    this.__points = value;
  }
  public get points() {
    return this.__points;
  }

  public agent: Agent;

  protected __delay: number;
  protected __timeToNextRound: number = 0;

  public soundKey?: soundKey;
  public effectKey?: string;
  public effectDuration?: number;

  // True if the agent can execute the skill if is frozen and also it won't be affected
  // by the slowed down effects.
  protected __ignoreFrozen = false;
  get ignoreFrozen() {
    return this.__ignoreFrozen;
  }

  constructor(props: ISkill) {
    this.agent = props.agent;
    this.__delay = 9999;
    this.soundKey = '';
  }

  public tryToExecute(game: Game) {
    if (this.agent.entityEffects.isFrozen && !this.__ignoreFrozen) {
      // Agents cannot execute skills if they are frozen.
      return;
    }

    if (this.__timeToNextRound > 0) {
      return;
    }

    this.execute(game);
    game.trigger(TRIGGER_SKILL_EXECUTED, [this]);

    this.__timeToNextRound = this.__delay * 1000;
  }

  protected execute(game: Game) {
    throw new Error('Use subclass');
  }

  public get secondsToNextRound() {
    if (this.__timeToNextRound < 0) {
      return 0;
    }

    return Math.round(this.__timeToNextRound / 1000);
  }

  /**
   * Subtracts time
   */
  public subTime(time: number) {
    this.__timeToNextRound -= time;
  }
}
