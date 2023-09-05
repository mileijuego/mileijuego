import { Character } from '../char/character';
import { ALLY_TEAM, ENEMY_TEAM, STOIC_EXP_PERCENTAGE } from '../constants';
import Agent from '../entities/agent';
import Alberso from '../entities/agent/alberso';
import Bulldog from '../entities/agent/bulldog';
import Bullshit from '../entities/agent/bullshit';
import CentralBank from '../entities/agent/central-bank-pack/central-bank';
import Expert from '../entities/agent/central-bank-pack/expert';
import Gabois from '../entities/agent/central-bank-pack/gabois';
import Kicilove from '../entities/agent/central-bank-pack/kicilove';
import Crisistina from '../entities/agent/crisistina';
import GordoMortero from '../entities/agent/gabois-pack/gordo-mortero';
import Lali from '../entities/agent/lali';
import Larrata from '../entities/agent/larrata';
import Masgloton from '../entities/agent/masgloton';
import Mazza from '../entities/agent/mazza';
import Milei from '../entities/agent/milei';
import Sylvester from '../entities/agent/sylvester';
import SylvesterVillarruel from '../entities/agent/villarruel-pack/sylvester';
import WallDefense from '../entities/agent/wall/defense';
import {
  ItemLibertarianStaffFire,
  ItemLibertarianStaffIce,
} from '../entities/item/items';
import Game from '../game';
import {
  TRIGGER_BOSS_SPAWNED,
  TRIGGER_ENEMY_WAVE_START,
  TRIGGER_HEAVEN_FORCES_ARRIVED,
  TRIGGER_INTRO_CENTRAL_BANK,
  TRIGGER_WORKERS_ARRIVED,
} from '../game-triggers';
import { IEnemyWave } from '../levels';
import SkillCentralBankShield from '../skill/skill-central-bank-shield';
import SkillCentralBankShield2 from '../skill/skill-central-bank-shield2';
import SkillHealing from '../skill/skill-healing';
import sounds from '../sounds';
import { getTcByWave } from '../tc';
import Vector2D from '../utils/vector-2d';
import ItemFactory from './item-factory';

const scripts = {
  bullshit: (game: Game) => {
    const bulldog = new Bulldog({
      position: new Vector2D(game.width / 2 + 256, 0),
      team: ENEMY_TEAM,
    });

    const bullshit = new Bullshit({
      position: new Vector2D(game.width / 2 - 256, 0),
      team: ENEMY_TEAM,
    });

    game.addAgent(bulldog);
    game.addAgent(bullshit);
  },

  masgloton: (game: Game) => {
    const masgloton = new Masgloton({
      position: new Vector2D(game.width / 2, 0),
      team: ENEMY_TEAM,
    });

    game.addAgent(masgloton);
  },

  gabois: (game: Game) => {
    game.addTimeout(() => {
      sounds['gabois-helicoptero'].play();
    }, 5000);

    game.addDefenses(5000);
  },

  'december-is-far-away': (game: Game) => {
    const enemies = [
      new Mazza({ position: new Vector2D(game.width, 0), team: ENEMY_TEAM }),
      new Bullshit({
        position: new Vector2D(game.width, 100),
        team: ENEMY_TEAM,
      }),
      new Crisistina({
        position: new Vector2D(game.width, 200),
        team: ENEMY_TEAM,
      }),
      new Gabois({ position: new Vector2D(game.width, 300), team: ENEMY_TEAM }),
      new Larrata({
        position: new Vector2D(game.width, 400),
        team: ENEMY_TEAM,
      }),
      new Bulldog({
        position: new Vector2D(game.width, 500),
        team: ENEMY_TEAM,
      }),
      new Alberso({
        position: new Vector2D(game.width, 600),
        team: ENEMY_TEAM,
      }),
      new Lali({ position: new Vector2D(game.width, 700), team: ENEMY_TEAM }),
      new GordoMortero({
        position: new Vector2D(game.width, 800),
        team: ENEMY_TEAM,
      }),
      new Masgloton({
        position: new Vector2D(game.width, 900),
        team: ENEMY_TEAM,
      }),
      new Kicilove({
        position: new Vector2D(game.width, 1000),
        team: ENEMY_TEAM,
      }),
      new Expert({
        position: new Vector2D(game.width, 1100),
        team: ENEMY_TEAM,
      }),
    ];

    enemies.forEach((enemy) => game.addAgent(enemy));
  },

  'central-bank': (game: Game) => {
    game.addInflation(100); // Inflation starts at 100.
    game.trigger(TRIGGER_INTRO_CENTRAL_BANK, []);

    // Spawns a central bank in the middle of the map.
    const centralBank = new CentralBank({
      position: new Vector2D(game.width / 2, game.height / 2),
      team: ENEMY_TEAM,
    });

    const firstShield = new SkillCentralBankShield({ agent: centralBank });
    const secondShield = new SkillCentralBankShield2({ agent: centralBank });

    centralBank.addSkill(firstShield);

    game.addAgent(centralBank);

    // This block of code spawns the ministries.
    (() => {
      const offset = 128;

      let ministriesDestroyed = 0;
      const onMinistryDestroyed = () => {
        ministriesDestroyed++;

        if (ministriesDestroyed === 3) {
          // This is being executed when all the ministries have been destroyed.

          // Removes the central bank shield.
          centralBank.removeSkill(firstShield);

          // Adds the second shield
          centralBank.addSkill(secondShield);
          game.addToTickerList(() => {
            const enemyAgents = game.getAgentsOfTeam(ENEMY_TEAM);

            if (enemyAgents.length === 1 && enemyAgents[0] === centralBank) {
              centralBank.removeSkill(secondShield);
              return true;
            }

            return false;
          });

          const bossOffset = 256;

          game.addTimeout(() => {
            game.addAgent(
              game.createAgentByKey(
                'central-bank-alberso',
                new Vector2D(game.width / 2 - bossOffset, game.height / 2),
                ENEMY_TEAM,
              ),
            );
          }, 1000);

          game.addTimeout(() => {
            game.addAgent(
              game.createAgentByKey(
                'central-bank-larrata',
                new Vector2D(game.width / 2 + bossOffset, game.height / 2),
                ENEMY_TEAM,
              ),
            );
          }, 3000);

          game.addTimeout(() => {
            game.addAgent(
              game.createAgentByKey(
                'central-bank-crisistina',
                new Vector2D(game.width / 2, game.height / 2 + bossOffset),
                ENEMY_TEAM,
              ),
            );
          }, 5000);
        }
      };

      const pibiMinistry = game.createAgentByKey(
        'pibi-ministry',
        // Left
        new Vector2D(offset, game.height / 2),
        ENEMY_TEAM,
      );

      const dialogMinistry = game.createAgentByKey(
        'dialog-ministry',
        // Top
        new Vector2D(game.width / 2, offset),
        ENEMY_TEAM,
      );

      const choriMinistry = game.createAgentByKey(
        'chori-ministry',
        new Vector2D(game.width - offset, game.height / 2),
        ENEMY_TEAM,
      );

      pibiMinistry.addOnDeadEvent(onMinistryDestroyed);
      dialogMinistry.addOnDeadEvent(onMinistryDestroyed);
      choriMinistry.addOnDeadEvent(onMinistryDestroyed);

      pibiMinistry.addOnDeadEvent(() => {
        // When the dialog ministry is destroyed a Gabois will appear
        game.addAgent(
          new Gabois({
            position: pibiMinistry.position.clone(),
            team: ENEMY_TEAM,
          }),
        );
      });

      dialogMinistry.addOnDeadEvent(() => {
        // When the dialog ministry is destroyed an Expert will appear
        game.addAgent(
          new Expert({
            position: dialogMinistry.position.clone(),
            team: ENEMY_TEAM,
          }),
        );
      });

      choriMinistry.addOnDeadEvent(() => {
        // When the dialog ministry is destroyed a Kicilove will appear
        game.addAgent(
          new Kicilove({
            position: choriMinistry.position.clone(),
            team: ENEMY_TEAM,
          }),
        );
      });

      // Spawns the ministries in the sides of the map.
      game.addAgent(pibiMinistry);
      game.addAgent(dialogMinistry);
      game.addAgent(choriMinistry);
    })();

    const libertarianStaffesFactory = new ItemFactory({
      delay: 10,
      items: [ItemLibertarianStaffFire, ItemLibertarianStaffIce],
      team: ALLY_TEAM,
    });

    libertarianStaffesFactory.start(game);

    (() => {
      const workerCreationDelay = 2;

      const workerTimeout = () => {
        const posRand = Math.random();
        let coords;

        if (posRand < 0.25) {
          // Top
          coords = {
            x: Math.random() * game.width,
            y: 0,
          };
        } else if (posRand < 0.5) {
          // Bottom
          coords = {
            x: Math.random() * game.width,
            y: game.height,
          };
        } else if (posRand < 0.75) {
          // Left
          coords = {
            x: 0,
            y: Math.random() * game.height,
          };
        } else {
          // Right
          coords = {
            x: game.width,
            y: Math.random() * game.height,
          };
        }

        game.addAgent(
          game.createAgentByKey(
            'worker',
            new Vector2D(coords.x, coords.y),
            ALLY_TEAM,
          ),
        );

        game.addTimeout(() => {
          workerTimeout();
        }, workerCreationDelay * 1000);
      };

      game.addToTickerList(() => {
        if (game.inflation >= 200) {
          game.trigger(TRIGGER_WORKERS_ARRIVED, []);
          workerTimeout();
          return true;
        }

        return false;
      });
    })();
  },

  alien: (game: Game) => {
    game.on(TRIGGER_BOSS_SPAWNED, (boss) => {
      // Moves the boss to the middle
      boss.moveTo(new Vector2D(game.width / 2, game.height / 2));

      game.addTimeout(() => {
        allies();
      }, 60 * 1000);
    });

    function allies() {
      const sylvester = new Sylvester({
        position: new Vector2D(game.width / 2, game.height),
        team: ALLY_TEAM,
      });

      game.addAgent(sylvester);

      const allyCreationDelay = 3;

      const allyTimeout = () => {
        const posRand = Math.random();
        let coords;

        if (posRand < 0.25) {
          // Top
          coords = {
            x: Math.random() * game.width,
            y: 0,
          };
        } else if (posRand < 0.5) {
          // Bottom
          coords = {
            x: Math.random() * game.width,
            y: game.height,
          };
        } else if (posRand < 0.75) {
          // Left
          coords = {
            x: 0,
            y: Math.random() * game.height,
          };
        } else {
          // Right
          coords = {
            x: game.width,
            y: Math.random() * game.height,
          };
        }

        game.addAgent(
          game.createAgentByKey(
            'heaven-soldier',
            new Vector2D(coords.x, coords.y),
            ALLY_TEAM,
          ),
        );

        game.addTimeout(() => {
          allyTimeout();
        }, allyCreationDelay * 1000);
      };

      game.trigger(TRIGGER_HEAVEN_FORCES_ARRIVED, []);
      allyTimeout();
    }
  },

  survival: (game: Game, character: Character) => {
    // const level = calculateLevel(character.exp);

    const baseEnemiesNumber = 8;

    const createWave = (waveNumber: number): IEnemyWave => {
      const enemiesAmount = Math.floor(
        baseEnemiesNumber * Math.pow(1.5, waveNumber),
      );

      const waveData = {
        enemiesNumber: enemiesAmount,
        enemies: getTcByWave(waveNumber),
        enemySpawnDelay: 2,
        enemySpawnDelayToSubtractPerEnemySpawned: 0.05,
        minEnemySpawnDelay: 0.2,
      };

      return waveData;
    };

    // Adds the first wave.
    game.addWave(createWave(0));

    let defenses: Agent[] = [];
    game.on(TRIGGER_ENEMY_WAVE_START, (waveNumber: number) => {
      // When a wave starts the game will add defenses and remove the old ones.
      defenses.forEach((d) => (d.hp = 0));
      defenses = game.addDefenses(400 * (waveNumber + 1));

      // Creates the next wave.
      game.addWave(createWave(waveNumber + 1));
    });
  },

  zurdo: (game: Game, character: Character) => {
    const milei = new Milei({
      position: new Vector2D(game.width / 2, 0),
      team: ENEMY_TEAM,
    });

    milei.setCharacter(character, game);

    game.addAgent(milei);
  },

  stoic: (game: Game, character: Character) => {
    const mileiEnemy = new Milei({
      position: new Vector2D(game.width - 200, game.height / 2),
      team: ENEMY_TEAM,
    });

    mileiEnemy.setCharacter(character, game);

    mileiEnemy.givesExp = Math.ceil(
      character.exp * (STOIC_EXP_PERCENTAGE / 100),
    );

    game.addAgent(mileiEnemy);
  },

  villarruel: (game: Game) => {
    const addWall = (position: Vector2D) => {
      const w = new WallDefense({
        position,
        team: ALLY_TEAM,
      });

      w.hp = 10000;
      w.maxHp = 10000;

      w.addSkill(new SkillHealing({ agent: w }, { delay: 10 }));

      game.addAgent(w);

      return w;
    };

    const wallX = 600;

    addWall(new Vector2D(wallX, 32 + 8));
    addWall(new Vector2D(wallX, 96 + 8));
    // addWall(new Vector2D(wallX, 160 + 8))
    addWall(new Vector2D(wallX, 224 + 8));
    addWall(new Vector2D(wallX, 288 + 8));
    // addWall(new Vector2D(wallX, 352 + 8))
    addWall(new Vector2D(wallX, 416 + 8));
    addWall(new Vector2D(wallX, 480 + 8));
    // addWall(new Vector2D(wallX, 544 + 8))
    addWall(new Vector2D(wallX, 608 + 8));
    addWall(new Vector2D(wallX, 672 + 8));

    function allies() {
      const sylvester = new SylvesterVillarruel({
        position: new Vector2D(game.width, Math.random() * game.height),
        team: ALLY_TEAM,
      });

      game.addAgent(sylvester);

      const allyCreationDelay = 4;

      const allyTimeout = () => {
        let coords = {
          x: game.width,
          y: Math.random() * game.height,
        };

        game.addAgent(
          game.createAgentByKey(
            'worker',
            new Vector2D(coords.x, coords.y),
            ALLY_TEAM,
          ),
        );

        game.addTimeout(() => {
          allyTimeout();
        }, allyCreationDelay * 1000);
      };

      allyTimeout();
    }

    const libertarianStaffesFactory = new ItemFactory({
      delay: 10,
      items: [ItemLibertarianStaffFire, ItemLibertarianStaffIce],
      team: ALLY_TEAM,
    });

    libertarianStaffesFactory.start(game);

    allies();
  },
};

export default scripts;
