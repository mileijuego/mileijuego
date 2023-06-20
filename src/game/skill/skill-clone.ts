import Skill from '.';
import { agentKey } from '../entities/agent/agents-map';
import Game from '../game';
import { ISkill } from '../interfaces';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';

export default class SkillClone extends Skill {
  private __cloneKey: agentKey;

  constructor(props: ISkill, cloneKey: agentKey) {
    super(props);
    this.__delay = 16;

    // Initial delay:
    this.__timeToNextRound = 4000;

    this.__cloneKey = cloneKey;
  }

  execute(game: Game) {
    const offSet = 128;

    for (let i = 0; i < 5; i++) {
      game.addTimeout(() => {
        game.addAgent(
          game.createAgentByKey(
            this.__cloneKey,
            new Vector2D(
              getRandomIntInRange(
                this.agent.position.x - offSet,
                this.agent.position.x + offSet,
              ),
              getRandomIntInRange(
                this.agent.position.y - offSet,
                this.agent.position.y + offSet,
              ),
            ),
            this.agent.team,
          ),
        );
      }, 500 * i);
    }
  }
}
