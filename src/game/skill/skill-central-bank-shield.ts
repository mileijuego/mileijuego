import { ISkill } from '../interfaces';
import SkillShield from './skill-shield';

export default class SkillCentralBankShield extends SkillShield {
  constructor(props: ISkill) {
    super(props, {
      shieldKey: 'shield-projectile-reflector',
      delay: 2,
      duration: 2,
    });
    // The Central Bank shield will ignore if it's frozen.
    this.__ignoreFrozen = true;
  }
}
