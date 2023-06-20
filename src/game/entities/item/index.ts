import Game from '../../game';
import { IEntity } from '../../interfaces';
import Agent from '../agent';
import Entity from '../entity';

export interface IItem extends IEntity {
  team: number;
}

export default class Item extends Entity {
  protected team: number;

  constructor(props: IItem) {
    super(props);

    this.team = props.team;

    this.width = 64;
    this.height = 64;

    this.spriteData = {
      spriteKey: 'item',
      itemKey: '', // Define in child
      width: this.width,
      height: this.height,
      position: this.position.clone(),
      rotation: 0,
    };
  }

  public canCollect(agent: Agent) {
    return agent.team === this.team;
  }

  public checkIfIsCollecting(agent: Agent) {
    return this.canCollect(agent) && agent.isCollidingWith(this);
  }

  public onCollect(game: Game, agent: Agent) {}
}
