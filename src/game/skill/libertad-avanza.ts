import Skill from '.';
import { IModifier } from '../entities/targetable-entity';
import Game from '../game';
import { ISkill } from '../interfaces';
import { skillKey } from './skill-map';

export default class LibertadAvanza extends Skill {
  public skillKey: skillKey = 'libertad-avanza';

  constructor(props: ISkill) {
    super(props);
    this.__delay = 16;

    this.soundKey = 'libertad-avanza';
  }

  execute(game: Game) {
    const healing = 50 * this.__points;

    game.healAgent(this.agent, healing);

    const modifier: IModifier = {
      type: 'speed',
      value: 15,
      duration: 3,
    };
    this.agent.addModifier(game, modifier);
  }
}
