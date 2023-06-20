import Agent, { IAgentChild } from '..';
import { IWeapon } from '../../../interfaces';
import Vector2D from '../../../utils/vector-2d';
import Weapon from '../../weapon';

class Gun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 30;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-l';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class BrPibi extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'br-pibi',
    });

    this.maxHp = 5000;
    this.hp = 5000;
    this.damage = 80;

    this.spawnSoundsKey = ['br-a1', 'br-a2', 'br-a3'];
    this.spawnSoundChance = 0.25;

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
