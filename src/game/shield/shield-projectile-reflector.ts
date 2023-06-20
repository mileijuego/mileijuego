import Shield, { IShield } from '.';
import Projectile from '../entities/projectile';
import Game from '../game';

export default class ShieldProjectileReflector extends Shield {
  constructor(props: IShield) {
    super(props);
    this.shieldKey = 'shield-projectile-reflector';
  }

  /**
   * Reflects the projectiles received.
   */
  public onHit(game: Game, projectile: Projectile) {
    const byPosition = projectile.by.position;

    projectile.lookAt(byPosition.x, byPosition.y);
    projectile.changeSource(game, this.agent);
  }
}
