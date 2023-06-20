import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class VGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 80;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-v';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
