import Agent, { IAgentChild } from '..';
import SkillShield from '../../../skill/skill-shield';
import Vector2D from '../../../utils/vector-2d';
import MiniAlienGun from '../../weapon/mini-alien-gun';

export default class MiniAlien extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'mini-alien',
    });

    this.maxHp = 7500;
    this.hp = 7500;
    this.weight = 1;
    this.damage = 200;

    this.spawnSoundsKey = ['reptile'];
    this.spawnSoundChance = 0.1;

    this.addEntity(
      new MiniAlienGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(
      new SkillShield(
        { agent: this },
        { shieldKey: 'shield-projectile-healer', delay: 10, duration: 1 },
      ),
    );
  }
}
