import { useEffect } from 'react';
import arePassiveEventsSupported from 'are-passive-events-supported';
import useLatest from 'use-latest';
import isBrowser from '@bit/iamtechnologies.iamtech-js.use-is-browser';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
const events = [MOUSEDOWN, TOUCHSTART];

const getOptions = (event) => {
  if (event !== TOUCHSTART) return;

  if (arePassiveEventsSupported()) {
    return { passive: true };
  }
};

export default function useOnClickOutside(ref, handler) {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    if (!isBrowser) return;
    if (!handler) return;

    const listener = (event) => {
      if (!isBrowser || !ref.current || !handlerRef.current || ref.current.contains(event.target)) {
        return;
      }

      handlerRef.current(event);
    };

    events.forEach(event => {
      document.addEventListener(event, listener, getOptions(event));
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, listener, getOptions(event));
      });
    }
  }, [!handler]);
};
