import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';
import Maslaboy from '../entities/agent/maslaboy';

export default class SkillSpawnMaslaboys extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 24;

    // Initial delay:
    this.__timeToNextRound = 7500;

    this.soundKey = 'masgloton-procedan';
  }

  execute(game: Game) {
    const offSet = 128;

    const furthestEnemy = game.getFurthestEnemy(this.agent);

    if (!furthestEnemy) {
      return;
    }

    for (let i = 0; i < 16; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new Maslaboy({
            team: this.agent.team,
            position: new Vector2D(
              getRandomIntInRange(
                furthestEnemy.position.x - offSet,
                furthestEnemy.position.x + offSet,
              ),
              getRandomIntInRange(
                furthestEnemy.position.y - offSet,
                furthestEnemy.position.y + offSet,
              ),
            ),
          }),
        );
      }, 100 * i);
    }
  }
}
