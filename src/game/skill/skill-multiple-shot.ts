import Skill from '.';
import Game from '../game';
import { skillKey } from './skill-map';

export default class SkillMultipleShot extends Skill {
  public skillKey: skillKey = 'multiple-shot';

  public setPoints(value: number, game: Game): void {
    super.setPoints(value, game);
    this.agent.setMultipleShot(value);
  }

  protected execute(game: Game): void {
    // Passive skills do nothing in the execute method.
  }
}
