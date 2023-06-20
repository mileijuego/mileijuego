import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class GordoMorteroGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 15;

    this.spriteData.weaponKey = 'gordo-mortero-gun';
    this.spriteData.soundKey = 'gordo-mortero-gun';

    this.projectileKey = 'projectile-gordo-mortero';

    this.spriteData.width = 120;
    this.spriteData.height = 48;
  }
}
