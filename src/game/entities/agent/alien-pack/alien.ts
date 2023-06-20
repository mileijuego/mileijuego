import Agent, { IAgentChild } from '..';
import SkillAlienAbsorption from '../../../skill/skill-alien-absorption';
import SkillAlienWalls from '../../../skill/skill-alien-walls';
import SkillMagicCircleProjectiles from '../../../skill/skill-magic-circle-projectiles';
import SkillMagicCircleProjectiles2 from '../../../skill/skill-magic-circle-projectiles2';
import SkillShield from '../../../skill/skill-shield';
import Vector2D from '../../../utils/vector-2d';
import AlienGun from '../../weapon/alien-gun';

export default class Alien extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'alien',
    });

    this.maxHp = 1000000;
    this.hp = 1000000;
    this.damage = 500;
    this.weight = 10;
    this.__speed = 0.25;
    this.__minSpeed = 0.25;

    // Size
    this.width = 288;
    this.height = 384;
    this.spriteData.width = 384;
    this.spriteData.height = 512;
    this.ejectCollidingAgents = true;

    this.spawnSoundsKey = ['alien-crocantes'];
    this.deadSoundKey = 'alien-dead';

    this.addEntity(
      new AlienGun({
        position: new Vector2D(this.position.x + 96, this.position.y + 24),
      }),
    );

    this.addEntity(
      new AlienGun({
        position: new Vector2D(this.position.x - 96, this.position.y + 24),
      }),
    );

    this.addSkill(new SkillAlienWalls({ agent: this }));

    this.addSkill(
      new SkillMagicCircleProjectiles(
        { agent: this },
        undefined,
        'alien-engineer',
        'projectile-agent-mini-alien',
      ),
    );

    this.addSkill(new SkillAlienAbsorption({ agent: this }));

    this.addSkill(
      new SkillMagicCircleProjectiles2(
        { agent: this },
        undefined,
        'alien-printer',
        'projectile-happy',
      ),
    );

    this.addSkill(
      new SkillShield(
        { agent: this },
        {
          shieldKey: 'shield-projectile-blocker',
          delay: 33,
          initialDelay: 5,
          duration: 2,
          soundKey: 'alien-transformation',
        },
      ),
    );

    this.addSkill(
      new SkillShield(
        { agent: this },
        {
          shieldKey: 'shield-projectile-healer',
          delay: 33,
          initialDelay: 16,
          duration: 2,
          soundKey: 'alien-protocols',
        },
      ),
    );

    this.addSkill(
      new SkillShield(
        { agent: this },
        {
          shieldKey: 'shield-projectile-reflector',
          delay: 33,
          initialDelay: 27,
          duration: 2,
          soundKey: 'alien-protocols2',
        },
      ),
    );
  }
}
