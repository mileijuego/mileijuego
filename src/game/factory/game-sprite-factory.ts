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
import { Container, Text, TextStyle } from 'pixi.js';
import { getRandomFloatInRange, getRandomIntInRange } from '../utils';
import { hpBarZIndex } from '../pixi-z-index';
import Game from '../game';

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
  private _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  create(
    props: IGameSpriteCreate,
    entity: Entity,
    userData: IUserData,
    game: Game,
  ) {
    switch (props.spriteKey) {
      case 'agent':
        const agentSprite = new AgentSprite(props, entity as Agent);

        // The player doesn't have hp bar
        if (!(entity.uuid === PLAYER_ID && !userData.showPlayerHpBar)) {
          const agentHpBar = new HpBarSprite(props, entity as Agent);
          agentSprite.addEntity(agentHpBar);
        }

        agentSprite.onHurt((damage: number) => {
          let color = 0xffffff;
          let fontsize = 16;

          if (damage >= 500) {
            color = 0xf66bff;
            fontsize = 32;
          } else if (damage >= 200) {
            color = 0xff6b6b;
            fontsize = 28;
          } else if (damage >= 100) {
            color = 0xffb36b;
            fontsize = 24;
          } else if (damage >= 50) {
            color = 0xffff00;
            fontsize = 20;
          }

          const style = new TextStyle({
            fontSize: fontsize,
            fill: color,
            fontVariant: 'small-caps',
            fontWeight: 'bold',
            lineJoin: 'round',
            strokeThickness: 3,
            align: 'center',
          });

          const dmgText = new Text(String(Math.floor(damage)), style);
          dmgText.anchor.set(0.5);
          dmgText.zIndex = hpBarZIndex;

          dmgText.position.x = entity.position.x + getRandomIntInRange(-20, 20);
          dmgText.position.y =
            entity.position.y - entity.height / 2 + getRandomIntInRange(-5, 5);

          this._container.addChild(dmgText);

          const dir = [
            getRandomFloatInRange(-0.3, 0.3),
            getRandomFloatInRange(-0.5, -0.8),
          ];

          let time = 0;
          game.addToTickerList((dt: number) => {
            time += dt;

            if (time >= 1000) {
              this._container.removeChild(dmgText);
              return true;
            }

            dmgText.position.set(
              dmgText.position.x + dir[0],
              dmgText.position.y + dir[1],
            );

            return false;
          });
        });

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
