import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class LibertarianStaffIce extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 400;

    this.spriteData.weaponKey = 'libertarian-staff-ice';
    this.spriteData.soundKey = 'ak47';

    this.projectileKey = 'projectile-shovel-ice';

    this.spriteData.width = 80;
    this.spriteData.height = 32;
  }
}
