import Shield, { IShield } from '.';
import Projectile from '../entities/projectile';
import Game from '../game';

export default class ShieldProjectileBlocker extends Shield {
  constructor(props: IShield) {
    super(props);
    this.shieldKey = 'shield-projectile-blocker';
  }

  /**
   * Blocks the projectiles received.
   */
  public onHit(game: Game, projectile: Projectile) {
    game.deactivateProjectile(projectile); // Removes the projectile
  }
}
