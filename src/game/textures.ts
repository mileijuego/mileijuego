import * as PIXI from 'pixi.js';

// Disables the sprite smoothing
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

interface ITextures {
  [key: string]: PIXI.Texture;
}

const textures: ITextures = {
  // Agents
  milei: PIXI.Texture.from('/img/milei.png'),
  'milei-super-libertarian': PIXI.Texture.from(
    '/img/milei-super-libertarian.png',
  ),
  'milei-jacket': PIXI.Texture.from('/img/milei-jacket.png'),
  'milei-divine': PIXI.Texture.from('/img/milei-divine.png'),
  alberso: PIXI.Texture.from('/img/alberso.png'),
  pibi: PIXI.Texture.from('/img/pibi.png'),
  ofe: PIXI.Texture.from('/img/ofe.png'),
  'libertarian-lion': PIXI.Texture.from('/img/libertarian-lion.png'),
  larrata: PIXI.Texture.from('/img/larrata.png'),
  'old-lady': PIXI.Texture.from('/img/old-lady.png'),
  gorilla: PIXI.Texture.from('/img/gorilla.png'),
  crisistina: PIXI.Texture.from('/img/crisistina.png'),
  'crisistina-devil': PIXI.Texture.from('/img/crisistina-devil.png'),
  'fat-campodist': PIXI.Texture.from('/img/fat-campodist.png'),
  'golden-fat-campodist': PIXI.Texture.from('/img/golden-fat-campodist.png'),
  // Central bank pack
  'central-bank': PIXI.Texture.from('/img/central-bank-pack/central-bank.png'),
  'central-bank-alberso': PIXI.Texture.from(
    '/img/central-bank-pack/central-bank-alberso.png',
  ),
  'central-bank-larrata': PIXI.Texture.from(
    '/img/central-bank-pack/central-bank-larrata.png',
  ),
  'central-bank-crisistina': PIXI.Texture.from(
    '/img/central-bank-pack/central-bank-crisistina.png',
  ),
  'central-bank-crisistina-devil': PIXI.Texture.from(
    '/img/central-bank-pack/central-bank-crisistina-devil.png',
  ),
  'larrata-fire-head': PIXI.Texture.from(
    '/img/central-bank-pack/larrata-fire-head.png',
  ),
  'chori-ministry': PIXI.Texture.from(
    '/img/central-bank-pack/chori-ministry.png',
  ),
  'dialog-ministry': PIXI.Texture.from(
    '/img/central-bank-pack/dialog-ministry.png',
  ),
  'pibi-ministry': PIXI.Texture.from(
    '/img/central-bank-pack/pibi-ministry.png',
  ),
  expert: PIXI.Texture.from('/img/central-bank-pack/expert.png'),
  kicilove: PIXI.Texture.from('/img/central-bank-pack/kicilove.png'),
  gabois: PIXI.Texture.from('/img/central-bank-pack/gabois.png'),
  'worker-man': PIXI.Texture.from('/img/worker-man.png'),
  'worker-woman': PIXI.Texture.from('/img/worker-woman.png'),
  bullshit: PIXI.Texture.from('/img/bullshit.png'),
  bulldog: PIXI.Texture.from('/img/bulldog.png'),
  masgloton: PIXI.Texture.from('/img/masgloton.png'),
  maslaboy: PIXI.Texture.from('/img/maslaboy.png'),
  'gordo-mortero': PIXI.Texture.from('/img/gabois-pack/gordo-mortero.png'),
  hater: PIXI.Texture.from('/img/hater.png'),
  alien: PIXI.Texture.from('/img/alien-pack/alien.png'),
  'mini-alien': PIXI.Texture.from('/img/alien-pack/mini-alien.png'),
  sylvester: PIXI.Texture.from('/img/sylvester.png'),
  npc: PIXI.Texture.from('/img/alien-pack/npc.png'),
  gleta: PIXI.Texture.from('/img/alien-pack/gleta.png'),
  'heaven-man': PIXI.Texture.from('/img/heaven-man.png'),
  'heaven-woman': PIXI.Texture.from('/img/heaven-woman.png'),
  luladrao: PIXI.Texture.from('/img/luladrao-pack/luladrao.png'),
  'br-ofe': PIXI.Texture.from('/img/luladrao-pack/br-ofe.png'),
  'br-pibi': PIXI.Texture.from('/img/luladrao-pack/br-pibi.png'),
  momb: PIXI.Texture.from('/img/momb.png'),

  // Projectiles
  'projectile-bullet': PIXI.Texture.from('/img/projectile-bullet.png'),
  'projectile-bitcoin': PIXI.Texture.from('/img/projectile-bitcoin.png'),
  'projectile-balloon': PIXI.Texture.from('/img/projectile-balloon.png'),
  'projectile-balloon-fire': PIXI.Texture.from(
    '/img/projectile-balloon-fire.png',
  ),
  'projectile-green-heart': PIXI.Texture.from(
    '/img/projectile-green-heart.png',
  ),
  'projectile-pink-heart': PIXI.Texture.from('/img/projectile-pink-heart.png'),
  'projectile-e': PIXI.Texture.from('/img/projectile-e.png'),
  'projectile-kkk': PIXI.Texture.from('/img/projectile-kkk.png'),
  'projectile-tile': PIXI.Texture.from('/img/projectile-tile.png'),
  'projectile-snake': PIXI.Texture.from('/img/projectile-snake.png'),
  'projectile-gnocchi': PIXI.Texture.from('/img/projectile-gnocchi.png'),
  'projectile-banana': PIXI.Texture.from('/img/projectile-banana.png'),
  'projectile-pamy': PIXI.Texture.from('/img/projectile-pamy.png'),
  'projectile-v': PIXI.Texture.from('/img/projectile-v.png'),
  'projectile-chori': PIXI.Texture.from('/img/projectile-chori.png'),
  'projectile-costillar': PIXI.Texture.from('/img/projectile-costillar.png'),
  'projectile-little-golden-chori': PIXI.Texture.from(
    '/img/projectile-little-golden-chori.png',
  ),
  'projectile-golden-chori': PIXI.Texture.from(
    '/img/projectile-golden-chori.png',
  ),
  'projectile-power-ball': PIXI.Texture.from('/img/projectile-power-ball.png'),
  'projectile-1000p': PIXI.Texture.from('/img/projectile-1000p.png'),
  'projectile-shovel': PIXI.Texture.from('/img/projectile-shovel.png'),
  'projectile-shovel-gold': PIXI.Texture.from(
    '/img/projectile-shovel-gold.png',
  ),
  'projectile-shovel-ice': PIXI.Texture.from('/img/projectile-shovel-ice.png'),
  'projectile-shovel-fire': PIXI.Texture.from(
    '/img/projectile-shovel-fire.png',
  ),
  'projectile-divine-shovel': PIXI.Texture.from(
    '/img/projectile-divine-shovel.png',
  ),
  'projectile-orb-chori-ice': PIXI.Texture.from(
    '/img/projectile-orb-chori-ice.png',
  ),
  'projectile-chori-ice': PIXI.Texture.from('/img/projectile-chori-ice.png'),
  'projectile-proceda': PIXI.Texture.from('/img/projectile-proceda.png'),
  'projectile-gordo-mortero': PIXI.Texture.from(
    '/img/gabois-pack/projectile-gordo-mortero.png',
  ),
  'projectile-tear': PIXI.Texture.from('/img/projectile-tear.png'),
  'projectile-book': PIXI.Texture.from('/img/projectile-book.png'),
  'projectile-mask': PIXI.Texture.from('/img/projectile-mask.png'),
  'projectile-angry': PIXI.Texture.from('/img/projectile-angry.png'),
  'projectile-happy': PIXI.Texture.from('/img/projectile-happy.png'),
  'projectile-currenthing': PIXI.Texture.from(
    '/img/projectile-currenthing.png',
  ),
  'projectile-l': PIXI.Texture.from('/img/luladrao-pack/projectile-l.png'),
  'projectile-wine': PIXI.Texture.from('/img/projectile-wine.png'),

  // Weapons
  bitgun: PIXI.Texture.from('/img/bitgun.png'),
  'libertarian-staff-normal': PIXI.Texture.from(
    '/img/libertarian-staff-normal.png',
  ),
  'libertarian-staff-gold': PIXI.Texture.from(
    '/img/libertarian-staff-gold.png',
  ),
  'libertarian-staff-ice': PIXI.Texture.from('/img/libertarian-staff-ice.png'),
  'libertarian-staff-fire': PIXI.Texture.from(
    '/img/libertarian-staff-fire.png',
  ),
  'divine-staff': PIXI.Texture.from('/img/divine-staff.png'),
  'gordo-mortero-gun': PIXI.Texture.from(
    '/img/gabois-pack/gordo-mortero-gun.png',
  ),
  'hater-gun': PIXI.Texture.from('/img/hater-gun.png'),
  'alien-gun': PIXI.Texture.from('/img/alien-pack/alien-gun.png'),

  // Walls
  'wall-pot': PIXI.Texture.from('/img/pot.png'),
  'wall-central-bank-pot': PIXI.Texture.from(
    '/img/central-bank-pack/central-bank-pot.png',
  ),
  'wall-alien': PIXI.Texture.from('/img/alien-pack/wall-alien.png'),
  'wall-alien2': PIXI.Texture.from('/img/alien-pack/wall-alien2.png'),
  'wall-alien3': PIXI.Texture.from('/img/alien-pack/wall-alien3.png'),
  'wall-alien4': PIXI.Texture.from('/img/alien-pack/wall-alien4.png'),

  // Items
  'item-money': PIXI.Texture.from('/img/item-money.png'),
  'item-bag': PIXI.Texture.from('/img/item-bag.png'),

  // Shields
  'shield-projectile-reflector': PIXI.Texture.from(
    '/img/shield-projectile-reflector.png',
  ),
  'shield-projectile-blocker': PIXI.Texture.from(
    '/img/shield-projectile-blocker.png',
  ),
  'shield-projectile-healer': PIXI.Texture.from(
    '/img/shield-projectile-healer.png',
  ),

  // Joystick
  'joystick-inner-move': PIXI.Texture.from(
    '/img/joystick/joystick-inner-move.png',
  ),
  'joystick-inner-attack': PIXI.Texture.from(
    '/img/joystick/joystick-inner-attack.png',
  ),

  // Others
  key: PIXI.Texture.from('/img/key.png'),
  tile: PIXI.Texture.from('/img/tile.png'),
};

export default textures;
