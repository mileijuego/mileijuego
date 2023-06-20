import Agent, { IAgentChild } from '..';
import Game from '../../../game';
import SkillSpawnMiniAlien from '../../../skill/skill-spawn-mini-alien';

export default class WallAlien4 extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'wall-alien4',
    });

    this.maxHp = 10000;
    this.hp = 10000;
    this.width = 96;
    this.height = 96;
    this.weight = 5;
    this.__speed = 0; // Wall
    this.ejectCollidingAgents = true;

    this.spriteData.width = 96;
    this.spriteData.height = 96;

    this.addSkill(new SkillSpawnMiniAlien({ agent: this }));
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
