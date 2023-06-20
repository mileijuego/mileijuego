import Agent, { IAgentChild } from '.';
import Vector2D from '../../utils/vector-2d';
import BananaGun from '../weapon/banana-gun';

export default class Gorilla extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'gorilla',
    });

    this.maxHp = 200;
    this.hp = 200;
    this.damage = 32;

    this.spawnSoundsKey = ['gorilla'];
    this.spawnSoundChance = 0.15;

    this.addEntity(
      new BananaGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
