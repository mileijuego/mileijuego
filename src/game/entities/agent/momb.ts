import Agent, { IAgentChild } from '.';
import Game from '../../game';
import SkillExplode from '../../skill/skill-explode';

export default class Momb extends Agent {
  private __explosionDamage: number;

  constructor(props: IAgentChild, explosionDamage = 64) {
    super({
      ...props,
      agent: 'momb',
    });

    this.maxHp = 500;
    this.hp = 500;
    this.weight = 1;

    // Size
    this.width = 48;
    this.height = 48;
    this.spriteData.width = 64;
    this.spriteData.height = 64;

    // Does not move.
    this.__speed = 0;

    this.__explosionDamage = explosionDamage;

    this.addSkill(new SkillExplode({ agent: this }, this.__explosionDamage));
  }

  public onDead(game: Game) {
    game.explosion({
      team: this.team,
      radius: 128,
      damage: this.__explosionDamage,
      fireDamage: this.__explosionDamage,
      position: this.position.clone(),
      by: this,
    });
  }
}
