import Game from '../../game';
import Shield from '../../shield';
import Skill from '../../skill';
import { soundKey } from '../../sounds';
import Vector2D from '../../utils/vector-2d';
import { EntityEffects } from '../entity-effects';
import TargetableEntity, { ITargetableEntity } from '../targetable-entity';
import Weapon from '../weapon';
import { agentData, agentDataKey } from './agent-data';
import { agentKey } from './agents-map';
import { ComponentNPC } from './components/component-npc';

export interface IAgent extends ITargetableEntity {
  agent: agentKey;
}

export type IAgentChild = Omit<IAgent, 'agent'>;

export default class Agent extends TargetableEntity {
  public maxHp = 100;
  public hp = 100;
  public damage = 0; // This damage will be added to the weapon projectiles damage.
  public weight = 1; // The weight affects the pushes the entity will receive.

  // Behaviors
  public ejectCollidingAgents = false;
  public ignoredByNpcs = false; // If true then NPCs won't aim to this agent.

  // Exp
  public givesExp: number;
  public expGained = 0;

  // ----- Passive skills -----
  private __multipleShot = 0;
  public setMultipleShot(value: number) {
    this.__multipleShot = value;
  }
  public get multipleShot() {
    return this.__multipleShot;
  }

  private __explosiveProjectileChance = 0;
  public setExplosiveProjectileChance(value: number) {
    this.__explosiveProjectileChance = value;
  }
  public get explosiveProjectileChance() {
    return this.__explosiveProjectileChance;
  }

  // ----- Direction that the entity will move in the frame. -----
  public direction: Vector2D = new Vector2D(0, 0);
  private __fixedDirection: Vector2D | null = null;
  public setFixedDirection(vec: Vector2D | null) {
    this.__fixedDirection = vec;
  }
  public get fixedDirection() {
    return this.__fixedDirection;
  }
  protected __speed: number;
  protected __minSpeed: number;
  protected __fixedSpeed: number | null = null;
  public setFixedSpeed(value: number | null) {
    this.__fixedSpeed = value;
  }

  public immovable = false; // If true the agent never moves.

  public skills: Skill[];
  public shields: Shield[];
  public agent: agentKey;

  public spawnSoundsKey?: soundKey[];
  public spawnSoundChance: number;
  public deadSoundKey?: soundKey;

  private __damageDone: number;

  private __agentsDefeated: number = 0;
  public addAgentDefeated() {
    this.__agentsDefeated++;
  }
  public get agentsDefeated() {
    return this.__agentsDefeated;
  }

  public entityEffects: EntityEffects;

  // True if the agent has just took a weapon from the ground.
  private __justTookAWeapon = false;
  get justTookAWeapon() {
    return this.__justTookAWeapon;
  }
  setJustTookAWeapon(value: boolean) {
    this.__justTookAWeapon = value;
  }

  constructor(props: IAgent) {
    super(props);
    this.__speed = 1;
    this.__minSpeed = 0;
    this.__damageDone = 0;

    this.width = 48;
    this.height = 96;

    this.agent = props.agent;

    // Exp that gives the agent.
    this.givesExp = agentData[this.agent as agentDataKey]?.givesExp || 10;

    this.spawnSoundChance = 1; // 100%

    this.spriteData = {
      spriteKey: 'agent',
      agent: this.agent,
      width: 64,
      height: 128,
      position: this.position.clone(),
    };

    this.skills = [];
    this.shields = [];

    this.entityEffects = new EntityEffects(this);
  }

  public onCreate(game: Game) {}

  public get entityType() {
    return 'agent';
  }

  public get damageDone() {
    return this.__damageDone;
  }
  public sumToDamageDone(n: number) {
    this.__damageDone += n;
  }

  public get speed(): number {
    if (this.__fixedSpeed !== null) {
      return this.__fixedSpeed;
    }

    const speedMultiplierModifiers = this.slowedFactor();

    const speed =
      (this.__speed + this.entityEffects.speedToSum) * speedMultiplierModifiers;

    return speed > this.__minSpeed ? speed : this.__minSpeed;
  }

  public slowedFactor() {
    let factor = 1;
    this.__modifiers.forEach((m) => {
      if (m.type !== 'slowdown') {
        return;
      }

      if (m.value < factor) {
        factor = m.value;
      }
    });

    return factor;
  }

  public update(game: Game) {
    const componentNPC = this.getComponentNPC();
    if (componentNPC) componentNPC.think(game);
  }

  public getWeapons() {
    const weapons: Weapon[] = [];

    this.forEach((e) => {
      if (e.isWeapon) {
        weapons.push(e);
      }
    });

    return weapons;
  }

  public addSkill(skill: Skill) {
    this.skills.push(skill);
  }

  public removeSkill(skill: Skill) {
    const index = this.skills.indexOf(skill);
    if (index > -1) {
      this.skills.splice(index, 1);
    } else {
      throw new Error('Skill not found');
    }
  }

  public updateSkillsTime(deltaTime: number) {
    const slowedFactor = this.slowedFactor();
    for (const skill of this.skills) {
      const multiplier = skill.ignoreFrozen ? 1 : slowedFactor;
      skill.subTime(deltaTime * multiplier);
    }
  }

  public addShield(shield: Shield) {
    this.shields.push(shield);
  }

  public removeShield(shield: Shield) {
    const index = this.shields.indexOf(shield);
    if (index > -1) {
      this.shields.splice(index, 1);
    } else {
      throw new Error('Shield not found');
    }
  }

  // ----- Components -----
  private __componentNPC: ComponentNPC | undefined;
  public createComponentNPC() {
    this.__componentNPC = new ComponentNPC(this);
  }
  public getComponentNPC() {
    return this.__componentNPC;
  }
}
