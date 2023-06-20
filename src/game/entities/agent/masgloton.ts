import Agent, { IAgentChild } from '.';
import SkillBarrani from '../../skill/skill-barrani';
import SkillLarrataBag from '../../skill/skill-larrata-bag';
import SkillMagicCircleProjectiles from '../../skill/skill-magic-circle-projectiles';
import SkillPesos from '../../skill/skill-pesos';
import SkillShield from '../../skill/skill-shield';
import SkillSpawnMaslaboys from '../../skill/skill-spawn-maslaboys';

export default class Masgloton extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'masgloton',
    });

    this.maxHp = 30000;
    this.hp = 30000;
    this.damage = 60;
    this.weight = 4;
    this.__speed = 2;
    this.__minSpeed = 0.5;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = [
      'masgloton-economia',
      'masgloton-procedan',
      'masgloton-espectaculares',
      'masgloton-barrani',
    ];

    this.addSkill(new SkillLarrataBag({ agent: this }));
    this.addSkill(
      new SkillMagicCircleProjectiles(
        { agent: this },
        undefined,
        'masgloton-economia',
        'projectile-bitcoin',
      ),
    );
    this.addSkill(
      new SkillShield(
        { agent: this },
        {
          shieldKey: 'shield-projectile-healer',
          delay: 7,
          initialDelay: 1.5,
          duration: 2.5,
        },
      ),
    );
    this.addSkill(new SkillPesos({ agent: this }));
    this.addSkill(new SkillSpawnMaslaboys({ agent: this }));
    this.addSkill(new SkillBarrani({ agent: this }));
  }
}
