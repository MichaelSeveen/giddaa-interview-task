"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "showing" | "visible" | "hiding";

interface ChatMessage {
  title: string;
  description: string;
}

interface ChatWidgetProps {
  messages: ChatMessage[];
  initialDelay?: number;
  visibleDuration?: number;
  className?: string;
}

const TRANSITION_MS = 400;
const STAGGER_MS = 200;

export function ChatWidget({
  messages,
  initialDelay = 3000,
  visibleDuration = 6000,
  className,
}: ChatWidgetProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    clearTimer();

    let delay: number;
    let next: Phase;

    switch (phase) {
      case "idle":
        return;

      case "showing":
        delay = (messages.length - 1) * STAGGER_MS + TRANSITION_MS;
        next = "visible";
        break;

      case "visible":
        delay = visibleDuration;
        next = "hiding";
        break;

      case "hiding":
        delay = TRANSITION_MS;
        next = "idle";
        break;
    }

    timerRef.current = setTimeout(() => setPhase(next), delay);
    return clearTimer;
  }, [phase, messages.length, visibleDuration]);

  useEffect(() => {
    timerRef.current = setTimeout(() => setPhase("showing"), initialDelay);
    return clearTimer;
  }, [initialDelay]);

  const handleClick = () => {
    clearTimer();
    if (phase === "idle" || phase === "hiding") {
      setPhase("showing");
    } else {
      setPhase("hiding");
    }
  };

  const messagesVisible = phase === "showing" || phase === "visible";

  return (
    <div
      className={cn(
        "fixed bottom-4.75 right-4.75 lg:right-6 lg:bottom-6 z-50 flex flex-col items-end gap-3",
        className,
      )}
    >
      <div className="flex flex-col items-end gap-2 pointer-events-none">
        {messages.map((msg, i) => {
          const delay = i * STAGGER_MS;

          return (
            <div
              key={i}
              className={cn(
                "rounded-[32px] border border-primary p-6",
                "bg-white shadow-[0px_0px_4px_4px_#2C59C333]",
                "transition-all ease-out flex items-center gap-2.5 lg:w-170.25",
                messagesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3",
              )}
              style={{
                transitionDuration: `${TRANSITION_MS}ms`,
                transitionDelay: messagesVisible ? `${delay}ms` : "0ms",
              }}
              aria-hidden={!messagesVisible}
            >
              <div className="size-15 flex items-center justify-center rounded-lg bg-primary shrink-0">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-8"
                >
                  <path
                    d="M25.6 0H6.4C2.88 0 0 2.88 0 6.4v12.8c0 3.52 2.88 6.4 6.4 6.4h4.16l5.92 5.92c.32.32.64.48 1.12.48.16 0 .48 0 .64-.16q.96-.48.96-1.44v-4.8h6.4c3.52 0 6.4-2.88 6.4-6.4V6.4C32 2.88 29.12 0 25.6 0m3.2 19.2c0 1.76-1.44 3.2-3.2 3.2h-8c-.96 0-1.6.64-1.6 1.6v2.56l-3.68-3.68c-.32-.32-.64-.48-1.12-.48H6.4a3.21 3.21 0 0 1-3.2-3.2V6.4c0-1.76 1.44-3.2 3.2-3.2h19.2c1.76 0 3.2 1.44 3.2 3.2z"
                    fill="#fff"
                  />
                  <path
                    d="M10.4 11.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8m11.201 0a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8m-2.081 3.68c-1.92 1.92-5.12 1.92-7.04 0-.64-.64-1.6-.64-2.24 0s-.64 1.6 0 2.24a8.12 8.12 0 0 0 5.76 2.4c2.08 0 4.16-.8 5.76-2.4.64-.64.64-1.6 0-2.24s-1.6-.64-2.24 0"
                    fill="#fff"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[1rem] leading-7 font-bold bg-[linear-gradient(195.35deg,#2C59C3_-36.36%,#173781_26.43%,#000000_89.23%)] bg-clip-text text-transparent">
                  {msg.title}
                </p>
                <p className="text-[1rem] leading-7">{msg.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FAB button ─────────────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="Chat with us"
        onClick={handleClick}
        className={cn(
          "size-14 rounded-[12px]",
          "bg-primary text-white shadow-lg",
          "hover:shadow-sm hover:scale-105",
          "active:scale-95",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          "inline-flex items-center justify-center",
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
        >
          <path
            d="M25.6 0H6.4C2.88 0 0 2.88 0 6.4v12.8c0 3.52 2.88 6.4 6.4 6.4h4.16l5.92 5.92c.32.32.64.48 1.12.48.16 0 .48 0 .64-.16q.96-.48.96-1.44v-4.8h6.4c3.52 0 6.4-2.88 6.4-6.4V6.4C32 2.88 29.12 0 25.6 0m3.2 19.2c0 1.76-1.44 3.2-3.2 3.2h-8c-.96 0-1.6.64-1.6 1.6v2.56l-3.68-3.68c-.32-.32-.64-.48-1.12-.48H6.4a3.21 3.21 0 0 1-3.2-3.2V6.4c0-1.76 1.44-3.2 3.2-3.2h19.2c1.76 0 3.2 1.44 3.2 3.2z"
            fill="#fff"
          />
          <path
            d="M10.4 11.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8m11.201 0a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8m-2.081 3.68c-1.92 1.92-5.12 1.92-7.04 0-.64-.64-1.6-.64-2.24 0s-.64 1.6 0 2.24a8.12 8.12 0 0 0 5.76 2.4c2.08 0 4.16-.8 5.76-2.4.64-.64.64-1.6 0-2.24s-1.6-.64-2.24 0"
            fill="#fff"
          />
        </svg>
      </button>
    </div>
  );
}
