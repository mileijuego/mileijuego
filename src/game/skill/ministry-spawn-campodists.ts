import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import FatCampodist from '../entities/agent/fat-campodist';
import { getRandomFromArray } from '../utils';
import Vector2D from '../utils/vector-2d';

export default class MinistrySpawnCampodists extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 18;
    this.__timeToNextRound = 1000; // Initial delay
  }

  execute(game: Game) {
    const offSet = 96;

    for (let i = 0; i < 6; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new FatCampodist({
            team: this.agent.team,
            position: new Vector2D(
              getRandomFromArray([
                this.agent.position.x - offSet,
                this.agent.position.x + offSet,
              ]),
              getRandomFromArray([
                this.agent.position.y - offSet,
                this.agent.position.y + offSet,
              ]),
            ),
          }),
        );
      }, 500 * i);
    }
  }
}
