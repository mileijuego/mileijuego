import Skill from '.';
import { ProjectileBook } from '../entities/projectile/projectiles';
import Game from '../game';
import sounds from '../sounds';
import { skillKey } from './skill-map';

export const SKILL_BOOK_BASE_DMG = 125;

export default class SkillLiberatorBook extends Skill {
  public skillKey: skillKey = 'liberator-book';

  public setPoints(value: number, game: Game): void {
    super.setPoints(value, game);

    const damage = SKILL_BOOK_BASE_DMG * value;
    const interval = 18 * 1000;

    const book = () => {
      game.addToTickerList(() => {
        const closestEnemy = game.getClosestEnemyOfAgent(this.agent);

        if (!closestEnemy) {
          return false;
        }

        const rotation = this.agent.getRotationTo(
          closestEnemy.position.x,
          closestEnemy.position.y,
        );

        const projectile = new ProjectileBook({
          rotation,
          by: this.agent,
          position: this.agent.position.clone(),
          damage: damage,
        });

        game.addProjectile(projectile);
        game.addTimeout(() => book(), interval);

        sounds['milei-datos'].play();
        return true;
      });
    };

    book();
  }

  protected execute(game: Game): void {
    // Passive skills do nothing in the execute method.
  }
}
