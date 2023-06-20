import { IWeapon } from '../../interfaces';
import Weapon from '.';

export default class MiniAlienGun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 50;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey =
      Math.random() < 0.5 ? 'projectile-agent-ofe' : 'projectile-agent-pibi';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}
