import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
export default class SkillExplode extends Skill {
  private __damage: number;

  constructor(props: ISkill, damage: number) {
    super(props);
    this.__timeToNextRound = 3000;
    this.__damage = damage;
  }

  execute(game: Game) {
    game.explosion({
      team: this.agent.team,
      radius: 128,
      damage: this.__damage,
      fireDamage: this.__damage,
      position: this.agent.position.clone(),
      by: this.agent,
    });

    // This will remove the entity once has exploded.
    this.agent.hp = 0;
  }
}
