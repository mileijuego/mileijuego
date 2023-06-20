import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class GreenHeartGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 25;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-green-heart';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
