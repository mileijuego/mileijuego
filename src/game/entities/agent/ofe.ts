import Agent, { IAgentChild } from '.';
import SkillShield from '../../skill/skill-shield';
import Vector2D from '../../utils/vector-2d';
import GreenHeartGun from '../weapon/green-heart-gun';

export default class Ofe extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'ofe',
    });

    this.maxHp = 100;
    this.hp = 100;
    this.weight = 2;
    this.damage = 16;

    this.spawnSoundsKey = [
      'ofe-me-seca',
      'ofe-con-tus-hijos',
      'ofe-buena-gente',
    ];
    this.spawnSoundChance = 0.2;

    this.addEntity(
      new GreenHeartGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}

export class OfeProjectile extends Ofe {
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
