import Agent, { IAgentChild } from '.';
import SkillShield from '../../skill/skill-shield';
import Vector2D from '../../utils/vector-2d';
import EGun from '../weapon/e-gun';

export default class Pibi extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'pibi',
    });

    this.maxHp = 50;
    this.hp = 50;
    this.damage = 8;

    this.spawnSoundsKey = ['pibi-les-pibis', 'pibi-futbol', 'pibi-manija'];
    this.spawnSoundChance = 0.25;

    this.addEntity(
      new EGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}

export class PibiProjectile extends Pibi {
  constructor(props: IAgentChild) {
    super({
      ...props,
    });
    this.spawnSoundChance = 0;

    this.addSkill(
      new SkillShield(
        { agent: this },
        { shieldKey: 'shield-projectile-blocker', delay: 10, duration: 1 },
      ),
    );
  }
}
