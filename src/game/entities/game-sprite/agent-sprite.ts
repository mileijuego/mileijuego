import * as PIXI from 'pixi.js';
import { IAgentSprite } from '../../interfaces';
import sounds from '../../sounds';
import textures from '../../textures';
import Vector2D from '../../utils/vector-2d';
import Agent from '../agent';
import { agentsZIndex } from '../../pixi-z-index';
import SpriteWithEffects from './sprite-with-effects';

export default class AgentSprite extends SpriteWithEffects {
  public sprite: PIXI.Sprite;
  private agent: Agent;

  constructor(props: IAgentSprite, agent: Agent) {
    super(props);

    // Agent Sprite
    const texture = textures[props.agent];
    const sprite = new PIXI.Sprite(texture);
    // change the sprite's size
    sprite.width = props.width;
    sprite.height = props.height;
    // center the sprite's anchor point
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    // move the sprite to the center of the screen
    sprite.position.x = props.position.x;
    sprite.position.y = props.position.y;

    // Z Index
    sprite.zIndex = agentsZIndex;

    // Add the sprite to the state
    this.sprite = sprite;
    this.agent = agent;
  }

  public move(vector: Vector2D) {
    this.sprite.position.x += vector.x;
    this.sprite.position.y += vector.y;

    super.move(vector);
  }

  public hurt(n: number, notAnimate: boolean = false) {
    if (!notAnimate && !sounds.pain.playing()) {
      // This if is to avoid sound overlapping.
      sounds.pain.play();
    }

    super.hurt(n, notAnimate);
  }

  public heal(n: number, addToMaxHp: boolean = false) {
    if (!sounds.heal.playing()) {
      // This if is to avoid sound overlapping.
      sounds.heal.play();
    }

    super.heal(n);
  }

  public resize(x: number, y: number) {
    this.sprite.width += x;
    this.sprite.height += y;

    super.resize(x, y);
  }
}
