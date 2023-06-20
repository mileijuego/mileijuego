import Wall from '.';
import { IAgentChild } from '..';
import Game from '../../../game';
import SkillSpawnNpc from '../../../skill/skill-spawn-npc';

export default class WallAlien2 extends Wall {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'wall-alien2',
    });

    this.maxHp = 10000;
    this.hp = 10000;
    this.width = 96;
    this.height = 96;
    this.weight = 5;
    this.ejectCollidingAgents = true;

    this.spriteData.width = 96;
    this.spriteData.height = 96;

    this.addSkill(new SkillSpawnNpc({ agent: this }));
  }

  onDead(game: Game) {
    const dmg = 500;

    game.explosion({
      team: this.team,
      radius: 192,
      damage: dmg,
      fireDamage: dmg / 3,
      by: this,
      position: this.position,
    });
  }
}
