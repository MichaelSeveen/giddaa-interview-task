"use client";

import { useId, useRef, useCallback, useState, useEffect } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useListNavigation } from "@/hooks/use-list-navigation";
import { BaseSelectProps } from "@/config/types";
import { cn } from "@/lib/utils";
import ChevronDownIcon from "../icons/chevron-down-icon";

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  disabled = false,
  id: idProp,
  className,
}: BaseSelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const buttonId = `${id}-button`;
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;

  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const handleSelect = useCallback(
    (index: number) => {
      const option = options[index];
      if (option) onChange(option.value);
      setIsOpen(false);
    },
    [options, onChange],
  );

  const { activeIndex, setActiveIndex, handleKeyDown } = useListNavigation({
    itemCount: options.length,
    isOpen,
    onOpen: open,
    onClose: close,
    onSelect: handleSelect,
    spaceSelects: true,
  });

  const activeDescendant =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  useClickOutside(containerRef, close);

  // Auto-scroll the active option into view
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    const listbox = listboxRef.current;
    if (!listbox) return;
    const activeEl = listbox.children[activeIndex] as HTMLElement | undefined;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const toggleOpen = () => {
    if (disabled) return;
    if (isOpen) {
      close();
    } else {
      open();
      const selectedIndex = options.findIndex((opt) => opt.value === value);
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <label id={labelId} className="sr-only">
        {label}
      </label>
      <button
        type="button"
        id={buttonId}
        className={cn(
          "flex h-11.25 w-full items-center justify-between rounded-xl border bg-white px-3 py-1",
          "text-sm text-black outline-none",
          "border-[#E9E9E9] ring-inset ring-offset-transparent ring-offset-0",
          "focus:ring-2 hover:ring-2 ring-primary focus:shadow-[0px_0px_4px_4px_#2C59C333]",
          "disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:border-[#E9E9E9] disabled:text-[#717182]",
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={activeDescendant}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
      >
        <span className={cn("truncate", !selectedOption && "text-[#717182]")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon />
      </button>

      <ul
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        className={cn(
          "absolute left-0 z-50 mt-1.5 w-full",
          "rounded-xl border border-[#E9E9E9] bg-white shadow-md",
          "max-h-60 overflow-y-auto overscroll-contain scroll-py-1",
          "p-1",
          "transition-[opacity,transform] duration-150 ease-out origin-top",
          isOpen
            ? "visible scale-y-100 opacity-100"
            : "invisible scale-y-95 opacity-0",
        )}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const isFocused = index === activeIndex;
          const optionId = `${listboxId}-option-${index}`;

          return (
            <li
              key={option.value}
              id={optionId}
              role="option"
              aria-selected={isSelected}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm",
                "select-none outline-none",
                isFocused && "bg-[#F5F5F5]",
                isSelected && "font-medium text-primary",
                !isFocused && "hover:bg-[#F9F9FB]",
              )}
              onMouseDown={(event) => {
                event.preventDefault();
                handleSelect(index);
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="truncate">{option.label}</span>
              {isSelected && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-primary"
                >
                  <path
                    d="M13.333 4L6 11.333 2.667 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}

        {options.length === 0 && (
          <li
            role="option"
            aria-selected={false}
            aria-disabled
            className="px-3 py-2 text-sm text-[#717182] text-center select-none"
          >
            No options available
          </li>
        )}
      </ul>
    </div>
  );
}
