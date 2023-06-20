import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { ItemBag } from '../entities/item/items';
import Vector2D from '../utils/vector-2d';
import { getRandomIntInRange } from '../utils';

export default class SkillLarrataBag extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 10;

    // Initial delay:
    this.__timeToNextRound = 5000;

    this.soundKey = 'haha';
  }

  execute(game: Game) {
    const margin = 256;
    const bags = 4;

    for (let i = 0; i < bags; i++) {
      let x = 0;
      let y = 0;
      do {
        x = getRandomIntInRange(
          this.agent.position.x - margin,
          this.agent.position.x + margin,
        );
        y = getRandomIntInRange(
          this.agent.position.y - margin,
          this.agent.position.y + margin,
        );
      } while (game.isOutside(x, y));

      game.addItem(
        new ItemBag(
          {
            team: this.agent.team,
            position: new Vector2D(x, y),
          },
          this.agent.agent,
        ),
      );
    }
  }
}
