import Agent, { IAgentChild } from '.';
import BalloonCircle from '../../skill/balloon-circle';
import LarrataPots from '../../skill/larrata-pots';
import Vector2D from '../../utils/vector-2d';
import BalloonGun from '../weapon/balloon-gun';
import TileGun from '../weapon/tile-gun';

export default class Larrata extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'larrata',
    });

    this.maxHp = 10000;
    this.hp = 10000;
    this.weight = 2;
    this.damage = 24;
    this.__minSpeed = 0.5;

    this.spawnSoundsKey = ['dialogo-consenso'];

    this.addEntity(
      new TileGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addEntity(
      new BalloonGun({
        position: new Vector2D(this.position.x - 16, this.position.y + 24),
      }),
    );

    this.addSkill(new BalloonCircle({ agent: this }));
    this.addSkill(new LarrataPots({ agent: this }));
  }
}
