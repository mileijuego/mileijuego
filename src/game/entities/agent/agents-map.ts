import Alberso from './alberso';
import Crisistina from './crisistina';
import CrisistinaDevil from './crisistina-devil';
import CrisistinaDevilClone from './crisistina-devil-clone';
import Gorilla from './gorilla';
import Larrata from './larrata';
import LibertarianLion from './libertarian-lion';
import Milei from './milei';
import Ofe, { OfeProjectile } from './ofe';
import OldLady from './old-lady';
import Pibi, { PibiProjectile } from './pibi';
import FatCampodist from './fat-campodist';
import GoldenFatCampodist from './golden-fat-campodist';
import CentralBank from './central-bank-pack/central-bank';
import ChoriMinistry from './central-bank-pack/ministry/chori-ministry';
import DialogMinistry from './central-bank-pack/ministry/dialog-ministry';
import PibiMinistry from './central-bank-pack/ministry/pibi-ministry';
import CentralBankAlberso from './central-bank-pack/central-bank-alberso';
import CentralBankLarrata from './central-bank-pack/central-bank-larrata';
import LarrataFireHead from './central-bank-pack/larrata-head';
import AgentWorker from './worker';
import Expert from './central-bank-pack/expert';
import Kicilove from './central-bank-pack/kicilove';
import Gabois from './central-bank-pack/gabois';
import CentralBankCrisistina from './central-bank-pack/central-bank-crisistina';
import CentralBankCrisistinaDevil from './central-bank-pack/central-bank-crisistina-devil';
import Masgloton from './masgloton';
import Maslaboy from './maslaboy';
import WallPot from './wall/pot';
import WallCentralBankPot from './wall/central-bank-pot';
import GordoMortero from './gabois-pack/gordo-mortero';
import Hater from './hater';
import Alien from './alien-pack/alien';
import WallAlien from './wall/wall-alien';
import WallAlien2 from './wall/wall-alien2';
import WallAlien3 from './wall/wall-alien3';
import WallAlien4 from './wall/wall-alien4';
import Sylvester from './sylvester';
import MiniAlien from './alien-pack/mini-alien';
import Npc from './alien-pack/npc';
import HeavenSoldier from './alien-pack/heaven-soldier';
import Gleta from './alien-pack/gleta';
import Luladrao from './luladrao-pack/luladrao';
import BrOfe from './luladrao-pack/br-ofe';
import BrPibi from './luladrao-pack/br-pibi';
import Bullshit from './bullshit';
import Bulldog from './bulldog';
import Momb from './momb';
import Lali from './lali';

const agentsMap = {
  alberso: Alberso,
  gorilla: Gorilla,
  larrata: Larrata,
  'libertarian-lion': LibertarianLion,
  milei: Milei,
  hater: Hater,
  ofe: Ofe,
  lali: Lali,
  'old-lady': OldLady,
  pibi: Pibi,
  crisistina: Crisistina,
  'crisistina-devil': CrisistinaDevil,
  'crisistina-devil-clone': CrisistinaDevilClone,
  'fat-campodist': FatCampodist,
  'golden-fat-campodist': GoldenFatCampodist,

  bullshit: Bullshit,
  bulldog: Bulldog,
  momb: Momb,

  masgloton: Masgloton,
  maslaboy: Maslaboy,

  'gordo-mortero': GordoMortero,

  // Central bank entities
  'central-bank': CentralBank,
  'chori-ministry': ChoriMinistry,
  'dialog-ministry': DialogMinistry,
  'pibi-ministry': PibiMinistry,
  'central-bank-alberso': CentralBankAlberso,
  'central-bank-larrata': CentralBankLarrata,
  'central-bank-crisistina': CentralBankCrisistina,
  'central-bank-crisistina-devil': CentralBankCrisistinaDevil,
  'larrata-fire-head': LarrataFireHead,
  expert: Expert,
  kicilove: Kicilove,
  gabois: Gabois,
  worker: AgentWorker,
  sylvester: Sylvester,

  // Alien pack
  alien: Alien,
  'mini-alien': MiniAlien,
  npc: Npc,
  'heaven-soldier': HeavenSoldier,
  'pibi-projectile': PibiProjectile,
  'ofe-projectile': OfeProjectile,
  gleta: Gleta,

  // Luladrao pack
  luladrao: Luladrao,
  'br-ofe': BrOfe,
  'br-pibi': BrPibi,

  // Walls
  'wall-pot': WallPot,
  'wall-central-bank-pot': WallCentralBankPot,
  'wall-alien': WallAlien,
  'wall-alien2': WallAlien2,
  'wall-alien3': WallAlien3,
  'wall-alien4': WallAlien4,
};

export type agentKey = keyof typeof agentsMap;

export default agentsMap;
