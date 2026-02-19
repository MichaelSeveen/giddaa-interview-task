"use client";

import {
  useRef,
  useId,
  useState,
  useEffect,
  useLayoutEffect,
  KeyboardEvent,
} from "react";
import { TabsProps } from "@/config/types";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Tabs({
  tabs,
  selectedValue,
  onSelect,
  label,
  className,
}: TabsProps) {
  const uid = useId();

  const tabId = (value: string) => `${uid}-tab-${value}`;
  const panelId = (value: string) => `${uid}-panel-${value}`;

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const activeIndex = tabs.findIndex((t) => t.value === selectedValue);
  const hasPanels = tabs.some((t) => t.content !== undefined);

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useIsomorphicLayoutEffect(() => {
    const tablist = tablistRef.current;
    if (!tablist) return;

    const measure = () => {
      const activeTab = tabsRef.current[activeIndex];
      if (activeTab) {
        const tablistRect = tablist.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        setIndicator({
          left: tabRect.left - tablistRect.left,
          width: tabRect.width,
        });
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(tablist);
    return () => ro.disconnect();
  }, [activeIndex, tabs]);

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    let targetIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        targetIndex = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        targetIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabsRef.current[targetIndex]?.focus();
    onSelect(tabs[targetIndex].value);
  };

  return (
    <div className={cn("flex flex-col items-center gap-9.25", className)}>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={label}
        className="relative inline-flex items-center bg-[#ECECF0] rounded-full p-1 w-fit"
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-1 bottom-1 rounded-full bg-white",
            "ring-1 ring-black/5",
            "transition-all duration-250 ease-in-out",
            "motion-reduce:transition-none",
          )}
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
            left: 0,
          }}
        />

        {tabs.map((tab, index) => {
          const isSelected = tab.value === selectedValue;

          return (
            <button
              key={tab.value}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              type="button"
              role="tab"
              id={tabId(tab.value)}
              aria-selected={isSelected}
              aria-controls={hasPanels ? panelId(tab.value) : undefined}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(tab.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative z-10 px-6 py-2 whitespace-nowrap",
                "border-none bg-transparent rounded-full cursor-pointer",
                "text-sm font-semibold leading-5",
                "text-slate-500 transition-colors duration-200",
                !isSelected && "hover:text-charcoal",
                isSelected && "text-slate-900",
                "focus:outline-none",
                "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {hasPanels &&
        tabs.map((tab) => (
          <div
            key={tab.value}
            id={panelId(tab.value)}
            role="tabpanel"
            aria-labelledby={tabId(tab.value)}
            tabIndex={0}
            hidden={tab.value !== selectedValue}
            className={cn(
              "w-full",
              "focus:outline-none",
              "focus-visible:outline-2 focus-visible:outline-primary",
              "focus-visible:outline-offset-4 focus-visible:rounded",
            )}
          >
            {tab.content}
          </div>
        ))}
    </div>
  );
}
