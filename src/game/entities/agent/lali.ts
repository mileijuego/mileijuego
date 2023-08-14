import Agent, { IAgentChild } from '.';
import SkillMagicCircleProjectiles from '../../skill/skill-magic-circle-projectiles';

export default class Lali extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'lali',
    });

    this.maxHp = 300;
    this.hp = 300;
    this.damage = 2;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.addSkill(
      new SkillMagicCircleProjectiles(
        { agent: this },
        undefined,
        '',
        'projectile-tear',
      ),
    );
  }
}
