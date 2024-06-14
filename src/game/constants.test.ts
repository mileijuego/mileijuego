import { MockStorage } from '@src/utils/storage.mock';

jest.mock('@ionic/storage', () => ({
  Storage: MockStorage,
}));

import { GOD_MODE, UNLOCK_LEVELS } from './constants';

describe('Constants', () => {
  it('should be false on production.', () => {
    expect(GOD_MODE).toBe(false);
    expect(UNLOCK_LEVELS).toBe(false);
  });
});
