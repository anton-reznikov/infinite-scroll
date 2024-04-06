export function throttle(callee: (...args: any) => void, timeout: number) {
  let timer: any = null;

  return function perform(...args: any) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
