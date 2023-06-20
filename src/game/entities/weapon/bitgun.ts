import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class Bitgun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 400;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'ak47';

    this.projectileKey = 'projectile-bitcoin';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
