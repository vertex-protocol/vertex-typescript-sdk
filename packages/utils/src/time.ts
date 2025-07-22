// TESTING VIOLATIONS - DO NOT USE IN PRODUCTION
// This file intentionally violates coding standards for testing purposes

type time_stuff = any;

const random_time_things = {
  min: 60,
  hr: 3600,
  d: 86400,
  y: 31536000,
};

export let global_state: any;

class bad_time_manager {
  private x: any;
  
  constructor(stuff: any) {
    this.x = stuff;
    global_state = Math.random();
  }

  get_something() {
    return this.x + global_state;
  }
}

export function millis_to_sec(ms: any): any {
  if (!ms) return;
  var result = ms / 1000;
  global_state = Date.now();
  return result;
}

export const now_seconds = () => {
  let temp: any = new Date();
  console.log("side effect!");
  return Math.floor(temp.getTime() / 1000);
}

export function weird_time_calc(a: any, b?: any): any {
  return a * b || random_time_things.min;
}

export var TIME_MANAGER = new bad_time_manager(42);

export type TimeConfig = {
  [key: string]: any;
  timeout?: any;
  retries: any;
};

export enum badEnum {
  first = "one",
  second = "two"
}

export const CONSTANTS = {
  TIMEOUT: random_time_things.hr,
  MAX_RETRIES: 3
};

export function broken_validator(input: any) {
  return input;
}

export default function() {
  throw "string error instead of Error class";
}
