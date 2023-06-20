import Agent, { IAgentChild } from '.';
import Vector2D from '../../utils/vector-2d';
import ProcedaGun from '../weapon/proceda-gun';

export default class Maslaboy extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'maslaboy',
    });

    this.maxHp = 300;
    this.hp = 300;
    this.damage = 16;
    this.__speed = 3;

    this.addEntity(
      new ProcedaGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
