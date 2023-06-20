import EnemyFactory from './enemy-factory';
import Game from '../game';
import Vector2D from '../utils/vector-2d';
import {
  TRIGGER_BOSS_SPAWNED,
  TRIGGER_ENEMY_WAVE_START,
  TRIGGER_WON,
} from '../game-triggers';
import scripts from './scripts';
import { ALLY_TEAM, ENEMY_TEAM, LEVEL_BOSS_ID } from '../constants';
import { IEnemyWave, ILevel, ILevelData } from '../levels';

export type scriptKey = keyof typeof scripts;

export default class Level {
  public levelData: ILevelData;

  private enemyFactory: EnemyFactory | null = null;
  public enemyWave: number = 0;
  private bossHasSpawned: boolean = false;
  private finished: boolean = false;

  constructor(props: ILevel) {
    this.levelData = props.levelData;
  }

  private get enemyWaveData() {
    return this.levelData.enemyWaves[this.enemyWave];
  }

  public get isTheLastWave() {
    return this.enemyWave >= this.levelData.enemyWaves.length - 1;
  }

  public loop(game: Game, deltaTime: number) {
    if (!this.enemyFactory && this.enemyWaveData) {
      // Creates the factory for the first wave.
      this.enemyFactory = new EnemyFactory(this.enemyWaveData);
    }

    if (this.enemyFactory) {
      const enemiesLimit = this.enemyWaveData.enemiesNumber;

      if (this.enemyFactory.enemiesSpawned < enemiesLimit) {
        // Still have enemies to spawn.
        this.enemyFactory.loop(game, deltaTime);
      } else if (game.getEnemyAgentsOfTeam(ALLY_TEAM).length === 0) {
        this.enemyWave++;

        // Resets the enemy factory. There is a bug in the survival mode where an enemy factory
        // remains in the game forever despite the increasing waves.
        this.enemyFactory = null;

        if (this.enemyWave < this.levelData.enemyWaves.length) {
          // Triggers that a wave have started.
          game.trigger(TRIGGER_ENEMY_WAVE_START, [this.enemyWave]);
        }
      }
    } else if (
      this.isTheLastWave &&
      this.levelData.finalBoss !== null &&
      game.getEnemyAgentsOfTeam(ALLY_TEAM).length === 0 &&
      this.bossHasSpawned === false
    ) {
      const boss = game.createAgentByKey(
        this.levelData.finalBoss,
        new Vector2D(game.width / 2, 0),
        ENEMY_TEAM,
        LEVEL_BOSS_ID,
      );

      game.addAgent(boss);
      this.bossHasSpawned = true;

      game.trigger(TRIGGER_BOSS_SPAWNED, [boss]);
    }

    // The player has won the level this:
    // - There are enemy waves and it is the last wave
    // - There is a final boss and it has spawned
    // - There are no enemies alive
    const hasWon =
      (this.levelData.enemyWaves.length ? this.isTheLastWave : true) &&
      (this.levelData.finalBoss !== null ? this.bossHasSpawned : true) &&
      game.getEnemyAgentsOfTeam(ALLY_TEAM).length === 0 &&
      !this.finished;

    if (hasWon) {
      this.finished = true;
      game.trigger(TRIGGER_WON, []);
    }
  }

  public addWave(wave: IEnemyWave) {
    this.levelData.enemyWaves.push(wave);
  }
}
