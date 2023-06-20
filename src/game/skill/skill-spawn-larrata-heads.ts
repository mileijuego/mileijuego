import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';
import LarrataFireHead from '../entities/agent/central-bank-pack/larrata-head';

export default class SkillSpawnLarrataHeads extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 18;

    // Initial delay:
    this.__timeToNextRound = 6000;

    this.soundKey = 'gusano-larrata';
  }

  execute(game: Game) {
    const offSet = 128;

    for (let i = 0; i < 3; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new LarrataFireHead({
            team: this.agent.team,
            position: new Vector2D(
              getRandomIntInRange(
                this.agent.position.x - offSet,
                this.agent.position.x + offSet,
              ),
              getRandomIntInRange(
                this.agent.position.y - offSet,
                this.agent.position.y + offSet,
              ),
            ),
          }),
        );
      }, 500 * i);
    }
  }
}
