import * as PIXI from 'pixi.js';

export default class Pointer {
  private container: PIXI.Container;
  private __isPressed: boolean;
  private downHandlerBinded: (e: PIXI.InteractionEvent) => void;
  private upHandlerBinded: (e: PIXI.InteractionEvent) => void;
  public point: PIXI.Point;

  constructor(container: PIXI.Container) {
    this.container = container;
    this.__isPressed = false;

    this.point = new PIXI.Point(0, 0);

    this.downHandlerBinded = this.downHandler.bind(this);
    this.upHandlerBinded = this.upHandler.bind(this);

    this.addEventListeners();
  }

  public addEventListeners() {
    this.container.on('pointerdown', this.downHandlerBinded);
    this.container.on('pointerup', this.upHandlerBinded);
  }

  public removeEventListeners() {
    this.container.off('pointerdown', this.downHandlerBinded);
    this.container.off('pointerup', this.upHandlerBinded);
  }

  private downHandler(e: PIXI.InteractionEvent) {
    this.point = e.data.global;
    this.__isPressed = true;
  }

  private upHandler(e: PIXI.InteractionEvent) {
    this.__isPressed = false;
  }

  public isPressed() {
    return this.__isPressed;
  }
}
