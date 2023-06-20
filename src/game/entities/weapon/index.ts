import Game from '../../game';
import { IWeapon } from '../../interfaces';
import Agent from '../agent';
import Entity from '../entity';
import { projectileKey } from '../projectile/projectiles-map';

export default class Weapon extends Entity {
  protected roundsPerMinute: number;

  public isWeapon: boolean;
  public projectileKey: projectileKey | '';

  private __hasJustShot = false;
  private __disabled = false;

  constructor(props: IWeapon) {
    super(props);

    this.isWeapon = true;
    this.position = props.position;

    // Weapon stats
    this.roundsPerMinute = 0;

    this.projectileKey = ''; // Define in child

    this.spriteData = {
      spriteKey: 'weapon',
      weaponKey: '', // Define in child
      soundKey: '', // Define in child
      width: 60,
      height: 20,
      position: this.position.clone(),
    };
  }

  public onShoot(game: Game, by: Agent, rotation: number) {
    const rotationDiff = 0.18;
    const projectiles = 1 + by.multipleShot;
    const space = (projectiles - 1) * rotationDiff;

    for (let i = 0; i < projectiles; i++) {
      const projectile = game.createProjectileFromWeapon(
        by,
        this,
        rotation - space / 2 + rotationDiff * i,
      );

      if (by.explosiveProjectileChance) {
        // Projectiles that have a chance to explode.
        projectile.addOnImpactEvent(() => {
          if (Math.random() < by.explosiveProjectileChance) {
            game.explosion({
              team: projectile.team,
              damage: projectile.totalDamage,
              fireDamage: projectile.totalDamage / 3,
              radius: 128,
              by: projectile.by,
              position: projectile.position.clone(),
            });
          }
        });
      }

      game.addProjectile(projectile);
    }
  }

  public get secondsDelayOfRound() {
    return 60 / this.roundsPerMinute;
  }

  public shoot(game: Game, by: Agent) {
    if (this.__disabled || this.__hasJustShot) {
      return false;
    }

    let duration = this.secondsDelayOfRound * 1000;
    game.addToTickerList((deltaTime: number) => {
      // Multiplies the deltaTime by the slowedFactor to produce the slowing effect.
      duration -= deltaTime * by.slowedFactor();

      if (duration <= 0) {
        this.__hasJustShot = false;
        return true;
      }

      return false;
    });

    this.__hasJustShot = true;
    return true;
  }

  public deactivate() {
    this.__disabled = true;

    this.forEach((e) => {
      // Hides the sprite
      if (e.sprite) {
        e.sprite.visible = false;
      }
    });
  }

  public activate() {
    this.__disabled = false;

    this.forEach((e) => {
      // Shows the sprite
      if (e.sprite) {
        e.sprite.visible = true;
      }
    });
  }
}
