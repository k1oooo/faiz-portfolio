"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// Copies `value` to the clipboard and shows a tick for a moment.
export default function CopyButton({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string; // e.g. "email address", used for the accessible name
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Older browsers or non-secure pages: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(ta);
      }
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      title={copied ? "Copied" : `Copy ${label}`}
      className={`flex items-center justify-center transition-colors hover:text-accent focus-visible:text-accent ${className}`}
    >
      <span className="text-[1.15rem]">
        {copied ? (
          <Check className="h-[1em] w-[1em]" strokeWidth={1.75} />
        ) : (
          <Copy className="h-[1em] w-[1em]" strokeWidth={1.75} />
        )}
      </span>
      <span role="status" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
