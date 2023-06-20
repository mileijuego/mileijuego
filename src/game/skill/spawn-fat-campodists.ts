import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import FatCampodist from '../entities/agent/fat-campodist';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';

export default class SpawnFatCampodists extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 24;

    // Initial delay:
    this.__timeToNextRound = 16000;

    this.soundKey = 'ya-de-bebe';
  }

  execute(game: Game) {
    const offSet = 128;

    for (let i = 0; i < 6; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new FatCampodist({
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
