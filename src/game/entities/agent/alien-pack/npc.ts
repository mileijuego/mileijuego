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

    this.projectileKey = 'projectile-currenthing';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class Npc extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'npc',
    });

    this.maxHp = 1500;
    this.hp = 1500;
    this.damage = 50;

    // this.spawnSoundsKey = ['pibi-les-pibis', 'pibi-futbol', 'pibi-manija'];
    // this.spawnSoundChance = 0.25;

    this.addEntity(
      new NpcGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
