import DivineStaff from './divine-staff';
import LibertarianStaffFire from './libertarian-staff-fire';
import LibertarianStaffGold from './libertarian-staff-gold';
import LibertarianStaffIce from './libertarian-staff-ice';
import LibertarianStaffNormal from './libertarian-staff-normal';

const weaponMap = {
  'libertarian-staff-normal': LibertarianStaffNormal,
  'libertarian-staff-gold': LibertarianStaffGold,
  'libertarian-staff-fire': LibertarianStaffFire,
  'libertarian-staff-ice': LibertarianStaffIce,
  'divine-staff': DivineStaff,
};

export type weaponKey = keyof typeof weaponMap;

export { weaponMap };
