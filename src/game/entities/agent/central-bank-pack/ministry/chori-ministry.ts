import Agent, { IAgentChild } from '../..';
import MinistrySpawnCampodists from '../../../../skill/ministry-spawn-campodists';

export default class ChoriMinistry extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'chori-ministry',
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

    this.addSkill(new MinistrySpawnCampodists({ agent: this }));
  }
}
