import Agent from './entities/agent';
import { soundKey } from './sounds';
import textures from './textures';
import levels from './levels.json';
import Vector2D from './utils/vector-2d';

// Types
export type levelKey = keyof typeof levels;

export interface IEntity {
  uuid?: string;
  position: Vector2D;
}

export interface IAgentSprite extends IEntity {
  width: number;
  height: number;
  agent: string;
}

export interface IWeapon extends IEntity {}

export interface IWeaponSprite extends IEntity {
  width: number;
  height: number;
  pivotX?: number;
  weaponKey: string;
  soundKey: soundKey;
}

export interface IProjectileSprite extends IEntity {
  width: number;
  height: number;
  rotation: number;
  projectileKey: keyof typeof textures;
  rotating?: boolean;
}

export interface ISkill {
  agent: Agent;
}
