import Agent, { IAgentChild } from '.';
import Vector2D from '../../utils/vector-2d';
import PamyGun from '../weapon/pamy-gyn';

export default class OldLady extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'old-lady',
    });

    this.maxHp = 150;
    this.hp = 150;
    this.damage = 24;

    this.spawnSoundsKey = ['si-se-puede'];
    this.spawnSoundChance = 0.15;

    this.addEntity(
      new PamyGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
