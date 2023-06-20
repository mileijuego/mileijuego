import Agent, { IAgentChild } from '.';
import Vector2D from '../../utils/vector-2d';
import HaterGun from '../weapon/hater-gun';

export default class Hater extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'hater',
    });

    this.maxHp = 10;
    this.hp = 10;
    this.damage = 1;

    this.spawnSoundsKey = ['hater'];
    this.spawnSoundChance = 0.15;

    this.addEntity(
      new HaterGun({
        position: new Vector2D(this.position.x + 12, this.position.y + 16),
      }),
    );
  }
}
