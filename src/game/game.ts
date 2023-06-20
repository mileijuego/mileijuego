import Agent from './entities/agent';
import Weapon from './entities/weapon';
import Eventable from './eventable';
import Level from './level';
import Projectile from './entities/projectile';
import projectilesMap, {
  projectileKey,
} from './entities/projectile/projectiles-map';
import Vector2D from './utils/vector-2d';
import {
  TRIGGER_ADD_ENTITY,
  TRIGGER_ENEMY_WAVE_START,
  TRIGGER_GAME_FINISH,
  TRIGGER_REMOVE_ENTITY,
  TRIGGER_GAME_INFLATION,
  TRIGGER_SHIELD_EFFECT,
  TRIGGER_GAME_PAUSED,
  TRIGGER_ENEMY_KILLED,
  TRIGGER_AGENT_KILLED,
  TRIGGER_EXPLOSION,
} from './game-triggers';
import Item from './entities/item';
import agentsMap, { agentKey } from './entities/agent/agents-map';
import TargetableEntity, { IModifier } from './entities/targetable-entity';
import Shield from './shield';
import { getRandomIntInRange } from './utils';
import { ALLY_TEAM, MAX_INFLATION, PLAYER_ID } from './constants';
import Entity from './entities/entity';
import { getDefaultUserData } from '../utils/local-storage';
import AgentCharacter from './entities/agent/agent-character';
import { Character } from './char/character';
import { IEnemyWave, ILevelData } from './levels';
import WallDefense from './entities/agent/wall/defense';

export interface IGame {
  width: number;
  height: number;
  levelData: ILevelData;
  character?: Character;
}

type AgentMap = Map<string, Agent>;

const cellSize = 100;

export default class Game extends Eventable {
  private __allAgents: AgentMap = new Map();
  private __agentsByTeam: Map<number, AgentMap> = new Map();

  private projectiles = new Set<Projectile>();
  private __deactivatedProjectiles = new Set<Projectile>();
  public items: Item[];

  private tickerList: any[];

  // Map
  private __width: number;
  private __height: number;

  // ----- Tick props -----
  // Length of a tick in milliseconds. The denominator is your desired framerate.
  // e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
  public tickLengthMs: number = 1000 / 60;
  private deltaTime: number = 0; // Milliseconds that have been passed from the last tick.
  private previousTickTime: number;
  private __isStopped: boolean = false;
  private __isPaused: boolean = false;

  // Level
  private level: Level;
  private character: Character;
  private __inflation = 0;

  // Cells data
  private __grid: Agent[][][] = [];
  private __rows: number;
  private __cols: number;

  constructor({
    width,
    height,
    levelData,
    character = getDefaultUserData().character,
  }: IGame) {
    super();

    this.__width = width;
    this.__height = height;

    this.previousTickTime = Date.now();

    this.items = [];

    this.tickerList = [];

    // Level
    this.character = character;

    this.level = new Level({ levelData });

    this.__rows = Math.ceil(this.height / cellSize);
    this.__cols = Math.ceil(this.width / cellSize);
  }

  public get width() {
    return this.__width;
  }

  public get height() {
    return this.__height;
  }

  public start() {
    const levelData = this.level.levelData;

    this.previousTickTime = Date.now();

    const playerAgent = this.createAgentByKey(
      this.level.levelData.playerAgent,
      // The player will start in the middle of the map if the starting position has not been set.
      new Vector2D(
        levelData.startX !== undefined ? levelData.startX : this.width / 2,
        levelData.startY !== undefined ? levelData.startY : this.height / 2,
      ),
      ALLY_TEAM,
      PLAYER_ID,
    );

    function isCharacter(agent: Agent): agent is AgentCharacter {
      return (agent as AgentCharacter).setCharacter !== undefined;
    }

    if (isCharacter(playerAgent)) {
      playerAgent.setCharacter(this.character, this);
    }

    // Adding the player
    this.addAgent(playerAgent);

    if (levelData.enemyWaves.length) {
      this.trigger(TRIGGER_ENEMY_WAVE_START, [this.level.enemyWave]);
    }

    this.tick();
  }

  public getPlayer() {
    return this.getAgentByUuid(PLAYER_ID);
  }

  get isStopped() {
    return this.__isStopped;
  }
  public stop() {
    this.__isStopped = true;
  }

  get isPaused() {
    return this.__isPaused;
  }
  public pause() {
    this.__isPaused = true;
    this.trigger(TRIGGER_GAME_PAUSED, [this.__isPaused]);
  }
  public unpause() {
    this.__isPaused = false;
    this.trigger(TRIGGER_GAME_PAUSED, [this.__isPaused]);
  }

  public getAgentByUuid(uuid: string) {
    return this.__allAgents.get(uuid)!;
  }

  public tick(deltaTime?: number) {
    if (this.__isStopped) {
      return;
    }

    const now = Date.now();
    const realDeltaTime = now - this.previousTickTime;
    this.previousTickTime = now;

    // Updates the deltaTime, it won't be more than tickLengthMs to avoid making
    // too sensitive in mobile devices.
    this.deltaTime = deltaTime || Math.min(realDeltaTime, this.tickLengthMs);

    const nextTick = () => {
      requestAnimationFrame(() => this.tick());
    };

    if (this.__isPaused) {
      nextTick();
      return;
    }

    this.update(this.deltaTime);

    if (this.__inflation >= MAX_INFLATION) {
      this.trigger(TRIGGER_GAME_FINISH, ['defeatByInflation']);
      return;
    }

    const player = this.getAgentByUuid(PLAYER_ID);
    if (player && !player.isDead) {
      nextTick();
    } else {
      this.trigger(TRIGGER_GAME_FINISH, ['youHaveBeenDefeated']);
    }
  }

  public isOutside(
    x: number,
    y: number,
    marginX: number = 0,
    marginY: number = 0,
  ) {
    return (
      x > this.width - marginX ||
      x < marginX ||
      y > this.height - marginY ||
      y < marginY
    );
  }

  public isVectorOutside(vector: Vector2D) {
    return this.isOutside(vector.x, vector.y);
  }

  public getAnyItemTheAgentCanCollect(agent: Agent) {
    return this.items.find((item) => item.canCollect(agent));
  }

  /**
   * Returns the closest item that the agent can collect.
   */
  public getClosestItemToCollect(agent: Agent): Item | null {
    let distance = Number.POSITIVE_INFINITY;
    let closerItem: Item | null = null;

    this.items.forEach((item) => {
      if (!item.canCollect(agent)) {
        return;
      }

      const distanceToItem = agent.position.getDistanceSquared(item.position);

      if (distanceToItem < distance) {
        closerItem = item;
        distance = distanceToItem;
      }
    });

    return closerItem;
  }

  public collectItem(agent: Agent, item: Item) {
    item.onCollect(this, agent);
    this.removeItem(item);
  }

  private iterateEntityCells(
    entity: Entity,
    callback: (row: number, col: number) => void | boolean,
  ) {
    const rows = this.__rows;
    const cols = this.__cols;

    const { width, height } = entity;
    const { x, y } = entity.position;

    // Calculate the half-width and half-height of the entity
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Calculate the grid cells occupied by the entity
    const startCol = Math.max(Math.floor((x - halfWidth) / cellSize), 0);
    const startRow = Math.max(Math.floor((y - halfHeight) / cellSize), 0);
    const endCol = Math.min(Math.floor((x + halfWidth) / cellSize), cols - 1);
    const endRow = Math.min(Math.floor((y + halfHeight) / cellSize), rows - 1);

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        if (callback(row, col)) {
          // If returns true then finishes the iteration.
          return;
        }
      }
    }
  }

  private placeEntitiesInGrid() {
    const rows = this.__rows;
    const cols = this.__cols;

    // Resets the grid.
    this.__grid = [];
    for (let row = 0; row < rows; row++) {
      this.__grid[row] = [];
      for (let col = 0; col < cols; col++) {
        this.__grid[row][col] = [];
      }
    }

    for (let a of this.__allAgents.values()) {
      this.iterateEntityCells(a, (row, col) => {
        this.__grid[row][col].push(a);
      });
    }
  }

  private update(deltaTime: number) {
    this.placeEntitiesInGrid();
    this.projectilesUpdate(deltaTime);
    this.__deactivatedProjectiles.clear();

    this.sysUpdateAgents(deltaTime);
    this.executeTickerList(deltaTime);
    this.level.loop(this, deltaTime); // Level loop
  }

  private projectilesUpdate(deltaTime: number) {
    for (let p of this.projectiles.values()) {
      p.continueTrajectory(this, deltaTime);

      const checkedAgents: Set<Agent> = new Set();
      this.iterateEntityCells(p, (row, col) => {
        // Checks the projectiles that impact with an agent
        for (let agent of this.__grid[row][col]) {
          if (checkedAgents.has(agent)) {
            // To avoid re-check an agent.
            continue;
          }
          checkedAgents.add(agent);

          if (p.canImpactWith(agent)) {
            agent.shields.forEach((shield) => {
              shield.onHit(this, p);
            });

            if (
              !this.__deactivatedProjectiles.has(p) &&
              p.onImpact(this, agent)
            ) {
              // The projectile has impacted then the iteration should be finished.
              return true;
            }
          }
        }
      });

      if (
        // Projectile is outside of the screen
        this.isOutside(p.position.x, p.position.y) ||
        this.__deactivatedProjectiles.has(p)
      ) {
        this.__removeProjectile(p);
        continue;
      }

      // Bug fix: if the projectile hit an agent and also a wall
      if (this.__deactivatedProjectiles.has(p)) {
        continue;
      }
    }
  }

  /**
   * Updates the agents.
   * @param deltaTime
   */
  private sysUpdateAgents(deltaTime: number) {
    for (let agent of this.__allAgents.values()) {
      // Executes the updating of the agent.
      agent.update(this);

      this.items.forEach((item) => {
        if (item.checkIfIsCollecting(agent)) {
          this.collectItem(agent, item);
        }
      });

      // Collisions
      if (!agent.immovable) {
        this.moveAgent(agent);
      }

      agent.direction.set(0); // Resets the direction

      agent.updateSkillsTime(deltaTime);

      this.checkAgentModifiers(agent, deltaTime);

      // Removes the entity if it is dead
      if (agent.isDead) {
        agent.onDead(this);
        this.removeAgent(agent.uuid);
      }
    }
  }

  private checkAgentModifiers(agent: Agent, deltaTime: number) {
    const deltaTimeInSeconds = deltaTime / 1000;

    let isFrozen = false;
    let isSlowedDown = false;
    let isBurning = false;
    let speedToSum = 0;
    // Checks the modifiers of the targetable entities.
    // For instance if an entity has the "burning" modifier the
    // it will apply the burning damage for this frame.
    agent.modifiers.forEach((m) => {
      if (m.type === 'slowdown' && m.value === 0.0) {
        isFrozen = true;
      }

      if (m.type === 'slowdown' && m.value < 1.0) {
        isSlowedDown = true;
      }

      if (m.type === 'speed') {
        speedToSum += m.value;
      }

      if (m.type === 'burning') {
        isBurning = true;
        const totalDamage = deltaTimeInSeconds * m.value;
        // Burning has the notAnimate flag as true because animation
        // is heavy and burning can make damage multiple times in a frame.
        this.hurtAgent(agent, totalDamage, m.by, true);
      }
    });

    agent.entityEffects.setFrozen(isFrozen);
    agent.entityEffects.setSlowedDown(isSlowedDown);
    agent.entityEffects.setBurning(isBurning);
    agent.entityEffects.setSpeedToSum(speedToSum);
  }

  /**
   * Adds to ticker list a function that will be executed in every tick until returns true
   */
  public addToTickerList(fn: (deltaTime: number) => boolean) {
    this.tickerList.push(fn);
  }

  /**
   * Similar to the Javascript function "setTimeout".
   * The reason to use this function instead of "setTimeout" is that this function
   * will follow the game ticks and will wait if the game is paused.
   */
  public addTimeout(fn: () => void, time: number) {
    let duration = time;
    this.addToTickerList((deltaTime: number) => {
      duration -= deltaTime;
      if (duration <= 0) {
        fn();
        return true; // Return true to remove this event from the ticker list.
      }

      return false;
    });
  }

  private executeTickerList(deltaTime: number) {
    const toDelete = new Set();
    this.tickerList.forEach((t, i) => {
      if (t(deltaTime)) {
        toDelete.add(i);
      }
    });

    this.tickerList = this.tickerList.filter((el, i) => !toDelete.has(i));
  }

  public addProjectile(p: Projectile) {
    this.projectiles.add(p);
    this.trigger(TRIGGER_ADD_ENTITY, [p]);
  }

  private __removeProjectile(p: Projectile) {
    if (this.projectiles.has(p)) {
      this.projectiles.delete(p);
      p.onRemove(this);
      this.trigger(TRIGGER_REMOVE_ENTITY, [p]);
    } else {
      throw new Error('Projectile not found');
    }
  }

  /**
   * Projectiles added to this list will be removed in the next frame.
   */
  public deactivateProjectile(p: Projectile) {
    this.__deactivatedProjectiles.add(p);
  }

  public hasProjectile(p: Projectile) {
    return this.projectiles.has(p);
  }

  private getClosestMapPos(entity: Entity) {
    const x = entity.position.x;
    const y = entity.position.y;
    const halfWidth = entity.width / 2;
    const halfHeight = entity.height / 2;

    let moveX = x;
    let moveY = y;

    if (x - halfWidth < 0) moveX = halfWidth;
    if (x + halfWidth > this.width) moveX = this.width - halfWidth;

    if (y - halfHeight < 0) moveY = halfHeight;
    if (y + halfHeight > this.height) moveY = this.height - halfHeight;

    return new Vector2D(moveX, moveY);
  }

  /**
   * Modifies the agent direction like it was drunk.
   */
  private applyDrunkEffect(agent: Agent) {
    const { direction } = agent;

    if (direction.isZero()) {
      return;
    }

    const { drunkDeviation } = agent.entityEffects;
    const deviationCooldown = 1000;

    if (agent.entityEffects.drunkTime === 0) {
      const maxDeviation = 0.5; // Maximum deviation from the original direction

      // Generate random variations
      const deviationX = (Math.random() - 0.5) * 2 * maxDeviation;
      const deviationY = (Math.random() - 0.5) * 2 * maxDeviation;

      drunkDeviation.setX(deviationX);
      drunkDeviation.setY(deviationY);

      agent.entityEffects.setDrunkTime(
        agent.entityEffects.drunkTime + this.deltaTime,
      );
    } else if (agent.entityEffects.drunkTime >= deviationCooldown) {
      agent.entityEffects.setDrunkTime(0);
    } else {
      agent.entityEffects.setDrunkTime(
        agent.entityEffects.drunkTime + this.deltaTime,
      );
    }

    direction.normalize().sum(drunkDeviation);
  }

  /**
   * Moves an agent depending on its direction and the collisions it has.
   */
  private moveAgent(agent: Agent) {
    let fixedSpeed: null | number = null;

    const scaleToMovement = (vec: Vector2D) => {
      if (vec.magnitudeSquared() > 0.0001) {
        // If the direction is too low it won't be scaled
        // to avoid large movements where it should not.
        vec.normalize();
      }

      if (fixedSpeed === null) {
        vec.scaleBy(agent.speed);
      } else {
        vec.scaleBy(fixedSpeed);
      }

      return vec.scaleBy(this.deltaTime / this.tickLengthMs);
    };

    const { position, fixedDirection, team } = agent;

    if (agent.modifiers.some((m) => m.type === 'drunk')) {
      this.applyDrunkEffect(agent);
    }

    const dir = fixedDirection || agent.direction;

    const intend = scaleToMovement(dir.clone());
    const isPlayer = agent.uuid === PLAYER_ID;

    const halfWidth = agent.width / 2;
    const halfHeight = agent.height / 2;

    // Checks if it's already outside
    const isOutside = this.isOutside(
      position.x,
      position.y,
      halfWidth,
      halfHeight,
    );

    if (isOutside) {
      // If the entity is already outside the it will move
      // directly to the closest map position.
      const closestMapPos = this.getClosestMapPos(agent);
      agent.moveTo(closestMapPos);
      return;
    }

    // Checks if it's going to be outside in the X axis.
    const isXOutside = this.isOutside(
      position.x + intend.x,
      position.y,
      halfWidth,
      halfHeight,
    );

    if (isXOutside) {
      // To avoid going outside

      // This sets a little bit of direction to the opposite side
      // so it will move a little away from the limit
      dir.setX(-Math.sign(intend.x) * 0.001);
    }

    // Checks if it's going to be outside in the Y axis.
    const isYOutside = this.isOutside(
      position.x,
      position.y + intend.y,
      halfWidth,
      halfHeight,
    );

    if (isYOutside) {
      // To avoid going outside

      // This sets a little bit of direction to the opposite side
      // so it will move a little away from the limit
      dir.setY(-Math.sign(intend.y) * 0.001);
    }

    if (fixedDirection) {
      // If the direction is fixed then it will ignore the collisions with other agents.
      scaleToMovement(dir);
      agent.move(dir);
      return;
    }

    const checkedAgents: Set<Agent> = new Set();
    this.iterateEntityCells(agent, (row, col) => {
      for (let otherAgent of this.__grid[row][col]) {
        if (agent === otherAgent) {
          continue;
        }

        // The player will not collide with his allies
        if (isPlayer && team === otherAgent.team) {
          continue;
        }

        if (checkedAgents.has(otherAgent)) {
          // To avoid re-check an agent.
          continue;
        }
        checkedAgents.add(otherAgent);

        const otherPos = otherAgent.position;

        if (position.isEqual(otherPos)) {
          // To avoid two agents getting stuck each other.
          dir.setX(getRandomIntInRange(-1, 1));
          dir.setY(getRandomIntInRange(-1, 1));

          // Finishes the iteration.
          return true;
        }

        if (
          otherAgent.ejectCollidingAgents &&
          agent.isCollidingWith(otherAgent)
        ) {
          dir.setX(position.x - otherPos.x);
          dir.setY(position.y - otherPos.y);
          fixedSpeed = 1;

          // Finishes the iteration.
          return true;
        }

        if (dir.x !== 0) {
          const isXColliding = agent.isCollidingWith(
            otherAgent,
            position.x + intend.x,
            position.y,
          );

          if (isXColliding) {
            const distanceToAgent1 = agent.getDistanceSquared(
              otherPos.x,
              otherPos.y,
            );
            const distanceToAgent2 = agent.getDistanceSquared(
              otherPos.x,
              otherPos.y,
              intend.x,
              0,
            );

            if (distanceToAgent1 < distanceToAgent2) {
              dir.setX(0);
            }
          }
        }

        if (dir.y !== 0) {
          const isYColliding = agent.isCollidingWith(
            otherAgent,
            position.x,
            position.y + intend.y,
          );

          if (isYColliding) {
            const distanceToAgent1 = agent.getDistanceSquared(
              otherPos.x,
              otherPos.y,
            );
            const distanceToAgent2 = agent.getDistanceSquared(
              otherPos.x,
              otherPos.y,
              0,
              intend.y,
            );

            if (distanceToAgent1 < distanceToAgent2) {
              dir.setY(0);
            }
          }
        }
      }
    });

    scaleToMovement(dir);
    agent.move(dir);
  }

  /**
   * Sets direction to an agent to a position, then this direction will be used to move this agent
   * in the frame.
   */
  public setAgentDirectionTo(agent: Agent, x: number, y: number) {
    const movement = new Vector2D(x, y).sub(agent.position);
    agent.direction.setX(movement.x);
    agent.direction.setY(movement.y);
  }

  public addAgent(a: Agent) {
    if (a.uuid !== PLAYER_ID) {
      // Sets the agent as NPC
      a.createComponentNPC();
    }

    a.onCreate(this);

    this.__allAgents.set(a.uuid, a);

    if (!this.__agentsByTeam.has(a.team)) {
      this.__agentsByTeam.set(a.team, new Map());
    }
    this.__agentsByTeam.get(a.team)?.set(a.uuid, a);

    this.trigger(TRIGGER_ADD_ENTITY, [a]);
  }

  public removeAgent(uuid: string) {
    const a = this.__allAgents.get(uuid);

    if (!a) {
      throw new Error('Agent not found');
    }

    this.__allAgents.delete(uuid);
    this.__agentsByTeam.get(a.team)?.delete(a.uuid);

    this.trigger(TRIGGER_REMOVE_ENTITY, [a]);
  }

  public hasAgent(uuid: string) {
    return this.__allAgents.has(uuid);
  }

  public addItem(i: Item) {
    this.items.push(i);
    this.trigger(TRIGGER_ADD_ENTITY, [i]);
  }

  public removeItem(i: Item) {
    const index = this.items.indexOf(i);
    if (index > -1) {
      this.items.splice(index, 1);
      this.trigger(TRIGGER_REMOVE_ENTITY, [i]);
    } else {
      throw new Error('Item not found');
    }
  }

  public tryToShotTo(agent: Agent, x: number, y: number) {
    if (agent.entityEffects.isFrozen) {
      // Agents cannot shoot if they are frozen.
      return;
    }

    agent.lookAt(x, y);
    agent.getWeapons().forEach((w) => {
      if (w.shoot(this, agent)) {
        const wRotation = w.getRotationTo(x, y);
        this.shoot(agent, w, wRotation);
      }
    });
  }

  private shoot(by: Agent, weapon: Weapon, rotation: number) {
    weapon.attack();
    weapon.onShoot(this, by, rotation);
  }

  public hurtAgent(
    agent: Agent,
    damage: number,
    by?: Agent,
    notAnimate: boolean = false,
  ) {
    // Agents cannot get less than 0 hp
    damage = damage > agent.hp ? agent.hp : damage;

    if (damage === 0) {
      // Damage can be 0 in the following cases:
      // - The agent has a Shield projectile blocker.
      return;
    }

    const wasDead = agent.isDead;

    agent.hurt(damage, notAnimate);
    by?.sumToDamageDone(damage);

    if (!wasDead && agent.isDead) {
      // Just got killed.

      this.trigger(TRIGGER_AGENT_KILLED, [agent]);

      if (by?.team === ALLY_TEAM && agent.team !== ALLY_TEAM) {
        // If the defeated agent was not part of the ally team then
        // the player will gain experience.
        const player = this.getPlayer();
        player.expGained += agent.givesExp;
        player.addAgentDefeated();
        this.trigger(TRIGGER_ENEMY_KILLED, [agent, player]);
      }
    }
  }

  public healAgent(agent: Agent, healing: number) {
    // Agents cannot get more hp than his max hp
    healing =
      agent.hp + healing > agent.maxHp ? agent.maxHp - agent.hp : healing;

    agent.heal(healing);
  }

  public hurtTargetableEntity(
    entity: TargetableEntity,
    damage: number,
    by?: Agent,
  ) {
    const hurtFunctionMap: { [x: string]: any } = {
      agent: this.hurtAgent.bind(this),
    };

    hurtFunctionMap[entity.entityType](entity, damage, by);
  }

  public healTargetableEntity(
    entity: TargetableEntity,
    healing: number,
    by?: Agent,
  ) {
    const hurtFunctionMap: { [x: string]: any } = {
      agent: this.healAgent.bind(this),
    };

    hurtFunctionMap[entity.entityType](entity, healing, by);
  }

  public createProjectileFromWeapon(
    by: Agent,
    weapon: Weapon,
    rotation: number,
  ) {
    return this.createProjectile(
      by,
      weapon.projectileKey as projectileKey,
      rotation,
      new Vector2D(weapon.position.x, weapon.position.y),
    );
  }

  public createProjectile(
    by: Agent,
    projectileKey: projectileKey,
    rotation: number,
    position: Vector2D,
  ) {
    return new projectilesMap[projectileKey]({
      by,
      damage: by.damage,
      rotation,
      position,
    });
  }

  public getClosestEnemyOf(
    position: Vector2D,
    team: number,
    filterFn?: (a: Agent) => boolean,
  ): Agent | null {
    let distance = Number.POSITIVE_INFINITY;
    let closestEnemy: Agent | null = null;

    for (const t of this.__agentsByTeam.keys()) {
      if (t === team) {
        continue;
      }

      const enemies = this.__agentsByTeam.get(t);

      // eslint-disable-next-line no-loop-func
      enemies?.forEach((a) => {
        if (a.isDead) {
          return;
        }

        if (filterFn && !filterFn(a)) {
          return;
        }

        const distanceToAgent = position.getDistanceSquared(a.position);

        if (distanceToAgent < distance) {
          closestEnemy = a;
          distance = distanceToAgent;
        }
      });
    }

    return closestEnemy;
  }

  public getClosestEnemyOfAgent(
    agent: Agent,
    filterFn?: (a: Agent) => boolean,
  ) {
    return this.getClosestEnemyOf(agent.position, agent.team, filterFn);
  }

  public getFurthestEnemy(agent: Agent): Agent | null {
    const { position, team } = agent;
    const enemies = this.getEnemyAgentsOfTeam(team);

    let distance = Number.NEGATIVE_INFINITY;
    let fursthestEnemy: Agent | null = null;

    enemies.forEach((e) => {
      const distanceToAgent = position.getDistanceSquared(e.position);

      if (distanceToAgent > distance) {
        fursthestEnemy = e;
        distance = distanceToAgent;
      }
    });

    return fursthestEnemy;
  }

  public getAgentsOfTeam(team: number) {
    const agents: Agent[] = [];

    this.__agentsByTeam.get(team)?.forEach((a) => {
      agents.push(a);
    });

    return agents;
  }

  public getEnemyAgentsOfTeam(team: number) {
    const agents: Agent[] = [];

    for (const t of this.__agentsByTeam.keys()) {
      if (team === t) {
        continue;
      }

      const enemies = this.__agentsByTeam.get(t);
      enemies?.forEach((e) => agents.push(e));
    }

    return agents;
  }

  /**
   * Returns the most wounded ally. To determinate how wounded they are it uses
   * the percentage of life they have.
   */
  public getMostWoundedAlly(agent: Agent) {
    let mostWounded: Agent | null = null;
    let lifePercentage = Number.MAX_SAFE_INTEGER;

    const allies = this.__agentsByTeam.get(agent.team);

    if (!allies) {
      return null;
    }

    for (const a of allies.values()) {
      if (agent === a) {
        continue;
      }

      let newLifePercentage = a.hp / a.maxHp;
      if (newLifePercentage < lifePercentage) {
        mostWounded = a;
        lifePercentage = newLifePercentage;
      }
    }

    return mostWounded;
  }

  public createAgentByKey(
    agentKey: agentKey,
    position: Vector2D,
    team: number,
    uuid?: string,
  ) {
    return new agentsMap[agentKey]({
      team,
      position,
      uuid,
    });
  }

  public addShieldToAgent(agent: Agent, shield: Shield) {
    agent.addShield(shield);
    this.trigger(TRIGGER_SHIELD_EFFECT, [
      {
        shieldKey: shield.shieldKey,
        duration: shield.duration,
        entity: agent,
      },
    ]);

    this.addTimeout(() => {
      agent.removeShield(shield);
    }, shield.duration * 1000);
  }

  // Inflation stats
  get inflation() {
    return this.__inflation;
  }
  public addInflation(n: number) {
    this.__inflation += n;
    this.trigger(TRIGGER_GAME_INFLATION, [this.__inflation]);
  }

  public addWave(wave: IEnemyWave) {
    this.level.addWave(wave);
  }
  public get waveNumber() {
    return this.level.enemyWave;
  }

  public get isLastWave() {
    return this.level.isTheLastWave;
  }

  public explosion({
    team,
    radius,
    damage,
    fireDamage,
    position,
    by,
  }: {
    team: number;
    radius: number;
    damage: number;
    fireDamage: number;
    position: Vector2D;
    by: Agent;
  }) {
    const enemies = this.getEnemyAgentsOfTeam(team).filter(
      (e) => position.getDistanceSquared(e.position) <= radius * radius, // Squared
    );

    enemies.forEach((enemy) => {
      this.hurtAgent(enemy, damage, by);

      // Fire burns their target
      const modifier: IModifier = {
        type: 'burning',
        value: fireDamage, // Damage per second
        duration: 3,
        by: by,
      };

      enemy.addModifier(this, modifier);
    });
    this.trigger(TRIGGER_EXPLOSION, [position, radius, team]);
  }

  public addDefenses(hp: number = 5000) {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const wallMargin = 56;

    const addWall = (position: Vector2D) => {
      const w = new WallDefense({
        position,
        team: ALLY_TEAM,
      });

      w.hp = hp;
      w.maxHp = hp;

      this.addAgent(w);

      return w;
    };

    const walls = [];

    const n = 13;
    const totalSize = wallMargin * (n - 1);

    for (let i = 0; i < n; i++) {
      if (!(i > 0 && i < n - 1)) {
        // This condition removes the corners.
        continue;
      }

      if (i === 4 || i === 8) {
        continue;
      }

      const top = new Vector2D(
        centerX - totalSize / 2 + wallMargin * i,
        centerY - totalSize / 2,
      );

      const right = new Vector2D(
        centerX + totalSize / 2,
        centerY - totalSize / 2 + wallMargin * i,
      );

      const bottom = new Vector2D(
        centerX - totalSize / 2 + wallMargin * i,
        centerY + totalSize / 2,
      );

      const left = new Vector2D(
        centerX - totalSize / 2,
        centerY - totalSize / 2 + wallMargin * i,
      );

      walls.push(addWall(top));
      walls.push(addWall(right));
      walls.push(addWall(bottom));
      walls.push(addWall(left));
    }

    return walls;
  }

  /**
   * Changes the team of an agent.
   */
  public changeAgentTeam(agent: Agent, team: number) {
    this.__agentsByTeam.get(agent.team)?.delete(agent.uuid);
    this.__agentsByTeam.get(team)?.set(agent.uuid, agent);
    agent.team = team;
  }
}
