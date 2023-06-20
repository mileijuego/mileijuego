import Game from '../game';
import Vector2D from '../utils/vector-2d';
import { ENEMY_TEAM } from '../constants';
import { IEnemyWave } from '../levels';
import { DataEnemyTC, getItemFromTC } from '../tc';

export default class EnemyFactory {
  private __justCreatedEnemy = false;
  protected initialDelay: number;
  protected enemySpawnDelay: number;
  protected enemySpawnDelayToSubtractPerEnemySpawned: number;
  protected minEnemySpawnDelay: number;
  protected enemies: DataEnemyTC;

  public enemiesSpawned: number;

  constructor({
    initialDelay = 0,
    enemySpawnDelay,
    enemySpawnDelayToSubtractPerEnemySpawned,
    minEnemySpawnDelay,
    enemies,
  }: IEnemyWave) {
    this.initialDelay = initialDelay;
    this.enemySpawnDelay = enemySpawnDelay;
    this.enemySpawnDelayToSubtractPerEnemySpawned =
      enemySpawnDelayToSubtractPerEnemySpawned;
    this.minEnemySpawnDelay = minEnemySpawnDelay;
    this.enemiesSpawned = 0;
    this.enemies = enemies;
  }

  loop(game: Game, deltaTime: number) {
    if (!this.__justCreatedEnemy) {
      this.__justCreatedEnemy = true;

      const delay =
        this.enemiesSpawned === 0
          ? this.initialDelay + this.enemySpawnDelay
          : this.enemySpawnDelay;

      game.addTimeout(() => {
        this.__justCreatedEnemy = false;
        this.create(game);

        this.enemySpawnDelay = Math.max(
          this.minEnemySpawnDelay,
          this.enemySpawnDelay - this.enemySpawnDelayToSubtractPerEnemySpawned,
        );
      }, delay * 1000);
    }
  }

  create(game: Game) {
    const posRand = Math.random();
    let coords;

    if (posRand < 0.25) {
      // Top
      coords = {
        x: Math.random() * game.width,
        y: 0,
      };
    } else if (posRand < 0.5) {
      // Bottom
      coords = {
        x: Math.random() * game.width,
        y: game.height,
      };
    } else if (posRand < 0.75) {
      // Left
      coords = {
        x: 0,
        y: Math.random() * game.height,
      };
    } else {
      // Right
      coords = {
        x: game.width,
        y: Math.random() * game.height,
      };
    }

    const agentKey = getItemFromTC(this.enemies);

    if (!agentKey) {
      throw new Error('No agent.');
    }

    game.addAgent(
      game.createAgentByKey(
        agentKey,
        new Vector2D(coords.x, coords.y),
        ENEMY_TEAM,
      ),
    );
    this.enemiesSpawned++;

    this.enemySpawnDelay = Math.max(
      this.minEnemySpawnDelay,
      this.enemySpawnDelay - this.enemySpawnDelayToSubtractPerEnemySpawned,
    );
  }
}
