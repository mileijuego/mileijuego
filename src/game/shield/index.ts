import Agent from '../entities/agent';
import Projectile from '../entities/projectile';
import Game from '../game';
import { shieldKey } from './shields-map';

export interface IShield {
  agent: Agent;
  duration: number;
}

export default class Shield {
  public shieldKey?: shieldKey;
  public duration: number;
  protected agent: Agent;

  constructor(props: IShield) {
    this.agent = props.agent;
    this.duration = props.duration;
  }

  public onHit(game: Game, projectile: Projectile) {
    throw new Error('Define in child');
  }
}
