import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class SkillHealing extends Skill {
  constructor(
    props: ISkill,
    {
      delay = 5,
      initialDelay = 0,
    }: {
      delay: number;
      initialDelay?: number;
    },
  ) {
    super(props);
    this.__delay = delay;

    if (initialDelay) {
      this.__timeToNextRound = initialDelay * 1000;
    }
  }

  execute(game: Game) {
    if (this.agent.hp < this.agent.maxHp) {
      game.healAgent(this.agent, this.agent.maxHp * 0.05);
    }
  }
}
