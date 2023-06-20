import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class BananaGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 25;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-banana';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
