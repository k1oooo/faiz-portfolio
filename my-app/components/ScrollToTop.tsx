"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Jumps back to the top whenever the route changes. The page is wrapped by the
 * slide-up contact panel and the html element uses smooth scrolling, so Next's own
 * scroll reset can get skipped or interrupted (for example when clicking "next project"
 * at the bottom of a long page). This resets it instantly instead.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // Leave the browser's own scroll restoration alone on the first load.
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
