import Skill from '.';
import MiniAlien from '../entities/agent/alien-pack/mini-alien';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class SkillSpawnMiniAlien extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 3;

    // Initial delay:
    this.__timeToNextRound = 1000;
  }

  execute(game: Game) {
    game.addAgent(
      new MiniAlien({
        team: this.agent.team,
        position: this.agent.position.clone(),
      }),
    );
  }
}
