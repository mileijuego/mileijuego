import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class TileGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 35;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-tile';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
