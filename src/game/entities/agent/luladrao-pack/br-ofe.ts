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

    this.projectileKey = 'projectile-pink-heart';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class BrOfe extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'br-ofe',
    });

    this.maxHp = 10000;
    this.hp = 10000;
    this.weight = 2;
    this.damage = 160;

    this.spawnSoundsKey = ['br-b1', 'br-b2', 'br-b3'];
    this.spawnSoundChance = 0.2;

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
