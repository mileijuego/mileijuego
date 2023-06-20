import Wall from '.';
import { IAgentChild } from '..';

export default class WallCentralBankPot extends Wall {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'wall-central-bank-pot',
    });

    this.maxHp = 1000;
    this.hp = 1000;
    this.width = 56;
    this.height = 56;

    this.spriteData.width = 64;
    this.spriteData.height = 64;
  }
}
