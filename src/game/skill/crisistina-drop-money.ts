import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { ItemMoney } from '../entities/item/items';

export default class CrisistinaDropMoney extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 20;

    this.soundKey = 'crisistina-yo-pelotudo';
  }

  execute(game: Game) {
    const offSet = 128;

    const vector1 = this.agent.position.clone(-offSet, -offSet);
    if (!game.isVectorOutside(vector1)) {
      game.addTimeout(() => {
        game.addItem(
          new ItemMoney({
            team: this.agent.team,
            position: vector1,
          }),
        );
      }, 1);
    }

    const vector2 = this.agent.position.clone(offSet, -offSet);
    if (!game.isVectorOutside(vector2)) {
      game.addTimeout(() => {
        game.addItem(
          new ItemMoney({
            team: this.agent.team,
            position: vector2,
          }),
        );
      }, 250);
    }

    const vector3 = this.agent.position.clone(offSet, offSet);
    if (!game.isVectorOutside(vector3)) {
      game.addTimeout(() => {
        game.addItem(
          new ItemMoney({
            team: this.agent.team,
            position: vector3,
          }),
        );
      }, 500);
    }

    const vector4 = this.agent.position.clone(-offSet, offSet);
    if (!game.isVectorOutside(vector4)) {
      game.addTimeout(() => {
        game.addItem(
          new ItemMoney({
            team: this.agent.team,
            position: vector4,
          }),
        );
      }, 750);
    }
  }
}
