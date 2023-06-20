import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class DivineStaff extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 400;

    this.spriteData.weaponKey = 'divine-staff';
    this.spriteData.soundKey = 'ak47';

    this.projectileKey = 'projectile-divine-shovel';

    this.spriteData.width = 80;
    this.spriteData.height = 32;
  }
}
