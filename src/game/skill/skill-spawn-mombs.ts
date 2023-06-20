import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { getRandomIntInRange } from '../utils';
import Vector2D from '../utils/vector-2d';
import { soundKey } from '../sounds';
import Momb from '../entities/agent/momb';

export default class SkillSpawnMombs extends Skill {
  private __explosionDamage: number;

  constructor(
    props: ISkill,
    {
      delay = 18,
      initialDelay,
      soundKey,
      explosionDamage,
    }: {
      delay: number;
      initialDelay?: number;
      soundKey: soundKey;
      explosionDamage: number;
    },
  ) {
    super(props);
    this.__delay = delay;

    this.soundKey = soundKey;
    this.__explosionDamage = explosionDamage;

    if (initialDelay) {
      this.__timeToNextRound = initialDelay * 1000;
    }
  }

  execute(game: Game) {
    const offSet = 128;

    const furthestEnemy = game.getFurthestEnemy(this.agent);

    if (!furthestEnemy) {
      return;
    }

    for (let i = 0; i < 4; i++) {
      game.addTimeout(() => {
        game.addAgent(
          new Momb(
            {
              team: this.agent.team,
              position: new Vector2D(
                getRandomIntInRange(
                  furthestEnemy.position.x - offSet,
                  furthestEnemy.position.x + offSet,
                ),
                getRandomIntInRange(
                  furthestEnemy.position.y - offSet,
                  furthestEnemy.position.y + offSet,
                ),
              ),
            },
            this.__explosionDamage,
          ),
        );
      }, 150 * i);
    }
  }
}
