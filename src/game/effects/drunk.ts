import * as PIXI from 'pixi.js';
import { Effect } from 'pixi-game-camera';
import Vector2D from '../utils/vector-2d';

interface Vector {
  x: number;
  y: number;
}

/**
 * A Shake effect involves shaking the camera at various amounts up to a sepcified intensity.
 */
export class DrunkEffect extends Effect {
  /**
   * The intensity of the shake, from 1-10.
   *
   * @private
   *
   * @property {number}
   *
   * @default 5
   */
  private _intensity = 5;

  private _direction = new Vector2D(0, 0);
  private _deviationCooldown = 10;
  private _deviationTime = 0;

  /**
   * A reference to the initial pivot of the container.
   *
   * @private
   *
   * @property {Vector}
   */
  private _initialPivot: Vector;

  /**
   * @param {Container} container A reference to the container to apply the shake effect to.
   * @param {number} intensity The intensity of the shake, from a scale of 1 to 10.
   * @param {number} duration The duration of the shake effect.
   */
  constructor(container: PIXI.Container, intensity: number, duration: number) {
    super(container);

    this._intensity = intensity;
    this.duration = duration;
    this._initialPivot = {
      x: this.container.pivot.x,
      y: this.container.pivot.y,
    };

    this.started = performance.now();
  }

  /**
   * Updates the status of the shake.
   */
  update(deltaTime: number) {
    if (this.criteriaMet()) {
      this.container.pivot.x = this._initialPivot.x;
      this.container.pivot.y = this._initialPivot.y;

      this.finished.dispatch();
      return;
    }

    this.current = performance.now();

    if (
      this._deviationTime === 0 ||
      this._deviationTime >= this._deviationCooldown
    ) {
      if (this._deviationTime === 0) {
        const { deviationX, deviationY } = generateRandomDeviation(
          this._intensity,
        );
        this._direction.setX(deviationX);
        this._direction.setY(deviationY);
      }
      this._deviationTime += deltaTime;
      if (this._deviationTime >= this._deviationCooldown) {
        this._deviationTime = 0;
      }
    } else {
      this._deviationTime += deltaTime;
    }

    this.container.pivot.x += this._direction.x;
    this.container.pivot.y += this._direction.y;

    if (this.useRAF)
      this.id = requestAnimationFrame((dTime) => this.update(dTime));
  }

  /**
   * Checks to see if the shake effect is done.
   *
   * @returns {boolean} Returns true if the shake effect is done or not.
   */
  criteriaMet(): boolean {
    if (this.current - this.started >= this.duration) return true;
    return false;
  }
}

function generateRandomDeviation(intensity: number) {
  const deviationX = (Math.random() - 0.5) * 2 * intensity;
  const deviationY = (Math.random() - 0.5) * 2 * intensity;
  return { deviationX, deviationY };
}
