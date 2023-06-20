import Agent, { IAgentChild } from '.';
import SkillProjectile from '../../skill/skill-projectile';

export default class Bulldog extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'bulldog',
    });

    this.maxHp = 14000;
    this.hp = 14000;
    this.damage = 32;
    this.weight = 4;
    this.__speed = 1;

    // Size
    this.width = 144;
    this.height = 108;
    this.spriteData.width = 192;
    this.spriteData.height = 144;

    this.spawnSoundsKey = ['bulldog'];

    this.addSkill(
      new SkillProjectile(
        { agent: this },
        {
          delay: 2,
          initialDelay: 1,
          soundKey: 'bulldog',
          projectileKey: 'projectile-tear',
        },
      ),
    );
  }
}
