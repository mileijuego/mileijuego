import Agent, { IAgentChild } from '..';
import Game from '../../../game';
import { TRIGGER_COLOR_SCREEN } from '../../../game-triggers';
import ChoriCircle from '../../../skill/chori-circle';
import CrisistinaDropMoney from '../../../skill/crisistina-drop-money';
import SkillShield from '../../../skill/skill-shield';
import SkillTeleportToPlayer from '../../../skill/skill-teleport-to-player';
import SpawnFatCampodists from '../../../skill/spawn-fat-campodists';
import Vector2D from '../../../utils/vector-2d';
import VGun from '../../weapon/v-gun';
import CentralBankCrisistinaDevil from './central-bank-crisistina-devil';

export default class CentralBankCrisistina extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'central-bank-crisistina',
    });

    this.maxHp = 40000;
    this.hp = 40000;
    this.weight = 4;
    this.damage = 48;
    this.__speed = 3;
    this.__minSpeed = 0.5;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = ['crisistina-miedo'];

    this.addEntity(
      new VGun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addSkill(new SpawnFatCampodists({ agent: this }));
    this.addSkill(
      new SkillTeleportToPlayer({ agent: this }, 'crisistina-yo-pelotudo'),
    );
    this.addSkill(new ChoriCircle({ agent: this }));
    this.addSkill(new CrisistinaDropMoney({ agent: this }));
    this.addSkill(
      new SkillShield(
        { agent: this },
        { shieldKey: 'shield-projectile-healer', delay: 10, duration: 2 },
      ),
    );
  }

  public onDead(game: Game) {
    // Crisistina on dead, it will create crisistina devil in the same position
    game.addAgent(
      new CentralBankCrisistinaDevil({
        team: this.team,
        position: this.position,
      }),
    );
    game.trigger(TRIGGER_COLOR_SCREEN, [0x000000, 4000]);
  }
}
