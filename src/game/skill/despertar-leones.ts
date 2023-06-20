import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import LibertarianLion from '../entities/agent/libertarian-lion';
import { skillKey } from './skill-map';

export const SKILL_LION_BASE_HP = 150;
export const SKILL_LION_BASE_DMG = 10;

export default class DespertarLeones extends Skill {
  public skillKey: skillKey = 'despertar-leones';

  constructor(props: ISkill) {
    super(props);
    this.__delay = 80;

    this.soundKey = 'despertar-leones';
  }

  execute(game: Game) {
    const offSet = 80;

    const lions = [
      new LibertarianLion({
        team: this.agent.team,
        position: this.agent.position.clone(-offSet, -offSet),
      }),
      new LibertarianLion({
        team: this.agent.team,
        position: this.agent.position.clone(offSet, -offSet),
      }),
      new LibertarianLion({
        team: this.agent.team,
        position: this.agent.position.clone(offSet, offSet),
      }),
      new LibertarianLion({
        team: this.agent.team,
        position: this.agent.position.clone(-offSet, offSet),
      }),
    ];

    lions.forEach((lion, i) => {
      lion.hp = SKILL_LION_BASE_HP * this.__points;
      lion.maxHp = SKILL_LION_BASE_HP * this.__points;
      lion.damage = SKILL_LION_BASE_DMG * this.__points;

      game.addTimeout(() => {
        game.addAgent(lion);
      }, i * 250);
    });
  }
}
