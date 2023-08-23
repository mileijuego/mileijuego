import Skill from '.';
import { getRandomElementByChance } from '../../utils/utils';
import Buni from '../entities/agent/buni';
import Game from '../game';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';
import { skillKey } from './skill-map';

export default class SkillBuni extends Skill {
  public skillKey: skillKey = 'buni';

  public setPoints(value: number, game: Game): void {
    super.setPoints(value, game);

    const [sumX, sumY] = this.getPos();

    const pos = this.agent.position.clone().sum(new Vector2D(sumX, sumY));

    const ally = new Buni({
      position: pos,
      team: this.agent.team,
    });

    const hp = this.agent.maxHp * value;
    const damage = 5 + this.agent.damage * value;

    ally.maxHp = hp;
    ally.hp = hp;
    ally.damage = damage;

    game.addAgent(ally);
  }

  protected execute(game: Game): void {
    // Passive skills do nothing in the execute method.
  }

  private getPos() {
    return getRandomElementByChance([
      {
        // Left
        value: [
          -this.agent.width,
          getRandomIntInRange(-this.agent.height, this.agent.height),
        ],
        chance: 1,
      },
      {
        // Right
        value: [
          this.agent.width,
          getRandomIntInRange(-this.agent.height, this.agent.height),
        ],
        chance: 1,
      },

      {
        // Top
        value: [
          getRandomIntInRange(-this.agent.width, this.agent.width),
          -this.agent.height,
        ],
        chance: 1,
      },
      {
        // Bottom
        value: [
          getRandomIntInRange(-this.agent.width, this.agent.width),
          this.agent.height,
        ],
        chance: 1,
      },
    ]);
  }
}
