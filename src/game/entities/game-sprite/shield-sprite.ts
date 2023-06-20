import * as PIXI from 'pixi.js';
import { IAgentSprite } from '../../interfaces';
import Entity from '../entity';
import Vector2D from '../../utils/vector-2d';
import Agent from '../agent';
import { shieldZIndex } from '../../pixi-z-index';
import textures from '../../textures';

export default class ShieldSprite extends Entity {
  public sprite: PIXI.Sprite;
  private agent: Agent;

  constructor(props: IAgentSprite, agent: Agent, shieldKey: string) {
    super(props);

    const texture = textures[shieldKey];
    const sprite = new PIXI.Sprite(texture);
    // change the sprite's size
    sprite.width = props.width;
    sprite.height = props.height;
    sprite.position.x = props.position.x;
    sprite.position.y = props.position.y;
    sprite.scale.x = agent.spriteData.height / (props.height * 2);
    sprite.scale.y = agent.spriteData.height / (props.height * 2);
    // center the sprite's anchor point
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    // Z Index
    sprite.zIndex = shieldZIndex;

    this.sprite = sprite;
    this.agent = agent;
  }

  public move(vector: Vector2D) {
    this.sprite.position.x += vector.x;
    this.sprite.position.y += vector.y;

    super.move(vector);
  }
}
