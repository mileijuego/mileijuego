import Agent, { IAgentChild } from '..';
import { IWeapon } from '../../../interfaces';
import SkillSpawnAgents from '../../../skill/skill-spawn-agents';
import Vector2D from '../../../utils/vector-2d';
import Weapon from '../../weapon';

class Gun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 30;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-l';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

class Gun2 extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 25;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-pink-heart';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class Luladrao extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'luladrao',
    });

    this.maxHp = 200000;
    this.hp = 200000;
    this.damage = 300;
    this.weight = 4;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = ['luladrao-narrativa'];
    this.deadSoundKey = 'alberso-selva';

    this.setMultipleShot(2);

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addEntity(
      new Gun2({
        position: new Vector2D(this.position.x - 32, this.position.y + 48),
      }),
    );

    this.addSkill(
      new SkillSpawnAgents(
        { agent: this },
        { delay: 18, soundKey: 'luladrao-sindinero', agentKey: 'br-ofe' },
      ),
    );
  }
}
