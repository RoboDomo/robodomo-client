const DelayedTask = (fn, time) => {
  let timer = setTimeout(fn, time);
  this.defer = time => {
    this.cancel();
    timer = setTimeout(fn, time);
  };
  this.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
};
export default DelayedTask;
