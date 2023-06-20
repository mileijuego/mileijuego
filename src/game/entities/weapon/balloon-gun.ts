import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class BalloonGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 50;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-balloon';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
