import * as PIXI from 'pixi.js';
import { IEntity } from '../../interfaces';
import Entity from '../entity';
import textures from '../../textures';
import { itemsZIndex } from '../../pixi-z-index';

export interface IItemSprite extends IEntity {
  itemKey: string;
  width: number;
  height: number;
}

export default class ItemSprite extends Entity {
  public sprite: PIXI.Sprite;

  constructor(props: IItemSprite) {
    super(props);

    // Agent Sprite
    const texture = textures[props.itemKey];
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
    sprite.zIndex = itemsZIndex;

    // Add the sprite to the state
    this.sprite = sprite;
  }
}
