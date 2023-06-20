import Agent, { IAgentChild } from '.';
import Game from '../../game';
import { IWeapon } from '../../interfaces';
import SkillSpawnAgents from '../../skill/skill-spawn-agents';
import SkillSpawnMombs from '../../skill/skill-spawn-mombs';
import Vector2D from '../../utils/vector-2d';
import Weapon from '../weapon';

class Gun extends Weapon {
  constructor(props: IWeapon) {
    super(props);

    this.roundsPerMinute = 50;

    this.spriteData.weaponKey = 'bitgun';
    this.spriteData.soundKey = 'shotgun';

    this.projectileKey = 'projectile-wine';

    this.spriteData.width = 40;
    this.spriteData.height = 12;
  }
}

export default class Bullshit extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'bullshit',
    });

    this.maxHp = 20000;
    this.hp = 20000;
    this.damage = 48;
    this.weight = 4;
    this.__speed = 2;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = ['bullshit-3'];

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addEntity(
      new Gun({
        position: new Vector2D(this.position.x - 32, this.position.y + 48),
      }),
    );

    this.addSkill(
      new SkillSpawnMombs(
        { agent: this },
        {
          delay: 12,
          initialDelay: 2,
          soundKey: 'bullshit-2',
          explosionDamage: 64,
        },
      ),
    );

    this.addSkill(
      new SkillSpawnAgents(
        { agent: this },
        {
          delay: 16,
          initialDelay: 4,
          soundKey: 'bullshit-1',
          agentKey: 'old-lady',
        },
      ),
    );
  }

  public onCreate(game: Game) {
    this.addModifier(game, {
      type: 'drunk',
      value: 0,
      duration: Number.POSITIVE_INFINITY,
    });
  }
}
