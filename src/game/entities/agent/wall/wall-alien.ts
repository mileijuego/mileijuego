import Agent, { IAgentChild } from '..';
import Game from '../../../game';
import SkillProjectile from '../../../skill/skill-projectile';

export default class WallAlien extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'wall-alien',
    });

    this.maxHp = 10000;
    this.hp = 10000;
    this.width = 96;
    this.height = 96;
    this.weight = 5;
    this.damage = 100;
    this.__speed = 0; // Wall
    this.ejectCollidingAgents = true;

    this.spriteData.width = 96;
    this.spriteData.height = 96;

    this.addSkill(
      new SkillProjectile(
        { agent: this },
        { delay: 1, projectileKey: 'projectile-happy' },
      ),
    );
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
