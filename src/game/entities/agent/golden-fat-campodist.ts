import Agent, { IAgentChild } from '.';
import Vector2D from '../../utils/vector-2d';
import LittleGoldenChoriGun from '../weapon/little-golden-chori-gun';

export default class GoldenFatCampodist extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'golden-fat-campodist',
    });

    this.maxHp = 1000;
    this.hp = 1000;
    this.weight = 4;
    this.damage = 48;

    this.spawnSoundsKey = ['ya-de-bebe'];
    this.spawnSoundChance = 0.01;

    this.addEntity(
      new LittleGoldenChoriGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
