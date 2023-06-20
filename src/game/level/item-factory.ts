import Item from '../entities/item';
import Game from '../game';
import { getRandomFromArray } from '../utils';
import Vector2D from '../utils/vector-2d';

interface IItemFactory {
  delay: number;
  items: (typeof Item)[];
  team: number;
}

export default class ItemFactory {
  private delay: number;
  private items: (typeof Item)[];
  private team: number;

  constructor({ delay = 10, items, team }: IItemFactory) {
    this.delay = delay;
    this.items = items;
    this.team = team;
  }

  public start(game: Game) {
    const itemTimeout = () => {
      game.addItem(
        new (getRandomFromArray(this.items) as typeof Item)({
          position: new Vector2D(
            game.width * Math.random(),
            game.height * Math.random(),
          ),
          team: this.team,
        }),
      );

      game.addTimeout(() => {
        itemTimeout();
      }, this.delay * 1000);
    };
    itemTimeout();
  }
}
