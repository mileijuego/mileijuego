import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';
import { soundKey } from '../sounds';
import agentsMap, { agentKey } from '../entities/agent/agents-map';

export default class SkillSpawnAgents extends Skill {
  private __agentKey: agentKey;

  constructor(
    props: ISkill,
    {
      delay = 18,
      initialDelay,
      soundKey,
      agentKey,
    }: {
      delay: number;
      initialDelay?: number;
      soundKey: soundKey;
      agentKey: agentKey;
    },
  ) {
    super(props);
    this.__delay = delay;
    this.soundKey = soundKey;
    this.__agentKey = agentKey;

    if (initialDelay) {
      this.__timeToNextRound = initialDelay * 1000;
    }
  }

  execute(game: Game) {
    const offSet = 128;

    for (let i = 0; i < 5; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new agentsMap[this.__agentKey]({
            team: this.agent.team,
            position: new Vector2D(
              getRandomIntInRange(
                this.agent.position.x - offSet,
                this.agent.position.x + offSet,
              ),
              getRandomIntInRange(
                this.agent.position.y - offSet,
                this.agent.position.y + offSet,
              ),
            ),
          }),
        );
      }, 500 * i);
    }
  }
}
