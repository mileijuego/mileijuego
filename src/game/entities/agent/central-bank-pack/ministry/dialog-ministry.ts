import Agent, { IAgentChild } from '../..';
import MinistrySpawnGorillas from '../../../../skill/ministry-spawn-gorillas';

export default class DialogMinistry extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'dialog-ministry',
    });

    this.maxHp = 50000;
    this.hp = 50000;
    this.weight = 5;

    // Size
    this.width = 128;
    this.height = 128;
    this.spriteData.width = 160;
    this.spriteData.height = 160;

    // Does not move.
    this.__speed = 0;

    this.addSkill(new MinistrySpawnGorillas({ agent: this }));
  }
}
