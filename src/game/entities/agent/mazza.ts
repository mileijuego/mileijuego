import Agent, { IAgentChild } from '.';
import Game from '../../game';
import { IWeapon } from '../../interfaces';
import SkillMagicCircleProjectiles from '../../skill/skill-magic-circle-projectiles';
import SkillSpawnAgents from '../../skill/skill-spawn-agents';
import Vector2D from '../../utils/vector-2d';
import Weapon from '../weapon';

class Gun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 50;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-pancakes';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class Mazza extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'mazza',
    });

    this.maxHp = 30000;
    this.hp = 30000;
    this.damage = 48;
    this.weight = 4;
    this.__speed = 2;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = ['mazza-1'];

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addSkill(
      new SkillMagicCircleProjectiles(
        { agent: this },
        undefined,
        '',
        'projectile-pancakes',
      ),
    );

    this.addSkill(
      new SkillSpawnAgents(
        { agent: this },
        {
          delay: 16,
          initialDelay: 4,
          soundKey: 'mazza-1',
          agentKey: 'gordo-mortero',
        },
      ),
    );
  }
}
