import Agent, { IAgentChild } from '..';
import { IWeapon } from '../../../interfaces';
import Vector2D from '../../../utils/vector-2d';
import Weapon from '../../weapon';

class NpcGun extends Weapon {
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

export default class Gleta extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'gleta',
    });

    this.maxHp = 4000;
    this.hp = 4000;
    this.damage = 50;

    this.spawnSoundsKey = ['gleta-howdareyou', 'gleta-stolen'];
    this.spawnSoundChance = 0.25;

    // Adds 1 more projectile.
    this.setMultipleShot(1);

    this.addEntity(
      new NpcGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
