import Item, { IItem } from '.';
// import { PLAYER_ID } from '../../constants';
import Game from '../../game';
import { TRIGGER_ADD_ENTITY, TRIGGER_REMOVE_ENTITY } from '../../game-triggers';
import Vector2D from '../../utils/vector-2d';
import Agent from '../agent';
import { agentKey } from '../agent/agents-map';
import Weapon from '../weapon';
import LibertarianStaffFire from '../weapon/libertarian-staff-fire';
import LibertarianStaffIce from '../weapon/libertarian-staff-ice';

export class ItemMoney extends Item {
  constructor(props: IItem) {
    super(props);

    this.width = 48;
    this.height = 48;

    this.spriteData = {
      spriteKey: 'item',
      itemKey: 'item-money',
      width: 64,
      height: 64,
      position: this.position.clone(),
      rotation: 0,
    };
  }

  public canCollect(agent: Agent) {
    // Agent must be injured to collect
    return agent.hp < agent.maxHp && super.canCollect(agent);
  }

  public onCollect(game: Game, agent: Agent) {
    game.healAgent(agent, 150);
  }
}

abstract class ItemWeapon extends Item {
  constructor(props: IItem) {
    super(props);

    this.width = 48;
    this.height = 48;

    this.spriteData = {
      spriteKey: 'item',
      itemKey: '', // Define in child
      width: 80,
      height: 32,
      position: this.position.clone(),
      rotation: 0,
    };
  }

  protected createWeapon(agent: Agent): Weapon {
    throw new Error('Define in child.');
  }

  public canCollect(agent: Agent) {
    return !agent.justTookAWeapon && super.canCollect(agent);
  }

  public onCollect(game: Game, agent: Agent) {
    agent.setJustTookAWeapon(true);

    const weapon = this.createWeapon(agent);

    const currentWeapons = agent.getWeapons();
    currentWeapons.forEach((w) => w.deactivate());

    agent.addEntity(weapon);
    game.trigger(TRIGGER_ADD_ENTITY, [weapon]);

    game.addTimeout(() => {
      agent.removeEntity(weapon);
      currentWeapons.forEach((w) => w.activate());
      game.trigger(TRIGGER_REMOVE_ENTITY, [weapon]);
      agent.setJustTookAWeapon(false);
    }, 5000);
  }
}

export class ItemLibertarianStaffFire extends ItemWeapon {
  constructor(props: IItem) {
    super(props);

    this.spriteData.itemKey = 'libertarian-staff-fire';
  }

  protected createWeapon(agent: Agent) {
    return new LibertarianStaffFire({
      position: new Vector2D(agent.position.x + 16, agent.position.y + 24),
    });
  }

  // public canCollect(agent: Agent) {
  //   // Only the player can collect libertarian staffs.
  //   return agent.uuid === PLAYER_ID && super.canCollect(agent);
  // }
}

export class ItemLibertarianStaffIce extends ItemWeapon {
  constructor(props: IItem) {
    super(props);

    this.spriteData.itemKey = 'libertarian-staff-ice';
  }

  protected createWeapon(agent: Agent) {
    return new LibertarianStaffIce({
      position: new Vector2D(agent.position.x + 16, agent.position.y + 24),
    });
  }

  // public canCollect(agent: Agent) {
  //   // Only the player can collect libertarian staffs.
  //   return agent.uuid === PLAYER_ID && super.canCollect(agent);
  // }
}

export class ItemBag extends Item {
  // Agent type that is allowed to take the item.
  private agentKey: agentKey;

  constructor(props: IItem, agentKey: agentKey) {
    super(props);

    this.width = 64;
    this.height = 64;

    this.spriteData = {
      spriteKey: 'item',
      itemKey: 'item-bag',
      width: 64,
      height: 64,
      position: this.position.clone(),
      rotation: 0,
    };

    this.agentKey = agentKey;
  }

  public canCollect(agent: Agent): boolean {
    return agent.agent === this.agentKey && super.canCollect(agent);
  }

  public onCollect(game: Game, agent: Agent) {
    agent.heal(1000, true);
    agent.resize(4, 4 * (agent.height / agent.width));
  }
}
