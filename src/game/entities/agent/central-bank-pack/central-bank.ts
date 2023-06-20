import Agent, { IAgentChild } from '..';
import SkillPrintNotes from '../../../skill/skill-print-notes';

export default class CentralBank extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'central-bank',
    });

    this.maxHp = 50000;
    this.hp = 50000;
    this.weight = 5;
    this.ejectCollidingAgents = true;

    // Size
    this.width = 256;
    this.height = 256;
    this.spriteData.width = 320;
    this.spriteData.height = 320;

    // Central bank does not move.
    this.__speed = 0;

    this.addSkill(new SkillPrintNotes({ agent: this }));
  }
}
