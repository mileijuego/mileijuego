import AgentSprite from '../entities/game-sprite/agent-sprite';
import WeaponSprite from '../entities/game-sprite/weapon-sprite';
import { IEntity } from '../interfaces';
import { soundKey } from '../sounds';
import ProjectileSprite from '../entities/game-sprite/projectile-sprite';
import Entity from '../entities/entity';
import Agent from '../entities/agent';
import ItemSprite from '../entities/game-sprite/item-sprite';
import HpBarSprite from '../entities/game-sprite/hp-bar-sprite';
import { PLAYER_ID } from '../constants';
import { IUserData } from '../../utils/local-storage';

interface IGameSpriteCreate extends IEntity {
  spriteKey: string;
  soundKey: soundKey;
  projectileKey: string;
  weaponKey: string;
  itemKey: string;

  width: number;
  height: number;
  rotation: number;
  agent: string;
}

export default class GameSpriteFactory {
  create(props: IGameSpriteCreate, entity: Entity, userData: IUserData) {
    switch (props.spriteKey) {
      case 'agent':
        const agentSprite = new AgentSprite(props, entity as Agent);

        // The player doesn't have hp bar
        if (!(entity.uuid === PLAYER_ID && !userData.showPlayerHpBar)) {
          const agentHpBar = new HpBarSprite(props, entity as Agent);
          agentSprite.addEntity(agentHpBar);
        }

        return agentSprite;
      case 'weapon':
        return new WeaponSprite(props);
      case 'projectile':
        return new ProjectileSprite(props);
      case 'item':
        return new ItemSprite(props);
      default:
        throw new Error(`Undefined sprite: ${props.spriteKey}`);
    }
  }
}
