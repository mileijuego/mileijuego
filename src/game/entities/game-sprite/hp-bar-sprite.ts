import * as PIXI from 'pixi.js';
import { IAgentSprite } from '../../interfaces';
import Entity from '../entity';
import Vector2D from '../../utils/vector-2d';
import Agent from '../agent';
import { hpBarZIndex } from '../../pixi-z-index';
import { ALLY_TEAM } from '../../constants';

const HP_BAR_WIDTH = 42;
const HP_BAR_HEIGHT = 6;

export default class HpBarSprite extends Entity {
  public sprite: PIXI.Graphics;
  private hpBar: PIXI.Graphics;
  private agent: Agent;

  constructor(props: IAgentSprite, agent: Agent) {
    super(props);

    this.agent = agent;

    const sprite = new PIXI.Graphics();
    sprite.beginFill(0x4a0707);
    sprite.drawRect(0, 0, HP_BAR_WIDTH, HP_BAR_HEIGHT);
    sprite.endFill();
    sprite.position.x = this.agent.position.x - HP_BAR_WIDTH / 2;
    sprite.position.y =
      this.agent.position.y -
      this.agent.spriteData.height / 2 -
      HP_BAR_HEIGHT / 2;
    const hp = new PIXI.Graphics();
    hp.beginFill(agent.team === ALLY_TEAM ? 0x00ff00 : 0xff0000);
    hp.drawRect(0, 0, HP_BAR_WIDTH, HP_BAR_HEIGHT);
    hp.endFill();
    sprite.addChild(hp);
    sprite.visible = false;

    // Z Index
    sprite.zIndex = hpBarZIndex;

    this.sprite = sprite;
    this.hpBar = hp;
  }

  private updateHpBar() {
    this.hpBar.width = (this.agent.hp * HP_BAR_WIDTH) / this.agent.maxHp;

    // If the agent has lost hp, the hp bar will be visible
    this.sprite.visible = this.agent.hp !== this.agent.maxHp;
  }

  public move(vector: Vector2D) {
    this.sprite.position.x += vector.x;
    this.sprite.position.y += vector.y;

    super.move(vector);
  }

  public hurt(n: number, notAnimate: boolean = false) {
    this.updateHpBar();
    super.hurt(n);
  }

  public heal(n: number) {
    this.updateHpBar();
    super.heal(n);
  }

  public resize(x: number, y: number) {
    this.sprite.position.y -= y / 2;

    super.resize(x, y);
  }
}
