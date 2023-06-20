import { getDefaultUserData, isLevelPlayable } from './local-storage';

describe('getDefaultUserData', () => {
  it('should have 0 as the default exp and coins', () => {
    const userData = getDefaultUserData();
    expect(userData.character.exp).toBe(0);
    expect(userData.character.coins).toBe(0);
  });
});

describe('isLevelPlayable', () => {
  const levels = {
    level1: {},
    level2: {},
    level3: {},
    level4: {},
    level5: {},
  };

  const finishedLevels = ['level1', 'level3'];

  it('should return true since have finished level1 and level3', () => {
    expect(isLevelPlayable(levels, 'level2', finishedLevels)).toBe(true);
  });

  it('should return true for the first finished level', () => {
    expect(isLevelPlayable(levels, 'level1', finishedLevels)).toBe(true);
  });

  it('should return true for a finished level with a previous finished level', () => {
    expect(isLevelPlayable(levels, 'level3', finishedLevels)).toBe(true);
  });

  it('should return true because it has finished the level3', () => {
    expect(isLevelPlayable(levels, 'level4', finishedLevels)).toBe(true);
  });

  it('should return true because it has not finished the level4', () => {
    expect(isLevelPlayable(levels, 'level5', finishedLevels)).toBe(false);
  });

  it('should return true for a level with finished levels ahead', () => {
    expect(
      isLevelPlayable(levels, 'level2', ['level1', 'level2', 'level5']),
    ).toBe(true);
  });

  it('should allow not sorted finished levels', () => {
    expect(isLevelPlayable(levels, 'level2', ['level3', 'level1'])).toBe(true);
  });

  it('should allow the first of all categories', () => {
    const lvls = {
      level1: { category: 'a' },
      level2: { category: 'a' },
      level3: { category: 'a' },
      level4: { category: 'b' },
      level5: { category: 'b' },
    };

    expect(isLevelPlayable(lvls, 'level1', [])).toBe(true);
    expect(isLevelPlayable(lvls, 'level2', [])).toBe(false);
    expect(isLevelPlayable(lvls, 'level3', [])).toBe(false);
    expect(isLevelPlayable(lvls, 'level4', [])).toBe(true);
    expect(isLevelPlayable(lvls, 'level5', [])).toBe(false);
  });
});
