import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';
import GoldenFatCampodist from '../entities/agent/golden-fat-campodist';

export default class SpawnGoldenFatCampodists extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 24;

    // Initial delay:
    this.__timeToNextRound = 16000;

    this.soundKey = 'ya-de-bebe';
  }

  execute(game: Game) {
    const offSet = 128;

    for (let i = 0; i < 5; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new GoldenFatCampodist({
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
