import Skill from '.';
import { IModifier } from '../entities/targetable-entity';
import Game from '../game';
import { ISkill } from '../interfaces';
import { skillKey } from './skill-map';

export default class ZurdosTiemblen extends Skill {
  public skillKey: skillKey = 'zurdos-tiemblen';
  public effectDuration: number;

  constructor(props: ISkill) {
    super(props);
    this.__delay = 16;

    this.effectKey = 'shake';
    this.effectDuration = 2500;
    this.soundKey = 'zurdos-tiemblen';
  }

  execute(game: Game) {
    const damage = 35 * this.__points;

    game.getEnemyAgentsOfTeam(this.agent.team).forEach((a) => {
      game.hurtAgent(a, damage, this.agent);

      const modifier: IModifier = {
        type: 'slowdown',
        value: 0,
        duration: this.effectDuration / 1000,
      };
      a.addModifier(game, modifier);
    });
  }
}
