import Agent from '..';
import Game from '../../../game';

const minSquaredDistanceToMove = 200 * 200;

export class ComponentNPC {
  private agent: Agent;

  // Get the closest enemy is a function that can be heavy if there are
  // a lot of agents in the game so it will be cached.
  private __cachedClosestEnemy: Agent | null = null;

  constructor(agent: Agent) {
    this.agent = agent;
  }

  public think(game: Game) {
    if (
      game.isOutside(
        this.agent.position.x,
        this.agent.position.y,
        this.agent.width / 2,
        this.agent.height / 2,
      )
    ) {
      return;
    }

    if (!this.__cachedClosestEnemy || this.__cachedClosestEnemy.isDead) {
      this.__cachedClosestEnemy = game.getClosestEnemyOfAgent(
        this.agent,
        (a: Agent) => !a.ignoredByNpcs,
      );
    }

    const closestEnemy = this.__cachedClosestEnemy;
    const closestItem = game.getClosestItemToCollect(this.agent);

    const distanceToEnemy = closestEnemy
      ? this.agent.getDistanceSquared(
          closestEnemy.position.x,
          closestEnemy.position.y,
        )
      : Number.MAX_SAFE_INTEGER;

    const distanceToItem = closestItem
      ? this.agent.getDistanceSquared(
          closestItem.position.x,
          closestItem.position.y,
        )
      : Number.MAX_SAFE_INTEGER;

    // ----- Movement -----
    // Will choose the closest entity to seek, this can be an enemy or an item.
    if (
      closestEnemy &&
      !closestEnemy.isDead &&
      distanceToEnemy < distanceToItem &&
      distanceToEnemy > minSquaredDistanceToMove
    ) {
      game.setAgentDirectionTo(
        this.agent,
        closestEnemy.position.x,
        closestEnemy.position.y,
      );
    } else if (closestItem) {
      game.setAgentDirectionTo(
        this.agent,
        closestItem.position.x,
        closestItem.position.y,
      );
    }

    // ----- Attack -----
    if (closestEnemy && !closestEnemy.isDead) {
      game.tryToShotTo(
        this.agent,
        closestEnemy.position.x,
        closestEnemy.position.y,
      );
      this.agent.skills.forEach((s) => s.tryToExecute(game));
    }
  }
}
