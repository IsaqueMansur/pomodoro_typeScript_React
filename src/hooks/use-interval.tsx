import { useRef, useEffect } from 'react'; //eslint-disable-line

export default function useInterval<C extends CallableFunction>(
  callback: C,
  delay: number | null,
):
  void {
  const savedCallback = useRef<C>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => { //eslint-disable-line
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
