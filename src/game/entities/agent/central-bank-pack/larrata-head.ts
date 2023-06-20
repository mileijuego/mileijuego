import Agent, { IAgentChild } from '..';
import BalloonFireCircle from '../../../skill/balloon-fire-circle';

export default class LarrataFireHead extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'larrata-fire-head',
    });

    this.maxHp = 2000;
    this.hp = 2000;
    this.damage = 24;
    this.__speed = 3;

    this.spawnSoundsKey = ['grieta'];
    this.spawnSoundChance = 0.5;

    this.width = 96;
    this.height = 96;
    this.spriteData.width = 96;
    this.spriteData.height = 96;

    this.addSkill(new BalloonFireCircle({ agent: this }));
  }
}
