import {
  calculateLevel,
  calculateExp,
  resetSkillPoints,
  Character,
} from './character';

const tests = [
  { exp: 0, level: 1 },
  { exp: 500, level: 2 },
  { exp: 1000, level: 3 },
  { exp: 2000, level: 4 },
  { exp: 4000, level: 5 },
  { exp: 8000, level: 6 },
  { exp: 16000, level: 7 },
  { exp: 32000, level: 8 },
  { exp: 64000, level: 9 },
  { exp: 128000, level: 10 },
];
const baseExp = 500;

describe('calculateLevel', () => {
  tests.forEach((test, i) => {
    it(`should return the correct level based on its experience ${i}`, () => {
      expect(calculateLevel(test.exp, baseExp)).toBe(test.level);
    });
  });
});

describe('calculateExp', () => {
  tests.forEach((test, i) => {
    it(`should return the correct experience based on its level ${i}`, () => {
      expect(calculateExp(test.level, baseExp)).toBe(test.exp);
    });
  });
});

describe('resetSkillPoints', () => {
  it('should only reset the skill points', () => {
    const char: Character = {
      exp: 560,
      coins: 870,
      skills: [
        { skillKey: 'despertar-leones', points: 0 },
        { skillKey: 'libertad-avanza', points: 5 },
        { skillKey: 'zurdos-tiemblen', points: 7 },
        { skillKey: 'milei-porquenotevas', points: 0 },
        { skillKey: 'libertarian-shield', points: 10 },
        { skillKey: 'multiple-shot', points: 1 },
      ],
      inventory: {
        armors: {
          suit: 2,
          'libertarian-armor': 1,
          'leather-jacket': 0,
        },
        weapons: {
          'libertarian-staff-normal': 2,
          'libertarian-staff-gold': 2,
          'libertarian-staff-fire': 0,
          'libertarian-staff-ice': 1,
        },
      },
    };

    resetSkillPoints(char);

    expect(char).toEqual({
      exp: 560,
      coins: 870,
      skills: [
        { skillKey: 'despertar-leones', points: 0 },
        { skillKey: 'libertad-avanza', points: 0 },
        { skillKey: 'zurdos-tiemblen', points: 0 },
        { skillKey: 'milei-porquenotevas', points: 0 },
        { skillKey: 'libertarian-shield', points: 0 },
        { skillKey: 'multiple-shot', points: 0 },
      ],
      inventory: {
        armors: {
          suit: 2,
          'libertarian-armor': 1,
          'leather-jacket': 0,
        },
        weapons: {
          'libertarian-staff-normal': 2,
          'libertarian-staff-gold': 2,
          'libertarian-staff-fire': 0,
          'libertarian-staff-ice': 1,
        },
      },
    });
  });
});
