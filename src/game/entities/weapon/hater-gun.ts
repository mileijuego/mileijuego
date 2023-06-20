import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class HaterGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 25;

    this.spriteData.weaponKey = 'hater-gun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-tear';

    this.spriteData.width = 48;
    this.spriteData.height = 36;
    this.spriteData.pivotX = -28;
  }
}
