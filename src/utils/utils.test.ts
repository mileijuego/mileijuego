import { formatNumber, mergeObjects } from './utils';

describe('mergeObjects', () => {
  test('with new skills', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: ['alberso'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 10000008800,
        coins: 8810,
        skills: [
          { skillKey: 'despertar-leones', points: 13 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 10 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: ['alberso'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 10000008800,
        coins: 8810,
        skills: [
          { skillKey: 'despertar-leones', points: 13 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 10 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });

  test('should use the save exp', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: ['alberso'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 10000008800,
        coins: 8810,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: ['alberso'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 10000008800,
        coins: 8810,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });

  test('Should save the finished levels 1', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [{ skillKey: 'despertar-leones', points: 0 }],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
          },
        },
      },
    };

    const source = {
      finishedLevels: ['alberso'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 1000,
        coins: 500,
        skills: [{ skillKey: 'despertar-leones', points: 0 }],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: ['alberso'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 1000,
        coins: 500,
        skills: [{ skillKey: 'despertar-leones', points: 0 }],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
          },
        },
      },
    });
  });

  test('Should save the finished levels 2', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: ['alberso', 'larrata'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100011386,
        coins: 99881386,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: ['alberso', 'larrata'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100011386,
        coins: 99881386,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });

  test('Should save the finished levels 3', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: ['alberso', 'larrata', 'masgloton'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100017386,
        coins: 99887386,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: ['alberso', 'larrata', 'masgloton'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100017386,
        coins: 99887386,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });

  test('Should save the finished levels 4', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: ['alberso', 'larrata', 'masgloton', 'crisistina'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100037426,
        coins: 99907426,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: ['alberso', 'larrata', 'masgloton', 'crisistina'],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100037426,
        coins: 99907426,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });

  test('Should save the finished levels 5', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 0,
        coins: 0,
        skills: [
          { skillKey: 'despertar-leones', points: 0 },
          { skillKey: 'libertad-avanza', points: 0 },
          { skillKey: 'zurdos-tiemblen', points: 0 },
          { skillKey: 'milei-porquenotevas', points: 0 },
          { skillKey: 'libertarian-shield', points: 0 },
          { skillKey: 'multiple-shot', points: 0 },
        ],
        inventory: {
          armors: { suit: 1, 'libertarian-armor': 0, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: [
        'alberso',
        'larrata',
        'masgloton',
        'crisistina',
        'central-bank',
      ],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100088485,
        coins: 99958485,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: [
        'alberso',
        'larrata',
        'masgloton',
        'crisistina',
        'central-bank',
      ],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100088485,
        coins: 99958485,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });

  test('Should not reset the character if it receives new props', () => {
    const target = {
      finishedLevels: [],
      joystickScale: 1,
      mutedVolume: false,
      survivalRecord: {
        wave: 0,
        enemiesDefeated: 0,
      },
      character: {
        exp: 0,
        coins: 0,
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
            suit: 1,
            'libertarian-armor': 0,
            'leather-jacket': 0,
          },
          weapons: {
            'libertarian-staff-normal': 1,
            'libertarian-staff-gold': 0,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const source = {
      finishedLevels: [
        'alberso',
        'larrata',
        'masgloton',
        'crisistina',
        'central-bank',
      ],
      joystickScale: 1,
      mutedVolume: false,
      character: {
        exp: 100088485,
        coins: 99958485,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    };

    const mergedData = mergeObjects(target, source);

    expect(mergedData).toEqual({
      finishedLevels: [
        'alberso',
        'larrata',
        'masgloton',
        'crisistina',
        'central-bank',
      ],
      joystickScale: 1,
      mutedVolume: false,
      survivalRecord: {
        wave: 0,
        enemiesDefeated: 0,
      },
      character: {
        exp: 100088485,
        coins: 99958485,
        skills: [
          { skillKey: 'despertar-leones', points: 7 },
          { skillKey: 'libertad-avanza', points: 1 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 2 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 7 },
        ],
        inventory: {
          armors: { suit: 2, 'libertarian-armor': 1, 'leather-jacket': 0 },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
          },
        },
      },
    });
  });
});

describe('formatNumber', () => {
  const tests = [
    { input: 0, output: '0' },
    { input: 5, output: '5' },
    { input: 9999, output: '9999' },
    { input: 10000, output: '10K' },
    { input: 10500, output: '10.5K' },
    { input: 99999, output: '99.9K' },
    { input: 1234567, output: '1.2M' },
    { input: 9999999, output: '9.9M' },
    { input: 87154321, output: '87.1M' },
    { input: 987654321, output: '987.6M' },
    { input: 1234567890, output: '1.2B' },
  ];

  tests.forEach((t, i) => {
    it(`should return the correct value ${i}`, () => {
      expect(formatNumber(t.input)).toBe(t.output);
    });
  });
});
