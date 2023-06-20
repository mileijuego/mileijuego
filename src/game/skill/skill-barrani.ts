import Skill from '.';
import Game from '../game';
import { TRIGGER_AGENT_INVISIBLE } from '../game-triggers';
import { ISkill } from '../interfaces';
export default class SkillBarrani extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 17;

    this.__timeToNextRound = 10000;

    this.soundKey = 'masgloton-barrani';
  }

  execute(game: Game) {
    const duration = 5000;
    const agents = game.getAgentsOfTeam(this.agent.team);

    agents.forEach((a, i) => {
      game.addTimeout(() => {
        game.trigger(TRIGGER_AGENT_INVISIBLE, [a, true]);
      }, i * 50);

      game.addTimeout(() => {
        game.trigger(TRIGGER_AGENT_INVISIBLE, [a, false]);
      }, i * 50 + duration);
    });
  }
}
