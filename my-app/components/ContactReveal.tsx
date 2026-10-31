"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactPanel from "./ContactPanel";

gsap.registerPlugin(ScrollTrigger);

/**
 * Once the visitor scrolls to the end of any page, the contact page slides up
 * from the bottom and covers the screen. A blank spacer of one viewport height
 * sits at the end of the page; scrolling through it drives the panel with
 * GSAP ScrollTrigger (scrubbed, so it follows the scroll position).
 */
export default function ContactReveal() {
  const pathname = usePathname();
  const enabled = !pathname.startsWith("/contacts");
  const spacerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const panel = panelRef.current;
    if (!enabled || !spacer || !panel) return;

    // Only let the panel take clicks and focus once it is (almost) fully in view.
    const setOpen = (open: boolean) => {
      panel.inert = !open;
      panel.style.pointerEvents = open ? "auto" : "none";
    };
    setOpen(false);

    const trigger = { trigger: spacer, start: "top bottom", end: "bottom bottom" };
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(panel, { yPercent: 100, visibility: "visible" });
      gsap.to(panel, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          ...trigger,
          scrub: 0.6,
          onUpdate: (self) => setOpen(self.progress > 0.97),
        },
      });
    });

    // Reduced motion: no sliding, the panel simply appears near the bottom.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(panel, { yPercent: 100, visibility: "visible" });
      ScrollTrigger.create({
        ...trigger,
        onUpdate: (self) => {
          const shown = self.progress > 0.5;
          gsap.set(panel, { yPercent: shown ? 0 : 100 });
          setOpen(shown);
        },
      });
    });

    // Page height changes after navigation and font loading, so keep triggers accurate.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mm.revert();
    };
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <div ref={spacerRef} aria-hidden style={{ height: "100svh" }} />
      <section
        ref={panelRef}
        aria-label="Contact"
        // Hidden until GSAP takes over, so there is no flash before hydration.
        style={{ visibility: "hidden" }}
        className="theme-dark-panel fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-24 pt-32 text-paper"
      >
        <div className="grid-lines" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <div className="relative z-10 flex flex-1 flex-col justify-between">
          <ContactPanel heading="p" />
        </div>
      </section>
    </>
  );
}
