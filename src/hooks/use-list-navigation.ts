import { useState, useCallback } from "react";

interface UseListNavigationProps {
  itemCount: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (index: number) => void;
  spaceSelects?: boolean;
}

interface UseListNavigationReturn {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

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

      if (!isOpen) {
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          if (!hasItems) return;
          onOpen();
          setActiveIndex(event.key === "End" ? lastIndex : 0);
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) => (prev >= lastIndex ? lastIndex : prev + 1));
          break;

        case "ArrowUp":
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
