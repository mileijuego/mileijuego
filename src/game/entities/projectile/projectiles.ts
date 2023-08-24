import Projectile, { IProjectile } from '.';
import Game from '../../game';
import { TRIGGER_UPDATE_ENTITY_SPRITE } from '../../game-triggers';
import Agent from '../agent';
import { agentKey } from '../agent/agents-map';
import AgentWorker from '../agent/worker';
import TargetableEntity, { IModifier } from '../targetable-entity';
import { projectileKey } from './projectiles-map';

export class ProjectileBalloon extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 4;

    this.width = 16;
    this.height = 11;

    this.spriteData.projectileKey = 'projectile-balloon';
    this.spriteData.width = 16;
    this.spriteData.height = 11;
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    this.resize(0.5, 0.5 * (11 / 16));
    this.__baseDamage += 0.5;

    super.continueTrajectory(game, deltaTime);
  }
}

export class ProjectileBalloonFire extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 4;

    this.width = 16;
    this.height = 11;

    this.spriteData.projectileKey = 'projectile-balloon-fire';
    this.spriteData.width = 16;
    this.spriteData.height = 11;
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    this.resize(0.5, 0.5 * (11 / 16));
    this.__baseDamage += 1;

    super.continueTrajectory(game, deltaTime);
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Fire burns their target
    const modifier: IModifier = {
      type: 'burning',
      value: 30, // Damage per second
      duration: 3,
      by: this.by,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileBanana extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-banana';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }
}

export class ProjectilePancakes extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-pancakes';
    this.spriteData.width = 48;
    this.spriteData.height = 32;
  }
}

export class ProjectileJsjs extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-jsjs';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }
}

export class ProjectileBitcoin extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 16;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-bitcoin';
    this.spriteData.width = 32;
    this.spriteData.height = 32;
  }
}

export class ProjectileE extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-e';
    this.spriteData.width = 24;
    this.spriteData.height = 24;
  }
}

export class ProjectileKKK extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-kkk';
    this.spriteData.width = 48;
    this.spriteData.height = 24;
  }
}

export class ProjectileGnocchi extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-gnocchi';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }
}

export class ProjectileWine extends Projectile {
  private __enemyToFollow: Agent | null = null;
  private __rotationSpeed: number;

  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-wine';
    this.spriteData.width = 72;
    this.spriteData.height = 48;

    this.__rotationSpeed = 0.01; // The speed at which the rotation changes per frame
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    if (!this.__enemyToFollow || this.__enemyToFollow.isDead) {
      this.__enemyToFollow = game.getClosestEnemyOfAgent(
        this.by,
        (a: Agent) => !a.ignoredByNpcs,
      );
    }

    if (this.__enemyToFollow) {
      const dx = this.__enemyToFollow.position.x - this.position.x; // Calculate the distance between the projectile and the enemy on the x-axis
      const dy = this.__enemyToFollow.position.y - this.position.y; // Calculate the distance between the projectile and the enemy on the y-axis

      // Calculate the angle between the projectile and the enemy
      const targetAngle = Math.atan2(dy, dx);

      // Adjust the rotation to the shortest angle
      const angleDifference = targetAngle - this.rotation;
      const angleDifferenceWrapped =
        ((angleDifference + Math.PI) % (2 * Math.PI)) - Math.PI;
      this.rotation += angleDifferenceWrapped * this.__rotationSpeed;

      game.trigger(TRIGGER_UPDATE_ENTITY_SPRITE, [
        this,
        { rotation: this.rotation },
      ]);
    }

    super.continueTrajectory(game, deltaTime);
  }

  public onImpact(game: Game, entity: Agent): boolean {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    entity.addModifier(game, {
      type: 'drunk',
      value: 0,
      duration: 3,
    });

    return true;
  }
}

export class ProjectileTear extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 4;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-tear';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }
}

export class ProjectileBook extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 9;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-book';
    this.spriteData.width = 48;
    this.spriteData.height = 64;
  }

  public onImpact(game: Game, entity: Agent) {
    const wasDead = entity.isDead;

    if (!super.onImpact(game, entity)) {
      return false;
    }

    if (!wasDead && entity.isDead) {
      // If the agent is defeated by the book then it will appear an ally worker
      // in the same place.
      const lion = new AgentWorker({
        team: this.by.team,
        position: entity.position.clone(),
      });

      game.addAgent(lion);
    }

    return true;
  }
}

export class ProjectileGreenHeart extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-green-heart';
    this.spriteData.width = 24;
    this.spriteData.height = 24;
  }
}

export class ProjectilePinkHeart extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-pink-heart';
    this.spriteData.width = 24;
    this.spriteData.height = 24;
  }
}

export class ProjectilePamy extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-pamy';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }
}

export class ProjectileSnake extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 8;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-snake';
    this.spriteData.width = 32;
    this.spriteData.height = 32;
  }
}

export class ProjectileTile extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 24;
    this.speed = 10;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-tile';
    this.spriteData.width = 32;
    this.spriteData.height = 32;
  }
}

export class ProjectileV extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 16;
    this.speed = 10;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-v';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }
}

export class ProjectileL extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-l';
    this.spriteData.width = 32;
    this.spriteData.height = 32;
  }
}

export class ProjectileChori extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 8;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-chori';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Chori slows down agents
    const modifier: IModifier = {
      type: 'speed',
      value: -1,
      duration: 2,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileCostillar extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 8;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-costillar';
    this.spriteData.width = 72;
    this.spriteData.height = 48;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Chori slows down agents
    const modifier: IModifier = {
      type: 'speed',
      value: -1,
      duration: 2,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileLittleGoldenChori extends Projectile {
  private ticks: number;

  constructor(props: IProjectile) {
    super(props);

    this.speed = 8;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-little-golden-chori';
    this.spriteData.width = 36;
    this.spriteData.height = 24;

    this.ticks = 0;
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    // Golden Chori will follow the closest enemy until N ticks (frames)
    if (this.ticks < 60) {
      this.ticks++;

      const closestEnemy = game.getClosestEnemyOfAgent(
        this.by,
        (a: Agent) => !a.ignoredByNpcs,
      );
      if (closestEnemy) {
        const rotation = this.getRotationTo(
          closestEnemy.position.x,
          closestEnemy.position.y,
        );
        this.rotation = rotation;
        game.trigger(TRIGGER_UPDATE_ENTITY_SPRITE, [this, { rotation }]);
      }
    }

    super.continueTrajectory(game, deltaTime);
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Chori slows down agents
    const modifier: IModifier = {
      type: 'speed',
      value: -2,
      duration: 2,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileGoldenChori extends Projectile {
  private ticks: number;

  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 1000;
    this.speed = 24;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-golden-chori';
    this.spriteData.width = 72;
    this.spriteData.height = 48;

    this.ticks = 0;
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    // Golden Chori will follow the closest enemy until N ticks (frames)
    if (this.ticks < 180) {
      this.ticks++;

      const closestEnemy = game.getClosestEnemyOfAgent(
        this.by,
        (a: Agent) => !a.ignoredByNpcs,
      );
      if (closestEnemy) {
        const rotation = this.getRotationTo(
          closestEnemy.position.x,
          closestEnemy.position.y,
        );
        this.rotation = rotation;
        game.trigger(TRIGGER_UPDATE_ENTITY_SPRITE, [this, { rotation }]);
      }
    }

    super.continueTrajectory(game, deltaTime);
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Golden chori slows down agents
    const modifier: IModifier = {
      type: 'slowdown',
      value: 0.5,
      duration: 3,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileChoriIce extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 32;
    this.speed = 10;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-chori-ice';
    this.spriteData.width = 48;
    this.spriteData.height = 32;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Ice freezes their target
    const modifier: IModifier = {
      type: 'slowdown',
      value: 0.0,
      duration: 1,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileShovel extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 35;
    this.speed = 16;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-shovel';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }
}

export class ProjectileShovelGold extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 70;
    this.speed = 24;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-shovel-gold';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }
}

export class ProjectileShovelIce extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 50;
    this.speed = 24;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-shovel-ice';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Ice freezes their target
    const modifier: IModifier = {
      type: 'slowdown',
      value: 0.5,
      duration: 3,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileShovelFire extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    // Only fire damage.
    this.__baseDamage = 0;
    this.speed = 24;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-shovel-fire';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    // Fire burns their target
    const modifier: IModifier = {
      type: 'burning',
      value: 20, // Damage per second
      duration: 4,
      by: this.by,
    };

    entity.addModifier(game, modifier);

    return true;
  }
}

export class ProjectileDivineShovel extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 160;
    this.speed = 24;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-divine-shovel';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    const pushBaseSpeed = 8;
    entity.setFixedSpeed(pushBaseSpeed / entity.weight);
    entity.setFixedDirection(entity.position.clone().sub(this.position));
    game.addTimeout(() => {
      entity.setFixedSpeed(null);
      entity.setFixedDirection(null);
    }, 500);

    return true;
  }
}

export class ProjectileWorkerShovel extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-shovel';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }
}

export class ProjectileHeavenShovel extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-divine-shovel';
    this.spriteData.width = 64;
    this.spriteData.height = 32;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    const pushBaseSpeed = 8;
    entity.setFixedSpeed(pushBaseSpeed / entity.weight);
    entity.setFixedDirection(entity.position.clone().sub(this.position));
    game.addTimeout(() => {
      entity.setFixedSpeed(null);
      entity.setFixedDirection(null);
    }, 500);

    return true;
  }
}

export class Projectile1000p extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.__baseDamage = 100; // The amount that heals.
    this.speed = 10;

    this.width = 32;
    this.height = 32;

    this.spriteData.projectileKey = 'projectile-1000p';
    this.spriteData.width = 48;
    this.spriteData.height = 32;
  }

  /**
   * 1000p only can impact allies.
   */
  public canImpactWith(entity: TargetableEntity) {
    return (
      this.by !== entity &&
      this.team === entity.team &&
      this.isCollidingWith(entity)
    );
  }

  /**
   * Unlike the rest of the projectiles, 1000p will heal the target.
   */
  public onImpact(game: Game, entity: TargetableEntity): boolean {
    if (this.team !== entity.team) {
      return false;
    }

    game.healTargetableEntity(entity, this.__baseDamage, this.by);
    game.deactivateProjectile(this); // Removes the projectile
    return true;
  }
}

export class ProjectileOrbChoriIce extends Projectile {
  private childrenProjectileKey: projectileKey;
  private _maxSpawnProjectilesTime = 150;
  private _spawnProjectilesTime = 150;
  private _projectilesSpawnedTimes = 0;

  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 96;
    this.height = 96;

    this.spriteData.projectileKey = 'projectile-orb-chori-ice';
    this.spriteData.width = 96;
    this.spriteData.height = 96;
    this.spriteData.rotating = true;

    this.childrenProjectileKey = 'projectile-chori-ice';
  }

  public continueTrajectory(game: Game, deltaTime: number) {
    if (this._spawnProjectilesTime <= 0) {
      this._spawnProjectilesTime = this._maxSpawnProjectilesTime;
      this._projectilesSpawnedTimes++;

      const sides = 5;
      const angle = (2 * Math.PI) / sides; // The internal angle of a regular polygon
      const dirs = [];
      for (let i = 0; i < sides; i++) {
        const dir = i * angle;
        dirs.push(dir);
      }

      for (let i = 0; i < dirs.length; i++) {
        const projectile = game.createProjectile(
          this.by,
          this.childrenProjectileKey,
          dirs[i] + this._projectilesSpawnedTimes * (Math.PI / 24),
          this.position.clone(),
        );

        game.addProjectile(projectile);
      }
    } else {
      this._spawnProjectilesTime -= deltaTime;
    }

    super.continueTrajectory(game, deltaTime);
  }

  public canImpactWith(entity: TargetableEntity): boolean {
    // Orbs do not impact with anything.
    return false;
  }
}

export class ProjectileProceda extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-proceda';
    this.spriteData.width = 24;
    this.spriteData.height = 24;
  }
}

export class ProjectileGordoMortero extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 8;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-gordo-mortero';
    this.spriteData.width = 36;
    this.spriteData.height = 24;
  }

  public onImpact(game: Game, entity: Agent) {
    if (!super.onImpact(game, entity)) {
      return false;
    }

    game.explosion({
      team: this.team,
      radius: 128,
      damage: 96,
      fireDamage: 24,
      by: this.by,
      position: this.position,
    });

    return true;
  }
}

export class ProjectileAgent extends Projectile {
  private __childAgent: Agent | null = null;
  private __agentKey: agentKey;

  constructor(props: IProjectile, agentKey: agentKey) {
    super(props);

    this.speed = 10;

    this.width = 24;
    this.height = 24;

    this.spriteData.projectileKey = 'projectile-power-ball';
    this.spriteData.width = 24;
    this.spriteData.height = 24;

    this.__agentKey = agentKey;
  }

  public continueTrajectory(game: Game, deltaTime: number): void {
    super.continueTrajectory(game, deltaTime);

    if (this.__childAgent === null) {
      this.__childAgent = game.createAgentByKey(
        this.__agentKey,
        this.position.clone(),
        this.by.team,
      );

      // To avoid projectile agent to move.
      this.__childAgent.immovable = true;

      this.__childAgent.addOnDeadEvent(() => {
        // If the agent dies the projectile will be deactivated.
        game.deactivateProjectile(this);
      });

      game.addAgent(this.__childAgent);
      this.addEntity(this.__childAgent);
    }
  }

  public onRemove(game: Game) {
    if (this.__childAgent && game.hasAgent(this.__childAgent.uuid)) {
      game.hurtAgent(this.__childAgent, this.__childAgent.hp);
    }
  }

  /**
   * Changes the source of the projectile.
   */
  public changeSource(game: Game, source: Agent) {
    super.changeSource(game, source);

    if (this.__childAgent) {
      game.changeAgentTeam(this.__childAgent, source.team);
    }
  }
}

export class ProjectileAgentMiniAlien extends ProjectileAgent {
  constructor(props: IProjectile) {
    super(props, 'mini-alien');
  }
}

export class ProjectileAgentOfe extends ProjectileAgent {
  constructor(props: IProjectile) {
    super(props, 'ofe-projectile');
  }
}

export class ProjectileAgentPibi extends ProjectileAgent {
  constructor(props: IProjectile) {
    super(props, 'pibi-projectile');
  }
}

export class ProjectileAgentNpc extends ProjectileAgent {
  constructor(props: IProjectile) {
    super(props, 'npc');
  }
}

export class ProjectileMask extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 12;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-mask';
    this.spriteData.width = 64;
    this.spriteData.height = 48;
  }
}

export class ProjectileAngry extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 11;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-angry';
    this.spriteData.width = 48;
    this.spriteData.height = 48;
  }
}

export class ProjectileHappy extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 11;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-happy';
    this.spriteData.width = 48;
    this.spriteData.height = 48;
  }
}

export class ProjectileCurrenthing extends Projectile {
  constructor(props: IProjectile) {
    super(props);

    this.speed = 6;

    this.width = 48;
    this.height = 48;

    this.spriteData.projectileKey = 'projectile-currenthing';
    this.spriteData.width = 72;
    this.spriteData.height = 48;
  }
}
