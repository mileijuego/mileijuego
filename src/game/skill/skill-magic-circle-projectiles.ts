import Skill from '.';
import Projectile from '../entities/projectile';
import projectilesMap, {
  projectileKey,
} from '../entities/projectile/projectiles-map';
import Game from '../game';
import { ISkill } from '../interfaces';
import { soundKey } from '../sounds';
import { rotationToPoint } from '../utils';
import Vector2D from '../utils/vector-2d';

const rotations = [
  rotationToPoint(0, 0, 0, 1), // Top
  rotationToPoint(1, 0, 0, 1), // Top - Right
  rotationToPoint(1, 0, 0, 0), // Right
  rotationToPoint(1, 0, 0, -1), // Bottom - Right
  rotationToPoint(0, 1, 0, 0), // Bottom
  rotationToPoint(0, 0, 1, -1), // Bottom - Left
  rotationToPoint(0, 0, 1, 0), // Left
  rotationToPoint(0, 0, 1, 1), // Top - Left
];

export default class SkillMagicCircleProjectiles extends Skill {
  private __projectileKey: projectileKey;

  constructor(
    props: ISkill,
    _: any,
    soundKey: soundKey,
    projectileKey: projectileKey,
  ) {
    super(props);
    this.__delay = 7;

    this.__timeToNextRound = 1500;

    this.soundKey = soundKey;
    this.__projectileKey = projectileKey;
  }

  execute(game: Game) {
    const projectiles: Projectile[] = [];

    // This array is needed to save the agent move events and remove them after.
    const agentMoveEvents: ((vector: Vector2D) => void)[] = [];

    rotations.forEach((rotation) => {
      const projectile = new projectilesMap[this.__projectileKey]({
        by: this.agent,
        damage: this.agent.damage,
        rotation,
        position: this.agent.position.clone(),
      });

      projectile.speed = 1;

      const moveEvent = (vector: Vector2D) => {
        projectile.move(vector);
      };

      this.agent.onMoveEvents.add(moveEvent);
      agentMoveEvents.push(moveEvent);

      game.addProjectile(projectile);

      projectiles.push(projectile);
    });

    let time = 5000;
    game.addToTickerList((deltaTime: number) => {
      projectiles.forEach((p) => {
        p.rotate(0.013);
      });

      if (time <= 0) {
        const closestEnemy = game.getClosestEnemyOfAgent(this.agent);

        if (!closestEnemy) {
          return false;
        }

        agentMoveEvents.forEach((event) =>
          this.agent.onMoveEvents.delete(event),
        );

        projectiles.forEach((p, i) => {
          game.addTimeout(() => {
            p.lookAt(closestEnemy.position.x, closestEnemy.position.y);
            p.speed = 20;
          }, 100 * i);
        });

        return true;
      }

      time -= deltaTime;

      return false;
    });
  }
}
