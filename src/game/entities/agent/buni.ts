import Agent, { IAgentChild } from '.';
import { IWeapon } from '../../interfaces';
import SkillHealing from '../../skill/skill-healing';
import Vector2D from '../../utils/vector-2d';
import Weapon from '../weapon';

class Gun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 50;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-jsjs';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class Buni extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'buni',
    });

    this.maxHp = 100;
    this.hp = 100;
    this.damage = 48;
    this.weight = 4;
    this.__speed = 2;

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(new SkillHealing({ agent: this }, { delay: 5 }));
  }
}
