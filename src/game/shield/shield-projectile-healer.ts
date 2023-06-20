import Shield, { IShield } from '.';
import Projectile from '../entities/projectile';
import TargetableEntity from '../entities/targetable-entity';
import Game from '../game';

export default class ShieldProjectileHealer extends Shield {
  constructor(props: IShield) {
    super(props);
    this.shieldKey = 'shield-projectile-healer';
  }

  /**
   * The projectiles received heal instead of harm.
   */
  public onHit(game: Game, projectile: Projectile) {
    projectile.onImpact = function (game: Game, entity: TargetableEntity) {
      game.healTargetableEntity(entity, this.totalDamage, this.by);
      game.deactivateProjectile(this); // Removes the projectile
      return true;
    };
  }
}
