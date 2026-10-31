"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactPanel from "./ContactPanel";

gsap.registerPlugin(ScrollTrigger);

// Blank breathing room (in svh) after the last section before the panel starts to slide up.
// The spacer is this plus one full screen: the screen is the slide-up itself.
const PAUSE = 30;

/**
 * Once the visitor scrolls to the end of any page, the page stays fixed on screen
 * and the contact page slides up from the bottom over it. A blank spacer of one
 * viewport height sits at the end of the page; scrolling through it drives the
 * panel (and the counter-movement of the page) with GSAP ScrollTrigger.
 */
export default function ContactReveal() {
  const pathname = usePathname();
  const enabled = !pathname.startsWith("/contacts");
  const spacerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const panel = panelRef.current;
    const page = document.querySelector<HTMLElement>("[data-page]");
    if (!enabled || !spacer || !panel || !page) return;

    // Only let the panel take clicks and focus once it is (almost) fully in view,
    // and take the page behind it out of the tab order at the same time.
    const setOpen = (open: boolean) => {
      panel.inert = !open;
      panel.style.pointerEvents = open ? "auto" : "none";
      page.inert = open;
    };
    setOpen(false);

    // The first PAUSE of the spacer just scrolls by as empty space; the slide-up uses the rest.
    const pause = () =>
      Math.round((spacer.offsetHeight * PAUSE) / (100 + PAUSE));
    const trigger = {
      trigger: spacer,
      start: () => `top+=${pause()} bottom`,
      end: "bottom bottom",
    };
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(panel, { visibility: "visible" });
      // While the visitor scrolls through the spacer, the page is pushed down by the
      // same distance, so it stays put on screen and the panel slides up over it.
      // Scrub is exact (no smoothing) so the page never drifts against the scroll.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            ...trigger,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => setOpen(self.progress > 0.97),
          },
        })
        .fromTo(panel, { yPercent: 100 }, { yPercent: 0 }, 0)
        .fromTo(page, { y: 0 }, { y: () => spacer.offsetHeight - pause() }, 0);
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
      page.inert = false;
    };
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={spacerRef}
        aria-hidden
        style={{ height: `${100 + PAUSE}svh` }}
      />
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
        <div className="relative z-10 flex flex-1 flex-col">
          <ContactPanel heading="p" />
        </div>
      </section>
    </>
  );
}
