import Agent, { IAgentChild } from '.';
import Vector2D from '../../utils/vector-2d';
import ChoriGun from '../weapon/chori-gun';

export default class FatCampodist extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'fat-campodist',
    });

    this.maxHp = 400;
    this.hp = 400;
    this.weight = 3;
    this.damage = 24;

    this.spawnSoundsKey = ['ya-de-bebe'];
    this.spawnSoundChance = 0.01;

    this.addEntity(
      new ChoriGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
