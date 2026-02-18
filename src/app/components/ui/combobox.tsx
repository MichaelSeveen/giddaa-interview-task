"use client";

import { useId, useRef, useCallback, useState, useEffect } from "react";
import { BaseSelectProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useListNavigation } from "@/hooks/use-list-navigation";

export type ComboboxProps = BaseSelectProps;

/**
 * Combobox — an input-triggered listbox with inline text filtering.
 *
 * ARIA pattern: combobox with list autocomplete
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
 *
 * Key differences from Select:
 *  - Trigger is an <input> with role="combobox", not a <button>
 *  - Space must NOT select — it types into the input
 *  - Typing filters the option list and resets the active descendant
 *  - Clearing the input clears the selection
 */
export function Combobox({
  options,
  value,
  onChange,
  label,
  placeholder = "Search...",
  disabled = false,
  id: idProp,
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const inputId = `${id}-input`;
  const listboxId = `${id}-listbox`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Track whether the user is actively typing so we don't overwrite their input
  const isTypingRef = useRef(false);

  // Sync inputValue with external `value` changes (form reset, parent state)
  // but NOT when the user is typing
  useEffect(() => {
    if (isTypingRef.current) return;
    const selectedOption = options.find((opt) => opt.value === value);
    setInputValue(selectedOption ? selectedOption.label : "");
  }, [value, options]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // Store filteredOptions in a ref so handleSelect doesn't re-create on every filter change
  const filteredRef = useRef(filteredOptions);
  filteredRef.current = filteredOptions;

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    isTypingRef.current = false;
    // Restore input to the currently selected label
    const selectedOption = options.find((opt) => opt.value === value);
    setInputValue(selectedOption ? selectedOption.label : "");
  }, [options, value]);

  const handleSelect = useCallback(
    (index: number) => {
      const option = filteredRef.current[index];
      if (option) {
        onChange(option.value);
        setInputValue(option.label);
      }
      isTypingRef.current = false;
      setIsOpen(false);
    },
    [onChange],
  );

  const { activeIndex, setActiveIndex, handleKeyDown } = useListNavigation({
    itemCount: filteredOptions.length,
    isOpen,
    onOpen: open,
    onClose: close,
    onSelect: handleSelect,
    spaceSelects: false,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    isTypingRef.current = true;
    setInputValue(nextValue);

    // Clear the committed selection when the user edits the text
    if (nextValue !== options.find((opt) => opt.value === value)?.label) {
      onChange("");
    }

    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleInputClick = () => {
    if (disabled) return;
    setIsOpen(true);
    inputRef.current?.select();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Visually hidden label */}
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>

      {/* ── Input wrapper ──────────────────────────────────────────────── */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={inputId}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendant}
          aria-haspopup="listbox"
          autoComplete="off"
          disabled={disabled}
          value={inputValue}
          placeholder={placeholder}
          className={cn(
            // Base — matches Input component
            "flex h-11.25 w-full rounded-xl border bg-white px-3 py-1 pr-9",
            "text-sm text-black outline-none",
            // Border & ring
            "ring-inset border-[#E9E9E9] ring-offset-transparent ring-offset-0",
            // Placeholder
            "placeholder:text-[#717182] placeholder:text-sm",
            // Focus & hover
            "focus:ring-2 hover:ring-2 ring-primary focus:shadow-[0px_0px_4px_4px_#2C59C333]",
            // Disabled
            "disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:border-[#E9E9E9] disabled:text-[#717182]",
          )}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
        />
        {/* Chevron toggle */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "text-[#717182] transition-transform duration-200",
            isOpen && "rotate-180",
            disabled && "pointer-events-none",
          )}
          onMouseDown={(event) => {
            event.preventDefault();
            if (isOpen) {
              close();
            } else {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Listbox ────────────────────────────────────────────────────── */}
      <ul
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          // Positioning & sizing
          "absolute left-0 z-50 mt-1.5 w-full",
          // Visual
          "rounded-xl border border-[#E9E9E9] bg-white shadow-sm",
          // Scrollable
          "max-h-60 overflow-y-auto overscroll-contain scroll-py-1",
          // Spacing
          "p-1",
          // Animation
          "transition-[opacity,transform] duration-150 ease-out origin-top",
          isOpen
            ? "visible scale-y-100 opacity-100"
            : "invisible scale-y-95 opacity-0",
        )}
      >
        {filteredOptions.map((option, index) => {
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

        {filteredOptions.length === 0 && (
          <li
            role="option"
            aria-selected={false}
            aria-disabled
            className="px-3 py-2 text-sm text-[#717182] text-center select-none"
          >
            No results for &ldquo;{inputValue}&rdquo;
          </li>
        )}
      </ul>
    </div>
  );
}
