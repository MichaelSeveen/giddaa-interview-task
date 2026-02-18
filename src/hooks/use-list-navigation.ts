import { useState, useCallback } from "react";

interface UseListNavigationProps {
  itemCount: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (index: number) => void;
  /**
   * Whether the Space bar should confirm the active option.
   * Set to false for Combobox so Space types into the input instead.
   * @default true
   */
  spaceSelects?: boolean;
}

interface UseListNavigationReturn {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

/**
 * Manages keyboard navigation for a button/input → listbox pattern.
 *
 * Follows the ARIA Authoring Practices Guide keyboard contract:
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */
export function useListNavigation({
  itemCount,
  isOpen,
  onOpen,
  onClose,
  onSelect,
  spaceSelects = true,
}: UseListNavigationProps): UseListNavigationReturn {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const lastIndex = itemCount - 1;
      const hasItems = itemCount > 0;

      // ── Closed state ──────────────────────────────────────────────────
      if (!isOpen) {
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          if (!hasItems) return;
          onOpen();
          setActiveIndex(event.key === "End" ? lastIndex : 0);
        }
        return;
      }

      // ── Open state ────────────────────────────────────────────────────
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) => (prev >= lastIndex ? lastIndex : prev + 1));
          break;

        case "ArrowUp":
          // Alt+ArrowUp: select current option and close (APG §3.2)
          if (event.altKey) {
            event.preventDefault();
            if (activeIndex >= 0) onSelect(activeIndex);
            onClose();
            setActiveIndex(-1);
            break;
          }
          event.preventDefault();
          setActiveIndex((prev) => (prev <= 0 ? 0 : prev - 1));
          break;

        case "Home":
        case "PageUp":
          event.preventDefault();
          setActiveIndex(0);
          break;

        case "End":
        case "PageDown":
          event.preventDefault();
          setActiveIndex(lastIndex);
          break;

        case "Enter":
          event.preventDefault();
          if (activeIndex >= 0) onSelect(activeIndex);
          break;

        case " ":
          if (spaceSelects) {
            event.preventDefault();
            if (activeIndex >= 0) onSelect(activeIndex);
          }
          break;

        case "Tab":
          // Tab closes and commits without preventing default so focus moves naturally
          // Only commit if an option is actively highlighted
          if (activeIndex >= 0) onSelect(activeIndex);
          onClose();
          setActiveIndex(-1);
          break;

        case "Escape":
          event.preventDefault();
          onClose();
          setActiveIndex(-1);
          break;
      }
    },
    [isOpen, itemCount, activeIndex, onOpen, onClose, onSelect, spaceSelects],
  );

  return { activeIndex, setActiveIndex, handleKeyDown };
}
