import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class LittleGoldenChoriGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 30;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-little-golden-chori';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
