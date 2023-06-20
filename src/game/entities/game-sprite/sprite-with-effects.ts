import * as PIXI from 'pixi.js';
import Entity from '../entity';
import { EntityEffects } from '../entity-effects';

const effects = {
  damage: 0xe73b37,
  healing: 0x65d93b,
  burning: 0xe25822,
  frozen: 0x4ba3e6,
};

export default abstract class SpriteWithEffects extends Entity {
  public sprite!: PIXI.Sprite;
  private effects = new Set<keyof typeof effects>();

  protected showLastFilter() {
    const effs = Array.from(this.effects) as (keyof typeof effects)[];

    if (!effs.length) {
      this.sprite.tint = 0xffffff; // Removes the tint
    } else {
      this.sprite.tint = effects[effs[0]];
    }
  }

  public hurt(n: number, notAnimate: boolean = false) {
    if (!notAnimate && !this.effects.has('damage')) {
      this.effects.add('damage');
      this.showLastFilter();

      setTimeout(() => {
        this.effects.delete('damage');
        this.showLastFilter();
      }, 100);
    }

    super.hurt(n);
  }

  public heal(n: number) {
    if (!this.effects.has('healing')) {
      this.effects.add('healing');
      this.showLastFilter();

      setTimeout(() => {
        this.effects.delete('healing');
        this.showLastFilter();
      }, 100);
    }

    super.heal(n);
  }

  protected addIceFilter() {
    if (this.effects.has('frozen')) {
      this.effects.delete('frozen');
    }

    this.effects.add('frozen');
    this.showLastFilter();
  }

  protected removeIceFilter() {
    this.effects.delete('frozen');
    this.showLastFilter();
  }

  protected addBurningFilter() {
    if (this.effects.has('burning')) {
      this.effects.delete('burning');
    }

    this.effects.add('burning');
    this.showLastFilter();
  }

  protected removeBurningFilter() {
    this.effects.delete('burning');
    this.showLastFilter();
  }

  public updateEntityEffects(entityEffects: EntityEffects) {
    if (entityEffects.isFrozen || entityEffects.isSlowedDown) {
      this.addIceFilter();
    } else {
      this.removeIceFilter();
    }

    if (entityEffects.isBurning) {
      this.addBurningFilter();
    } else {
      this.removeBurningFilter();
    }
  }
}
