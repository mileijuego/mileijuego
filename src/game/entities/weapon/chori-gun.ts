import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class ChoriGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 30;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-chori';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
