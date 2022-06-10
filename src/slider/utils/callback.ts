export function callback(fn?: CallableFunction):void {
  if (!fn) {
    return;
  }
  fn();
}
