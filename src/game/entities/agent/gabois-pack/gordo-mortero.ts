import Agent, { IAgentChild } from '..';
import Vector2D from '../../../utils/vector-2d';
import GordoMorteroGun from '../../weapon/gordo-mortero-gun';

export default class GordoMortero extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'gordo-mortero',
    });

    this.maxHp = 4000;
    this.hp = 4000;
    this.weight = 3;
    this.damage = 128;

    this.spawnSoundsKey = ['ya-de-bebe'];
    this.spawnSoundChance = 0.01;

    // Size
    this.width = 72;
    this.height = 144;
    this.spriteData.width = 96;
    this.spriteData.height = 192;

    this.addEntity(
      new GordoMorteroGun({
        position: new Vector2D(this.position.x + 24, this.position.y + 36),
      }),
    );
  }
}
