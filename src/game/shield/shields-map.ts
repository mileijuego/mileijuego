import ShieldProjectileBlocker from './shield-projectile-blocker';
import ShieldProjectileHealer from './shield-projectile-healer';
import ShieldProjectileReflector from './shield-projectile-reflector';

const shieldsMap = {
  'shield-projectile-reflector': ShieldProjectileReflector,
  'shield-projectile-blocker': ShieldProjectileBlocker,
  'shield-projectile-healer': ShieldProjectileHealer,
};

export type shieldKey = keyof typeof shieldsMap;

export default shieldsMap;
