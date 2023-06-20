import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class LibertarianStaffGold extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 400;

    this.spriteData.weaponKey = 'libertarian-staff-gold';
    this.spriteData.soundKey = 'ak47';

    this.projectileKey = 'projectile-shovel-gold';

    this.spriteData.width = 80;
    this.spriteData.height = 32;
  }
}
