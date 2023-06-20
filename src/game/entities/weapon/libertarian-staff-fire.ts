import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class LibertarianStaffFire extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 400;

    this.spriteData.weaponKey = 'libertarian-staff-fire';
    this.spriteData.soundKey = 'ak47';

    this.projectileKey = 'projectile-shovel-fire';

    this.spriteData.width = 80;
    this.spriteData.height = 32;
  }
}
