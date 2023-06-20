import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import Vector2D from '../utils/vector-2d';

export default class SkillAlienAbsorption extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 11;
    this.__timeToNextRound = 4000;

    this.soundKey = 'alien-absorption';
  }

  execute(game: Game) {
    game.addTimeout(() => {
      const basePushSpeed = 20;
      const distanceToPush = 2000;
      const enemies = game.getEnemyAgentsOfTeam(this.agent.team);

      const enemiesToPush = enemies.filter(
        (e) =>
          this.agent.getDistanceSquared(e.position.x, e.position.y) <=
          // Squared
          distanceToPush * distanceToPush,
      );

      enemiesToPush.forEach((e) => {
        e.setFixedSpeed(basePushSpeed / e.weight);

        e.setFixedDirection(
          new Vector2D(
            this.agent.position.x - e.position.x,
            this.agent.position.y - e.position.y,
          ),
        );

        game.addTimeout(() => {
          e.setFixedSpeed(null);
          e.setFixedDirection(null);
        }, 1000);
      });
    }, 1700);
  }
}
