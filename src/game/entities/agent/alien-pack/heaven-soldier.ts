import Agent, { IAgentChild } from '..';
import { IWeapon } from '../../../interfaces';
import SkillShield from '../../../skill/skill-shield';
import { getRandomFromArray } from '../../../utils';
import Vector2D from '../../../utils/vector-2d';
import Weapon from '../../weapon';

export class HeavenGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 45;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-heaven-shovel';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class HeavenSoldier extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: getRandomFromArray(['heaven-man', 'heaven-woman']),
    });

    this.maxHp = 4000;
    this.hp = 4000;
    this.damage = 550;

    this.addEntity(
      new HeavenGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(
      new SkillShield(
        { agent: this },
        {
          shieldKey: getRandomFromArray([
            'shield-projectile-blocker',
            'shield-projectile-healer',
            'shield-projectile-reflector',
          ]),
          delay: 10,
          duration: 2,
        },
      ),
    );
  }
}
