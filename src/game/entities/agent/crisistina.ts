import Agent, { IAgentChild } from '.';
import Game from '../../game';
import { TRIGGER_COLOR_SCREEN } from '../../game-triggers';
import ChoriCircle from '../../skill/chori-circle';
import CrisistinaDropMoney from '../../skill/crisistina-drop-money';
import SkillTeleportToPlayer from '../../skill/skill-teleport-to-player';
import SpawnFatCampodists from '../../skill/spawn-fat-campodists';
import Vector2D from '../../utils/vector-2d';
import VGun from '../weapon/v-gun';
import CrisistinaDevil from './crisistina-devil';

export default class Crisistina extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'crisistina',
    });

    this.maxHp = 20000;
    this.hp = 20000;
    this.weight = 2;
    this.damage = 32;
    this.__minSpeed = 0.5;

    this.spawnSoundsKey = ['crisistina-miedo'];

    this.addEntity(
      new VGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(new SpawnFatCampodists({ agent: this }));
    this.addSkill(
      new SkillTeleportToPlayer({ agent: this }, 'crisistina-yo-pelotudo'),
    );
    this.addSkill(new ChoriCircle({ agent: this }));
    this.addSkill(new CrisistinaDropMoney({ agent: this }));
  }

  public onDead(game: Game) {
    // Crisistina on dead, it will create crisistina devil in the same position
    game.addAgent(
      new CrisistinaDevil({ team: this.team, position: this.position }),
    );
    game.trigger(TRIGGER_COLOR_SCREEN, [0x000000, 4000]);
  }
}
