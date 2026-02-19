"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useState, useRef, KeyboardEvent } from "react";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const total = items.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        buttonRefs.current[(index + 1) % total]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        buttonRefs.current[(index - 1 + total) % total]?.focus();
        break;
      case "Home":
        e.preventDefault();
        buttonRefs.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        buttonRefs.current[total - 1]?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-2.5", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggleItem(item.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          buttonRef={(el) => (buttonRefs.current[index] = el)}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
  isLast: boolean;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  onKeyDown,
  buttonRef,
  isLast,
}: ItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="group border transition-all duration-300 rounded-[0.75rem] bg-white border-[#0000001A]">
      <h3>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`content-${item.id}`}
          id={`control-${item.id}`}
          onClick={onToggle}
          onKeyDown={onKeyDown}
          className="group flex w-full items-center justify-between p-6 text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset transition-all"
        >
          <span className="text-base font-semibold text-[#0A0A0A]">
            {item.title}
          </span>
          <svg
            className={cn(
              "size-4 text-[#717182] transition-transform duration-300 ease-out group-hover:text-[#717182]",
              isOpen ? "rotate-180" : "",
            )}
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2 5 5 5 5-5"
              stroke="#717182"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>

      <div
        id={`content-${item.id}`}
        role="region"
        aria-labelledby={`control-${item.id}`}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          ref={contentRef}
          className="px-6 pb-6 pt-0 motion-reduce:transition-none"
        >
          <p className="font-[0.875rem] leading-6 text-[#4B4B4B]">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}
