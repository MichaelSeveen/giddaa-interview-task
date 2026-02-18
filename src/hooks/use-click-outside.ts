import { useEffect, useRef, RefObject } from "react";

/**
 * Fires `handler` when a mousedown event occurs outside of `ref`.
 * Uses mousedown (not click) so the handler fires before any focus changes.
 *
 * The handler is stored in a ref so the event listener is never re-attached
 * when the handler identity changes (stable listener pattern).
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlerRef.current();
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref]);
}
