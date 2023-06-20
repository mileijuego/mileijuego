import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import Npc from '../entities/agent/alien-pack/npc';
import { getRandomFromArray } from '../utils';
import Gleta from '../entities/agent/alien-pack/gleta';

export default class SkillSpawnNpc extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 2.5;

    // Initial delay:
    this.__timeToNextRound = 1000;
  }

  execute(game: Game) {
    const npc = getRandomFromArray([Npc, Gleta]);

    game.addAgent(
      new npc({
        team: this.agent.team,
        position: this.agent.position.clone(),
      }),
    );
  }
}
