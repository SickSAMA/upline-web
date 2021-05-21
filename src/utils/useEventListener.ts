import { useEffect, useRef } from 'react';

export default function useEventListener(eventName: string | string[], handler: EventListener, element: HTMLElement | null): void {
  // Create a ref that stores handler
  const savedHandler = useRef<EventListener>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
      () => {
        if (!element) {
          return;
        }

        // Make sure element supports addEventListener
        const isSupported = element && element.addEventListener;
        if (!isSupported) {
          return;
        }

        // Create event listener that calls handler function stored in ref
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const eventListener: EventListener = (event) => savedHandler.current!(event);

        const eventNames = Array.isArray(eventName) ? eventName : [eventName];

        // Add event listener
        eventNames.forEach((name) => {
          element.addEventListener(name, eventListener);
        });

        // Remove event listener on cleanup
        return () => {
          eventNames.forEach((name) => {
            element.removeEventListener(name, eventListener);
          });
        };
      },
      [eventName, element], // Re-run if eventName or element changes
  );
}
