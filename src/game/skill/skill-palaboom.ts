import Skill from '.';
import Game from '../game';
import { skillKey } from './skill-map';

export default class SkillPalaboom extends Skill {
  public skillKey: skillKey = 'palaboom';

  public setPoints(value: number, game: Game): void {
    super.setPoints(value, game);

    const chance = 0.01 * value;
    this.agent.setExplosiveProjectileChance(chance);
  }

  protected execute(game: Game): void {
    // Passive skills do nothing in the execute method.
  }
}
