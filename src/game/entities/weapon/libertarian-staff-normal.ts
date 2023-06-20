import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class LibertarianStaffNormal extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 400;

    this.spriteData.weaponKey = 'libertarian-staff-normal';
    this.spriteData.soundKey = 'ak47';

    this.projectileKey = 'projectile-shovel';

    this.spriteData.width = 80;
    this.spriteData.height = 32;
  }
}
