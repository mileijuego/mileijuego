import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class MaskGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 100;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-mask';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
