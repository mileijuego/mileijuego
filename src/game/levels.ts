import { agentKey } from './entities/agent/agents-map';
import { scriptKey } from './level';
import levelsJson from './levels.json';
import { DataEnemyTC } from './tc';

export interface IEnemyWave {
  enemiesNumber: number;
  enemies: DataEnemyTC;
  initialDelay?: number;
  enemySpawnDelay: number;
  enemySpawnDelayToSubtractPerEnemySpawned: number;
  minEnemySpawnDelay: number;
  onlyLeft?: boolean;
  maxEnemiesAtTheSameTime?: number;
}

export interface ILevelData {
  category: string;
  special?: boolean;
  showSurvivalRecord?: boolean;
  music: string;
  playerAgent: agentKey;
  enemyWaves: IEnemyWave[];
  finalBoss: agentKey | null;
  scripts: scriptKey[];
  mapWidth: number;
  mapHeight: number;
  mapColor: string;

  // Position where the player will spawn (default the middle of the map).
  startX?: number;
  startY?: number;
}

export interface ILevel {
  levelData: ILevelData;
}

export interface ILevels {
  [key: string]: ILevelData;
}

const levels = levelsJson as ILevels;

export { levels };
