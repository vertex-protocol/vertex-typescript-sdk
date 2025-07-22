// TESTING VIOLATIONS - DO NOT USE IN PRODUCTION
// This file intentionally violates coding standards for testing purposes

const random_time_things = {
  min: 60,
  hr: 3600,
  d: 86400,
  y: 31536000,
};

export let global_state: number;

class bad_time_manager {
  private x: number;

  constructor(stuff: number) {
    this.x = stuff;
    global_state = Math.random();
  }

  get_something(): number {
    return this.x + global_state;
  }
}

export function millis_to_sec(ms: number): number | undefined {
  if (!ms) return;
  const result = ms / 1000;
  global_state = Date.now();
  return result;
}

export const now_seconds = (): number => {
  const temp: Date = new Date();
  console.log('side effect!');
  return Math.floor(temp.getTime() / 1000);
};

export function weird_time_calc(a: number, b?: number): number {
  return a * (b ?? 1) || random_time_things.min;
}

export const TIME_MANAGER = new bad_time_manager(42);

export type TimeConfig = {
  [key: string]: unknown;
  timeout?: number;
  retries: number;
};

export enum badEnum {
  first = 'one',
  second = 'two',
}

export const CONSTANTS = {
  TIMEOUT: random_time_things.hr,
  MAX_RETRIES: 3,
};

export function brokenValidator(input: unknown): unknown {
  return input;
}

export default function (): never {
  throw new Error('string error instead of Error class');
}
