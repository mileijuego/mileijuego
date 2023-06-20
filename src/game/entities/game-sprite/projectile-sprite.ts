import * as PIXI from 'pixi.js';
import { IProjectileSprite } from '../../interfaces';
import { projectilesZIndex } from '../../pixi-z-index';
import textures from '../../textures';
import Vector2D from '../../utils/vector-2d';
import Entity from '../entity';

const rotationToSum = Math.PI / 64;

export default class ProjectileSprite extends Entity {
  public sprite: PIXI.Sprite;
  private rotating?: boolean;

  constructor(props: IProjectileSprite) {
    super(props);

    this.rotating = props.rotating;

    const texture = textures[props.projectileKey];
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
    // rotation
    sprite.rotation = props.rotation;

    // Z Index
    sprite.zIndex = projectilesZIndex;

    // Add the sprite to the state
    this.sprite = sprite;
  }

  public move(vector: Vector2D) {
    this.sprite.position.x += vector.x;
    this.sprite.position.y += vector.y;

    if (this.rotating) {
      this.sprite.rotation += rotationToSum;
    }

    super.move(vector);
  }

  public resize(x: number, y: number) {
    this.sprite.width += x;
    this.sprite.height += y;

    super.resize(x, y);
  }

  public rotate(value: number) {
    this.sprite.rotation += value;
    super.rotate(value);
  }

  public lookAt(x: number, y: number) {
    const rotation = this.getRotationTo(x, y);
    this.sprite.rotation = rotation;
    super.lookAt(x, y);
  }
}
