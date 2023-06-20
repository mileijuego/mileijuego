import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import Vector2D from '../utils/vector-2d';
import { skillKey } from './skill-map';

export default class SkillMileiPorquenotevas extends Skill {
  public skillKey: skillKey = 'milei-porquenotevas';

  constructor(props: ISkill) {
    super(props);
    this.__delay = 10;

    this.soundKey = 'milei-porquenotevas';
  }

  execute(game: Game) {
    const basePushSpeed = 10;
    const damage = 20 * this.__points;
    const distanceToPush = 500;
    const enemies = game.getEnemyAgentsOfTeam(this.agent.team);

    const enemiesToPush = enemies.filter(
      (e) =>
        this.agent.getDistanceSquared(e.position.x, e.position.y) <=
        // Squared
        distanceToPush * distanceToPush,
    );

    enemiesToPush.forEach((e) => {
      e.setFixedSpeed(basePushSpeed / e.weight);
      game.hurtAgent(e, damage, this.agent);

      e.setFixedDirection(
        new Vector2D(
          e.position.x - this.agent.position.x,
          e.position.y - this.agent.position.y,
        ),
      );

      game.addTimeout(() => {
        e.setFixedSpeed(null);
        e.setFixedDirection(null);
      }, 300 * this.__points);
    });
  }
}
