import Agent, { IAgentChild } from '..';
import { IWeapon } from '../../../interfaces';
import SkillShield from '../../../skill/skill-shield';
import Vector2D from '../../../utils/vector-2d';
import Weapon from '../../weapon';

export class SylvesterGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 50;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-costillar';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class SylvesterVillarruel extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'sylvester',
    });

    this.maxHp = 30000;
    this.hp = 30000;
    this.weight = 2;
    this.damage = 64;
    this.__speed = 2;

    this.addEntity(
      new SylvesterGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(
      new SkillShield(
        { agent: this },
        {
          shieldKey: 'shield-projectile-healer',
          delay: 7,
          initialDelay: 1.5,
          duration: 2,
        },
      ),
    );
  }
}
