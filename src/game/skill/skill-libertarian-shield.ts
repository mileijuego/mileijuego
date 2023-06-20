import { ISkill } from '../interfaces';
import { skillKey } from './skill-map';
import SkillShield from './skill-shield';

export default class SkillLibertarianShield extends SkillShield {
  public skillKey: skillKey = 'libertarian-shield';

  constructor(props: ISkill) {
    super(props, {
      shieldKey: 'shield-projectile-reflector',
      soundKey: 'milei-se-lo-pueden-meter',
      delay: 12,
      duration: 2,
    });
  }
}
