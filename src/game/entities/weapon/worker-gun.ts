import { IWeapon } from '../../interfaces';
import Weapon from '../weapon';

export default class WorkerGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 45;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-worker-shovel';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
