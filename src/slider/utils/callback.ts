export function callback(fn?: CallableFunction, delay?: number):void {
  if (!fn) {
    return;
  }

  if (delay === undefined) {
    fn();
    return;
  }

  setTimeout(fn, ~~delay);
}
