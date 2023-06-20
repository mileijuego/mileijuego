import sounds, { soundKey } from '../game/sounds';

export function isCloseTo(
  number: number,
  target: number,
  tolerance: number,
): boolean {
  return Math.abs(number - target) <= tolerance;
}

export function mergeObjects(
  target: Record<string, any>,
  source: Record<string, any>,
): Record<string, any> {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeObjects(target[key], source[key]);
        }
      } else if (Array.isArray(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          const keyPropertyName = getKeyPropertyName(target[key]);
          output[key] = mergeArrays(target[key], source[key], keyPropertyName);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

function getKeyPropertyName(arr: any[]): string | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  const firstItem = arr[0];
  return Object.keys(firstItem)[0];
}

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeArrays(
  target: any[],
  source: any[],
  keyPropertyName?: string,
): any[] {
  const merged = [...target];

  source.forEach((item) => {
    const existingItem = merged.find(
      (el) => el[keyPropertyName!] === item[keyPropertyName!],
    );
    if (existingItem && isObject(existingItem)) {
      Object.assign(existingItem, item);
    } else {
      merged.push(item);
    }
  });

  return merged;
}

export function hexToNumber(hexColor: string): number {
  // Remove the "#" symbol from the hex color string
  const hex = hexColor.replace('#', '');

  // Convert the hex color string to a number
  const number = parseInt(hex, 16);

  return number;
}

export function getDifference(a: number, b: number): number {
  const absoluteA = Math.abs(a);
  const absoluteB = Math.abs(b);
  return Math.abs(absoluteA - absoluteB);
}

export function playOnceLoaded(sndKey: soundKey) {
  const snd = sounds[sndKey];
  snd.once('load', () => snd.play());
  snd.load();
  return snd;
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return formatDecimal(num, 1000000000, 'B');
  }
  if (num >= 1000000) {
    return formatDecimal(num, 1000000, 'M');
  }
  if (num >= 10000) {
    return formatDecimal(num, 1000, 'K');
  }
  return num.toString();
}

function formatDecimal(num: number, divisor: number, suffix: string): string {
  const divided = num / divisor;
  const int = Math.floor(divided).toString();
  const decimals = divided.toString().split('.')[1];

  return decimals ? int + '.' + decimals[0] + suffix : int + suffix;
}
