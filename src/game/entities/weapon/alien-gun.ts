import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class AlienGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 45;

    this.spriteData.weaponKey = 'alien-gun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-agent-mini-alien';

    this.spriteData.width = 320;
    this.spriteData.height = 128;
    this.spriteData.pivotX = -140;
  }
}
