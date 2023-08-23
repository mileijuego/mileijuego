import * as PIXI from 'pixi.js';
import { Camera, Shake } from 'pixi-game-camera';

import Keyboard from './keyboard';
import Pointer from './pointer';
import Game from './game';
import Entity from './entities/entity';
import GameSpriteFactory from './factory/game-sprite-factory';
import sounds, { GameSound, SoundGroup, muteSounds } from './sounds';
import Skill from './skill';
import { levelKey } from './interfaces';
import { degreesToRadians, getRandomFromArray } from './utils';
import textures from './textures';
import {
  TRIGGER_ADD_ENTITY,
  TRIGGER_ENEMY_WAVE_START,
  TRIGGER_GAME_FINISH,
  TRIGGER_REMOVE_ENTITY,
  TRIGGER_SKILL_EXECUTED,
  TRIGGER_UPDATE_ENTITY_SPRITE,
  TRIGGER_SHIELD_EFFECT,
  TRIGGER_GAME_INFLATION,
  TRIGGER_INTRO_CENTRAL_BANK,
  TRIGGER_WORKERS_ARRIVED,
  TRIGGER_GAME_PAUSED,
  TRIGGER_AGENT_INVISIBLE,
  TRIGGER_ENEMY_KILLED,
  TRIGGER_EXPLOSION,
  TRIGGER_AGENT_KILLED,
  TRIGGER_HEAVEN_FORCES_ARRIVED,
  TRIGGER_WON,
  TRIGGER_COLOR_SCREEN,
  TRIGGER_MODIFIER_ADDED,
} from './game-triggers';
import { IUserData, getUserData } from '../utils/local-storage';
import Agent from './entities/agent';
import scripts from './level/scripts';
import { scriptKey } from './level';
import {
  ALLY_TEAM,
  COIN_TEXT,
  GOD_MODE,
  PLAYER_ID,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from './constants';
import ShieldSprite from './entities/game-sprite/shield-sprite';
import {
  gameUiZIndex,
  pauseDialogZIndex,
  screenEffectZIndex,
} from './pixi-z-index';
import { Joystick } from './joystick';
import { charSkills } from './char/char-skills';
import { formatNumber, hexToNumber, playOnceLoaded } from '../utils/utils';
import { levels } from './levels';
import Vector2D from './utils/vector-2d';
import { getTxt } from '../texts/texts';
import { DrunkEffect } from './effects/drunk';
import { IModifier } from './entities/targetable-entity';

interface DeviceConfig {
  joystickScale: number;
  joystickMargin: number;
  skillSize: number;
  skillKeyTextSize: number;
  textSize: number;
  levelTitle: number;
  strokeTextSize: number;
  hudBorderMargin: number;
  pauseSize: number;
  pauseDialogText: number;
}

const textColor = 0xf7d354;

const deviceConfigs: { [key: string]: DeviceConfig } = {
  desktop: {
    joystickScale: 0,
    joystickMargin: 0,
    skillSize: 64,
    skillKeyTextSize: 32,
    textSize: 32,
    levelTitle: 32,
    strokeTextSize: 4,
    hudBorderMargin: 384,
    pauseSize: 32,
    pauseDialogText: 32,
  },
  touch: {
    joystickScale: 1.5,
    joystickMargin: 160,
    skillSize: 96,
    skillKeyTextSize: 24,
    textSize: 64,
    levelTitle: 48,
    strokeTextSize: 8,
    hudBorderMargin: 344,
    pauseSize: 64,
    pauseDialogText: 48,
  },
};

export async function startGame(
  levelKey: levelKey,
  isTouch: boolean,
  userData: IUserData,
  updateUserData: (data: IUserData) => any,
  onGameEnd: () => void,
) {
  const levelData = levels[levelKey];

  // Loads and plays the level music.
  const music = playOnceLoaded(levelData.music);

  muteSounds(SoundGroup.Effect, userData.mutedVolume);
  muteSounds(SoundGroup.Music, userData.mutedMusic);

  const deviceConfig = deviceConfigs[isTouch ? 'touch' : 'desktop'];

  // ---------------------------------------------------------- //

  const app = new PIXI.Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  const canvasContainer = document.querySelector('.Game');

  if (!canvasContainer) {
    throw new Error('Canvas container not found.');
  }

  const eventsToPrevent = [
    'click',
    'contextmenu',
    'touchstart',
    'touchmove',
    'touchend',
  ];
  eventsToPrevent.forEach((eName) => {
    // Preventing default events
    canvasContainer?.addEventListener(eName, (e) => e.preventDefault());
  });

  // Adding the app to the DOM
  canvasContainer!.appendChild(app.view);
  const stage = app.stage;
  stage.sortableChildren = true;

  // ---------------------------------------------------------- //

  const camera = new Camera({
    ticker: app.ticker,
  });

  // ---------------------- Player Skills --------------------- //
  const skillsContainer = new PIXI.Container();
  skillsContainer.zIndex = gameUiZIndex;
  stage.addChild(skillsContainer);
  let playerSkills: any[];
  function fetchPlayerSkills(pl: Agent) {
    const keys: { [key: number]: string } = {
      81: 'Q',
      69: 'E',
      82: 'R',
      84: 'T',
      70: 'F',
    };

    const playerSkillsToFetch = player.skills.map((skill) => {
      if (!skill.skillKey) {
        throw new Error('skill.skillKey is undefined.');
      }

      const skillFromCharacter = userData.character.skills.find(
        (s) => s.skillKey === skill.skillKey,
      );

      if (!skillFromCharacter) {
        throw new Error('Skill not found.');
      }

      const skillData = charSkills[skill.skillKey as keyof typeof charSkills];

      if (!skillData?.keyCode) {
        // If the skill does not have keyCode means that it is a
        // passive skill.
        return null;
      }

      return {
        keyText: keys[skillData.keyCode],
        keyCode: skillData.keyCode,
        sprites: (() => {
          const sprite = new PIXI.Sprite(textures.key);
          // change the sprite's size
          sprite.width = deviceConfig.skillSize;
          sprite.height = deviceConfig.skillSize;
          // center the sprite's anchor point
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0.5;
          sprite.interactive = true;
          sprite.buttonMode = true;

          const skillImage = new PIXI.Sprite(
            PIXI.Texture.from(`/img/skill/${skill.skillKey}.png`),
          );
          skillImage.anchor.set(0.5);
          sprite.addChild(skillImage);

          const keyText = new PIXI.Text(keys[skillData.keyCode], {
            fontFamily: 'Arial',
            fontSize: deviceConfig.skillKeyTextSize,
            fill: textColor,
            align: 'center',
            fontWeight: 'bold',
          });
          keyText.scale.set(1);
          keyText.anchor.set(0);
          keyText.position.x = deviceConfig.skillSize / 4;
          keyText.position.y = deviceConfig.skillSize / 4 - 5;
          sprite.addChild(keyText);

          const cdText = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: 56,
            fill: textColor,
            align: 'center',
          });
          cdText.scale.set(1);
          cdText.anchor.set(0.5);
          sprite.addChild(cdText);

          if (
            !userData.character.skills.some(
              (s) => s.skillKey === skill.skillKey && s.points > 0,
            )
          ) {
            // If the user does not have the skill, the button won't be visible
            sprite.visible = false;
          }

          return { sprite, keyText, cdText, skillImage };
        })(),
      };
    });

    playerSkills = playerSkillsToFetch; // Reset player skills ui config

    // Removes older skills if exist
    for (let i = 0; i < skillsContainer.children.length; i++) {
      const skillToDestroy = skillsContainer.children[i];
      skillToDestroy.destroy();
    }

    // Puts the player skills
    const activeSkills = playerSkills.filter((s) => s !== null);
    for (let i = 0; i < activeSkills.length; i++) {
      const sprite = activeSkills[i].sprites.sprite;

      if (isTouch && i > 3) {
        sprite.position.x = 1200;
        sprite.position.y = 400 - (deviceConfig.skillSize + 8) * (i - 4);
      } else {
        sprite.position.x =
          SCREEN_WIDTH -
          300 -
          (deviceConfig.skillSize + 8) * -i -
          deviceConfig.hudBorderMargin;
        sprite.position.y = SCREEN_HEIGHT - deviceConfig.skillSize / 1.5;
      }

      skillsContainer.addChild(sprite);

      sprite.on('pointerdown', () => {
        game.addToTickerList(() => {
          pl.skills[i].tryToExecute(game);
          return true;
        });
      });
    }
  }
  // ---------------------------------------------------------- //

  const gameSpriteFactory = new GameSpriteFactory();

  const titleTextStyle = new PIXI.TextStyle({
    dropShadow: true,
    fill: textColor,
    align: 'center',
    fontSize: deviceConfig.textSize,
    fontVariant: 'small-caps',
    fontWeight: 'bold',
    lineJoin: 'round',
    strokeThickness: deviceConfig.strokeTextSize,
    wordWrap: true,
    wordWrapWidth: SCREEN_WIDTH - deviceConfig.textSize / 2,
  });

  const hpTextStyle = new PIXI.TextStyle({
    dropShadow: true,
    fill: textColor,
    fontSize: deviceConfig.textSize,
    fontVariant: 'small-caps',
    fontWeight: 'bold',
    lineJoin: 'round',
    strokeThickness: deviceConfig.strokeTextSize,
  });

  // ---------------------------- GAME ------------------------------ //

  const game = new Game({
    width: levelData.mapWidth,
    height: levelData.mapHeight,
    levelData,
    character: userData.character,
  });
  let player: Agent;

  game.on(TRIGGER_ADD_ENTITY, (entity: Entity) => {
    entity.forEach((e) => {
      // If a new player has added, we will update the player reference
      if (e.uuid === PLAYER_ID) {
        player = game.getPlayer();
        fetchPlayerSkills(player);
      }

      if (e.spriteData) {
        const gameSprite = gameSpriteFactory.create(e.spriteData, e, userData);

        gameSprite.forEach((s) => {
          if (s.sprite) {
            background.addChild(s.sprite);
          }
        });

        e.addEntity(gameSprite);
      }

      if (e.spawnSoundsKey && Math.random() < e.spawnSoundChance) {
        const snd = sounds[getRandomFromArray(e.spawnSoundsKey)];
        if (!snd.playing()) snd.play();
      }
    });
  });

  game.on(TRIGGER_REMOVE_ENTITY, (entity: Entity) => {
    entity.forEach((e) => {
      if (e.sprite) {
        background.removeChild(e.sprite);
      }
    });
  });

  game.on(TRIGGER_AGENT_KILLED, (agent: Agent) => {
    if (agent.deadSoundKey) {
      // Plays the on dead sound if any.
      sounds[agent.deadSoundKey].play();
    }
  });

  game.on(TRIGGER_ENEMY_KILLED, (agent: Agent) => {
    // When the player has defeated an enemy it will show the exp gained.

    const expText = new PIXI.Text(`+${formatNumber(agent.givesExp)} exp.`, {
      fill: textColor,
      align: 'center',
      fontSize: 18,
      fontVariant: 'small-caps',
      fontWeight: 'bold',
      lineJoin: 'round',
    });
    expText.position.x = agent.position.x;
    expText.position.y = agent.position.y;
    expText.anchor.x = 0.5;
    expText.anchor.y = 0.5;
    expText.zIndex = gameUiZIndex;
    background.addChild(expText);

    game.addTimeout(() => {
      background.removeChild(expText);
    }, 2000);
  });

  game.on(TRIGGER_SKILL_EXECUTED, (skill: Skill) => {
    if (skill.effectKey) {
      switch (skill.effectKey) {
        case 'shake': {
          const shakeEffect = new Shake(background, 20, skill.effectDuration!);
          camera.effect(shakeEffect);
          break;
        }
        default: {
          throw new Error(`Effect invalid: ${skill.effectKey}`);
        }
      }
    }

    // Skill sound
    const skillSound = sounds[skill.soundKey!];
    if (skillSound) {
      skillSound.play();
    }
  });

  let lastDrunkEffect: DrunkEffect | null = null;
  game.on(TRIGGER_MODIFIER_ADDED, (agent: Agent, modifier: IModifier) => {
    if (agent.uuid === PLAYER_ID && modifier.type === 'drunk') {
      if (lastDrunkEffect) {
        // Finishes the current drunk effect.
        lastDrunkEffect.criteriaMet = () => true;
      }

      lastDrunkEffect = new DrunkEffect(
        background,
        1,
        modifier.duration * 1000,
      );
      camera.effect(lastDrunkEffect);
    }
  });

  game.on(TRIGGER_SHIELD_EFFECT, (props) => {
    const { shieldKey, entity } = props;

    const shieldSprite = new ShieldSprite(
      {
        position: entity.position.clone(),
        width: 128,
        height: 128,
        agent: entity,
      },
      entity,
      shieldKey,
    );

    entity.addEntity(shieldSprite); // Adds the shield sprite to the entity to it will follow it.
    background.addChild(shieldSprite.sprite); // Adds the shield sprite to the background so we can see it.

    game.addTimeout(() => {
      // After the shield effect removes the shield from the game.
      entity.removeEntity(shieldSprite);
      background.removeChild(shieldSprite.sprite);
    }, props.duration * 1000);
  });

  game.on(TRIGGER_COLOR_SCREEN, (color: number, duration: number) => {
    const colorSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    colorSprite.width = backgroundContainer.width;
    colorSprite.height = backgroundContainer.height;
    colorSprite.tint = color;
    colorSprite.zIndex = screenEffectZIndex;

    stage.addChild(colorSprite);

    game.addTimeout(() => {
      stage.removeChild(colorSprite);
    }, duration);
  });

  game.on(TRIGGER_ENEMY_WAVE_START, (wave: number) => {
    const text = new PIXI.Text(
      `${getTxt(userData.language!, 'wave')} ${wave + 1}`,
      titleTextStyle,
    );
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.position.x = SCREEN_WIDTH / 2;
    text.position.y = SCREEN_HEIGHT / 2 - 128;
    text.zIndex = gameUiZIndex;

    stage.addChild(text);

    game.addTimeout(() => {
      stage.removeChild(text);
    }, 2000);
  });

  /**
   * Stop and destroy all the game
   */
  function destroyGame() {
    if (game.isStopped) {
      // Has already stopped
      return;
    }

    music.stop();
    game.stop();
    app.stop();
    app.destroy(true, {
      children: true,
    });
  }

  function showGameResult(message: string, isVictory: boolean) {
    const text = new PIXI.Text(
      `${message}\n+${formatNumber(player.expGained)} exp.\n+${formatNumber(
        player.expGained,
      )} ${COIN_TEXT}`,
      titleTextStyle,
    );
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.position.x = SCREEN_WIDTH / 2;
    text.position.y = SCREEN_HEIGHT / 2 - 128;
    text.zIndex = gameUiZIndex;

    stage.addChild(text);

    saveProgress(game, player, isVictory, levelKey, updateUserData)
      .then(() => {
        setTimeout(() => {
          destroyGame();
          onGameEnd();
        }, 5000);
      })
      .catch((error) => {
        console.error('Error saving progress:', error);
      });
  }

  game.on(TRIGGER_GAME_FINISH, async (messageKey: string) => {
    const message = getTxt(userData.language!, messageKey);
    showGameResult(message, false);
  });

  game.on(TRIGGER_WON, async () => {
    const message = getTxt(userData.language!, `${levelKey}-winMessage`);
    showGameResult(message, true);
  });

  game.on(TRIGGER_UPDATE_ENTITY_SPRITE, (entity: Entity, props: object) => {
    entity.forEach((e) => {
      if (e.sprite) {
        Object.assign(e.sprite, props);
      }
    });
  });

  const levelTitle = new PIXI.Text('', {
    fill: textColor,
    align: 'center',
    dropShadow: true,
    fontSize: deviceConfig.levelTitle,
    fontVariant: 'small-caps',
    fontWeight: 'bold',
    lineJoin: 'round',
    strokeThickness: deviceConfig.strokeTextSize,
    wordWrap: true,
    wordWrapWidth: SCREEN_WIDTH - deviceConfig.levelTitle / 2,
  });
  levelTitle.anchor.x = 0.5;
  levelTitle.anchor.y = 0;
  levelTitle.position.x = SCREEN_WIDTH / 2;
  // levelTitle.position.y = deviceConfig.levelTitle * 1;
  levelTitle.zIndex = gameUiZIndex;
  stage.addChild(levelTitle);

  game.on(TRIGGER_GAME_INFLATION, (inflation: number) => {
    levelTitle.text = `Inflación: ${Math.floor(inflation)}%`;
    levelTitle.position.y = deviceConfig.levelTitle * 1;
  });

  game.on(TRIGGER_INTRO_CENTRAL_BANK, () => {
    game.pause();

    levelTitle.position.y = deviceConfig.levelTitle * 1.5;
    levelTitle.text = getTxt(userData.language!, 'central-bank-intro');

    setTimeout(
      () => {
        game.unpause();
      },
      GOD_MODE ? 1000 : 8000,
    );
  });

  game.on(TRIGGER_WORKERS_ARRIVED, () => {
    game.pause();

    levelTitle.position.y = deviceConfig.levelTitle * 1.5;
    levelTitle.text = getTxt(userData.language!, 'central-bank-workers');

    setTimeout(() => {
      game.unpause();
    }, 3500);
  });

  game.on(TRIGGER_HEAVEN_FORCES_ARRIVED, () => {
    game.pause();

    levelTitle.position.y = deviceConfig.levelTitle * 1.5;
    levelTitle.text = getTxt(userData.language!, 'alien-heavenForces');

    setTimeout(() => {
      levelTitle.text = '';
      game.unpause();
    }, 3500);
  });

  // ---------------------------------------------------------- //

  // const scale = isTouch ? 1.5 : 1.0; // If it's a touch device the game will be zoomed.
  const scale = 1;
  const backgroundContainer = new PIXI.Graphics();
  backgroundContainer.beginFill(0x444444); //0x4b7d32
  backgroundContainer.drawRect(
    0,
    0,
    SCREEN_WIDTH / scale,
    SCREEN_HEIGHT / scale,
  );
  backgroundContainer.endFill();
  backgroundContainer.interactive = true;
  backgroundContainer.scale.set(scale);
  stage.addChild(backgroundContainer);

  // ---------------------------------------------------------- //

  const background = new PIXI.Graphics();
  background.beginFill(hexToNumber(levelData.mapColor)); //0x4b7d32
  background.drawRect(0, 0, game.width, game.height);
  background.endFill();
  background.sortableChildren = true;
  backgroundContainer.addChild(background);

  // ---------------------------------------------------------- //

  const tilingSprite = new PIXI.TilingSprite(
    textures.tile,
    game.width,
    game.height,
  );
  background.addChild(tilingSprite);

  // ---------------------------------------------------------- //

  addPauseButton(
    app,
    game,
    music,
    deviceConfig,
    levelKey,
    userData,
    updateUserData,
    () => {
      onGameEnd();
      destroyGame();
    },
  );

  // ---------------------------------------------------------- //

  levelData.scripts.forEach((script: scriptKey) => {
    // Executes the scripts
    scripts[script](game, userData.character);
  });

  game.start();
  player = game.getPlayer();

  // ---------------------------------------------------------- //

  const hpText = new PIXI.Text(String(player.hp >> 0), hpTextStyle);
  hpText.position.x = 8 + deviceConfig.hudBorderMargin;
  hpText.position.y = SCREEN_HEIGHT - deviceConfig.textSize * 1.5;
  hpText.zIndex = gameUiZIndex;
  stage.addChild(hpText);

  const keyboard = new Keyboard();
  const pointer = new Pointer(backgroundContainer);

  // ---------------------------------------------------------- //

  // Joysticks

  const joystickData = {
    x: 0,
    y: 0,
    power: 0,
  };

  const attackJoystickData = {
    x: 0,
    y: 0,
  };

  if (isTouch) {
    // Only touch devices have joysticks.
    addJoysticks(app, deviceConfig, userData, joystickData, attackJoystickData);
  }

  // ---------------------------------------------------------- //

  const cameraCoords = {
    x: 0,
    y: 0,
  };

  /**
   * Returns if an entity is in the screen so it's visible to the player.
   */
  // function isInScreen(entity: Entity) {
  //   const { x, y } = entity.position;

  //   const isXInRange = getDifference(x, player.position.x) <= SCREEN_WIDTH / 2;
  //   const isYInRange = getDifference(y, player.position.y) <= SCREEN_HEIGHT / 2;

  //   return isXInRange && isYInRange;
  // }

  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  game.addToTickerList((deltaTime: number) => {
    const pointerX = pointer.point.x;
    const pointerY = pointer.point.y;

    // Movements
    let xMovOffset = 0;
    let yMoveOffset = 0;
    if (keyboard.isPressed(83)) {
      // S key
      yMoveOffset += player.speed;
    }
    if (keyboard.isPressed(87)) {
      // W key
      yMoveOffset -= player.speed;
    }
    if (keyboard.isPressed(68)) {
      // D key
      xMovOffset += player.speed;
    }
    if (keyboard.isPressed(65)) {
      // A key
      xMovOffset -= player.speed;
    }
    if (xMovOffset !== 0 || yMoveOffset !== 0) {
      game.setAgentDirectionTo(
        player,
        player.position.x + xMovOffset,
        player.position.y + yMoveOffset,
      );
    } else if (joystickData.x !== 0 || joystickData.y !== 0) {
      game.setAgentDirectionTo(
        player,
        player.position.x +
          joystickData.x * (joystickData.power * player.speed),
        player.position.y +
          joystickData.y * (joystickData.power * player.speed),
      );
    }

    if (!isTouch && pointer.isPressed()) {
      // Shoots
      game.tryToShotTo(
        player,
        pointerX - cameraCoords.x,
        pointerY - cameraCoords.y,
      );
    } else if (attackJoystickData.x !== 0 || attackJoystickData.y !== 0) {
      // Shoots
      game.tryToShotTo(
        player,
        player.position.x + attackJoystickData.x * player.width * 10,
        player.position.y + attackJoystickData.y * player.height * 10,
      );
    }

    player.skills.forEach((skill, i) => {
      const skillButtonData = playerSkills[i];

      if (skillButtonData === null) {
        // It is a passive skill.
        return;
      }

      if (keyboard.isPressed(skillButtonData.keyCode)) {
        skill.tryToExecute(game);
      }

      if (skill.secondsToNextRound) {
        skillButtonData.sprites.keyText.visible = false;
        skillButtonData.sprites.cdText.visible = true;
        skillButtonData.sprites.cdText.text = String(skill.secondsToNextRound);
        skillButtonData.sprites.skillImage.alpha = 0.4;
      } else {
        skillButtonData.sprites.keyText.visible = true;
        skillButtonData.sprites.cdText.visible = false;
        skillButtonData.sprites.skillImage.alpha = 1;
      }
    });

    hpText.text = String(player.hp >> 0);

    // ----- Centers the player in the screen -----
    cameraCoords.x =
      -player.position.x + SCREEN_WIDTH / 2 / backgroundContainer.scale.x;
    cameraCoords.y =
      -player.position.y + SCREEN_HEIGHT / 2 / backgroundContainer.scale.x;
    background.position.x = cameraCoords.x;
    background.position.y = cameraCoords.y;

    return false;
  });

  game.on(TRIGGER_AGENT_INVISIBLE, (agent: Agent, invisibility: boolean) => {
    const speed = 0.002;
    let changed = false;
    game.addToTickerList((deltaTime: number) => {
      agent.forEach((e) => {
        if (e.sprite) {
          // Gradually decrease the alpha value of the object
          if (invisibility) {
            e.sprite.alpha -= speed * deltaTime;
          } else {
            e.sprite.alpha += speed * deltaTime;
          }

          // Check if the object has become fully transparent
          if (invisibility && e.sprite.alpha <= 0) {
            changed = true;
          } else if (!invisibility && e.sprite.alpha >= 1) {
            changed = true;
          }
        }
      });
      return changed;
    });
  });

  game.on(
    TRIGGER_EXPLOSION,
    (position: Vector2D, radius: number, team: number) => {
      const explosion = new PIXI.Graphics();
      explosion.beginFill(team === ALLY_TEAM ? 0xffff00 : 0xff0000); // Explosion color
      explosion.drawCircle(0, 0, 10); // Circle with radius 10
      explosion.endFill();
      explosion.x = position.x; // Set explosion x position
      explosion.y = position.y; // Set explosion y position
      explosion.zIndex = 999;

      // Add the explosion to the stage
      background.addChild(explosion);

      sounds['explosion'].play();

      // Animate the explosion
      game.addToTickerList((deltaTime: number) => {
        explosion.width += 1 * deltaTime; // Increase scale on x-axis
        explosion.height += 1 * deltaTime; // Increase scale on y-axis

        if (explosion.width >= radius * 2) {
          // Remove the explosion from the stage
          background.removeChild(explosion);
          return true;
        }

        return false;
      });
    },
  );

  return destroyGame;
}

/**
 * Adds the pause button and its functionality.
 */
function addPauseButton(
  app: PIXI.Application,
  game: Game,
  music: GameSound,
  deviceConfig: DeviceConfig,
  levelKey: levelKey,
  userData: IUserData,
  updateUserData: (data: IUserData) => any,
  onMainMenuClick: () => void,
) {
  // Create the pause button
  const pauseText = PIXI.Texture.from('/img/pause.png');
  const pauseSprite = new PIXI.Sprite(pauseText);
  pauseSprite.width = deviceConfig.pauseSize;
  pauseSprite.height = deviceConfig.pauseSize;
  pauseSprite.anchor.set(0, 1);
  pauseSprite.x = app.renderer.width - pauseSprite.width - 10; // set x position
  pauseSprite.y = pauseSprite.height + 10; // set y position
  pauseSprite.interactive = true; // enable user interaction
  pauseSprite.buttonMode = true;
  pauseSprite.on('pointerdown', showPauseDialog); // add click event listener
  app.stage.addChild(pauseSprite); // add sprite to stage

  game.on(TRIGGER_GAME_PAUSED, (isPaused) => {
    pauseSprite.visible = !isPaused;
  });

  // Create the pause dialog container
  const pauseDialog = new PIXI.Container();
  pauseDialog.zIndex = pauseDialogZIndex;
  pauseDialog.visible = false; // Initially hide the dialog
  app.stage.addChild(pauseDialog);

  // Create the dialog background
  const dialogBackground = new PIXI.Graphics();
  dialogBackground.beginFill(0x000000, 0.5); // Semi-transparent black fill color
  dialogBackground.drawRect(0, 0, app.renderer.width, app.renderer.height); // Draw a rectangle that covers the entire screen
  dialogBackground.endFill();
  pauseDialog.addChild(dialogBackground);

  const buttonsMargin = 10;

  // Create the "Resume" button
  const resumeButton = new PIXI.Graphics();
  resumeButton.beginFill(0x000000); // Black fill color
  resumeButton.drawRoundedRect(
    0,
    0,
    deviceConfig.pauseDialogText * 6,
    deviceConfig.pauseDialogText + 30,
    10,
  ); // Draw a rounded rectangle with a 10px radius
  resumeButton.endFill();
  resumeButton.interactive = true;
  resumeButton.buttonMode = true;
  resumeButton.on('pointerdown', hidePauseDialog); // Hide the pause dialog when the "Resume" button is clicked
  resumeButton.position.set(
    app.renderer.width / 2 - resumeButton.width / 2,
    app.renderer.height / 2 - resumeButton.height - buttonsMargin,
  );
  pauseDialog.addChild(resumeButton);

  // Create the "Resume" button label
  const resumeLabel = new PIXI.Text(getTxt(userData.language!, 'continue'), {
    fill: textColor,
    fontSize: deviceConfig.pauseDialogText,
  });
  resumeLabel.position.set(
    resumeButton.width / 2 - resumeLabel.width / 2,
    resumeButton.height / 2 - resumeLabel.height / 2,
  );
  resumeButton.addChild(resumeLabel);

  // Create the "Main Menu" button
  const mainMenuButton = new PIXI.Graphics();
  mainMenuButton.beginFill(0x000000); // Black fill color
  mainMenuButton.drawRoundedRect(
    0,
    0,
    deviceConfig.pauseDialogText * 6,
    deviceConfig.pauseDialogText + 30,
    10,
  ); // Draw a rounded rectangle with a 10px radius
  mainMenuButton.endFill();
  mainMenuButton.interactive = true;
  mainMenuButton.buttonMode = true;
  mainMenuButton.on('pointerdown', goToMainMenu); // Go to the main menu when the "Main Menu" button is clicked
  mainMenuButton.position.set(
    app.renderer.width / 2 - mainMenuButton.width / 2,
    app.renderer.height / 2 + buttonsMargin,
  );
  pauseDialog.addChild(mainMenuButton);

  // Create the "Main Menu" button label
  const mainMenuLabel = new PIXI.Text(getTxt(userData.language!, 'abandon'), {
    fill: textColor,
    fontSize: deviceConfig.pauseDialogText,
  });
  mainMenuLabel.position.set(
    mainMenuButton.width / 2 - mainMenuLabel.width / 2,
    mainMenuButton.height / 2 - mainMenuLabel.height / 2,
  );
  mainMenuButton.addChild(mainMenuLabel);

  // Function to show the pause dialog
  function showPauseDialog() {
    music.pause(); // Pauses the music
    game.pause(); // Pauses the game loop
    pauseDialog.visible = true; // Show the pause dialog
  }

  // Function to hide the pause dialog
  function hidePauseDialog() {
    music.play(); // Plays the music
    game.unpause(); // Unpauses the game loop
    pauseDialog.visible = false; // Hide the pause dialog
  }

  // Function to go to the main menu
  async function goToMainMenu() {
    const player = game.getPlayer();
    if (player) {
      // Player can be undefined in this case:
      // - The player have lose and then clicked to go to main menu.
      await saveProgress(game, player, false, levelKey, updateUserData);
    }

    onMainMenuClick();
  }
}

/**
 * Adds the Joysticks.
 */
function addJoysticks(
  app: PIXI.Application,
  deviceConfig: DeviceConfig,
  userData: IUserData,
  joystickData: any,
  attackJoystickData: any,
) {
  const joystick = new Joystick({
    inner: PIXI.Sprite.from(textures['joystick-inner-move']),

    innerScale: {
      x: 1 * userData.joystickScale,
      y: 1 * userData.joystickScale,
    },

    outerScale: {
      x: deviceConfig.joystickScale * userData.joystickScale,
      y: deviceConfig.joystickScale * userData.joystickScale,
    },

    onChange: (data) => {
      // console.log(data.angle); // Angle from 0 to 360
      // console.log(data.direction); // 'left', 'top', 'bottom', 'right', 'top_left', 'top_right', 'bottom_left' or 'bottom_right'.
      // console.log(data.power); // Power from 0 to 1

      const radians = degreesToRadians(data.angle);

      const x = Math.cos(radians);
      const y = -Math.sin(radians);

      joystickData.x = x;
      joystickData.y = y;
      joystickData.power = data.power;
    },

    onStart: () => {},

    onEnd: () => {
      joystickData.x = 0;
      joystickData.y = 0;
    },
  });
  joystick.position.x = deviceConfig.joystickMargin * userData.joystickScale;
  joystick.position.y =
    SCREEN_HEIGHT - deviceConfig.joystickMargin * userData.joystickScale;

  app.stage.addChild(joystick);
  const attackJoystick = new Joystick({
    inner: PIXI.Sprite.from(textures['joystick-inner-attack']),

    innerScale: {
      x: 1 * userData.joystickScale,
      y: 1 * userData.joystickScale,
    },

    outerScale: {
      x: deviceConfig.joystickScale * userData.joystickScale,
      y: deviceConfig.joystickScale * userData.joystickScale,
    },

    onChange: (data) => {
      const radians = degreesToRadians(data.angle);

      const x = Math.cos(radians);
      const y = -Math.sin(radians);

      attackJoystickData.x = x;
      attackJoystickData.y = y;
    },

    onStart: () => {},

    onEnd: () => {
      attackJoystickData.x = 0;
      attackJoystickData.y = 0;
    },
  });
  attackJoystick.position.x =
    SCREEN_WIDTH - deviceConfig.joystickMargin * userData.joystickScale;
  attackJoystick.position.y =
    SCREEN_HEIGHT - deviceConfig.joystickMargin * userData.joystickScale;

  app.stage.addChild(attackJoystick);
}

/**
 * Saves the progress to the store.
 */
async function saveProgress(
  game: Game,
  player: Agent,
  hasWon: boolean,
  levelKey: levelKey,
  updateUserData: (data: IUserData) => any,
) {
  const userData = await getUserData();

  if (levelKey === 'survival') {
    // ----- Saves the survival enemies defeated record. -----
    userData.survivalRecord.enemiesDefeated = Math.max(
      player.agentsDefeated,
      userData.survivalRecord.enemiesDefeated,
    );

    // ----- Saves the survival wave record. -----
    userData.survivalRecord.wave = Math.max(
      game.waveNumber,
      userData.survivalRecord.wave,
    );
  }

  // Adds exp to the player
  userData.character.exp += player.expGained;
  userData.character.coins += player.expGained;
  player.expGained = 0;

  if (hasWon) {
    if (!userData.finishedLevels.includes(levelKey)) {
      // Saves the level as finished.
      userData.finishedLevels.push(levelKey);
    }
  }

  return updateUserData(userData);
}
