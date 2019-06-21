/**
 * DelayedTask
 *
 * Given a function/callback and time, after time ms has elapsed, call the function.
 * The timer can be set again before the countdown is complete, deferring the callback
 * for additional time.
 *
 */
class DelayedTask {
  constructor(fn, time) {
    this.fn = fn;
    this.timer = setTimeout(this.fn, time);
  }
  defer(time) {
    this.cancel();
    this.timer = setTimeout(this.fn, time);
  }
  cancel() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

//
export default DelayedTask;
