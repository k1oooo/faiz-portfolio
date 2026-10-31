"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// How slowly the video window trails the cursor, in seconds. Higher = slower and lazier.
// A gentle curve (power2) keeps the start slow too, so it drifts after the cursor.
const FOLLOW_SECONDS = 1.8;
const FOLLOW_EASE = "power2.out";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/**
 * The picture area of a project card.
 *
 * At rest it shows the client's logo (or, when there is no logo yet, a blurred
 * black-and-white copy of the site). When the pointer is over the card a small video
 * window fades in and slowly glides after the cursor, staying inside the picture area.
 * It plays while it is visible and rewinds when the pointer leaves.
 *
 * Touch screens have no hover, so there the video is shown centred while the card is
 * mostly on screen. With reduced motion it appears centred and does not follow.
 */
export default function ProjectPreview({
  name,
  logo,
  video,
  poster,
}: {
  name: string;
  logo?: string;
  video?: string;
  poster?: string;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    const box = boxRef.current;
    const vid = videoRef.current;
    const card = tile?.closest("a");
    if (!tile || !box || !vid || !card) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    gsap.set(box, { opacity: 0, scale: 0.92 });

    // Where the window's top-left corner should be so it is centred on the cursor,
    // kept inside the picture area. Without a pointer (or with reduced motion): centred.
    const place = (e?: PointerEvent) => {
      const r = tile.getBoundingClientRect();
      const maxX = r.width - box.offsetWidth;
      const maxY = r.height - box.offsetHeight;
      if (!e || reduce) return { x: maxX / 2, y: maxY / 2 };
      return {
        x: clamp(e.clientX - r.left - box.offsetWidth / 2, 0, maxX),
        y: clamp(e.clientY - r.top - box.offsetHeight / 2, 0, maxY),
      };
    };

    const show = (e?: PointerEvent) => {
      const p = place(e);
      gsap.killTweensOf(box); // jump to the cursor instead of flying in from the last spot
      gsap.set(box, { x: p.x, y: p.y });
      gsap.to(box, { opacity: 1, scale: 1, duration: reduce ? 0 : 0.45, ease: "power3.out" });
      vid.play().catch(() => {});
    };
    const follow = (e: PointerEvent) => {
      const p = place(e);
      gsap.to(box, {
        x: p.x,
        y: p.y,
        duration: reduce ? 0 : FOLLOW_SECONDS,
        ease: FOLLOW_EASE,
        overwrite: "auto",
      });
    };
    const hide = () => {
      gsap.to(box, {
        opacity: 0,
        scale: 0.92,
        duration: reduce ? 0 : 0.3,
        ease: "power2.out",
        onComplete: () => {
          vid.pause();
          vid.currentTime = 0;
        },
      });
    };

    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && show(e);
    const onMove = (e: PointerEvent) => e.pointerType === "mouse" && follow(e);
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && hide();
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    let observer: IntersectionObserver | undefined;
    if (touch && !reduce) {
      observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? show() : hide()), {
        threshold: 0.6,
      });
      observer.observe(card);
    }

    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      observer?.disconnect();
      gsap.killTweensOf(box);
    };
  }, []);

  const backdrop =
    "absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-2xl grayscale";

  return (
    <div ref={tileRef} className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
      {/* Resting state: the client's logo, or a blurred black-and-white copy of the site */}
      {logo ? (
        <div className="absolute inset-0 bg-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt={`${name} logo`}
            className="absolute inset-[8%] h-[84%] w-[84%] object-contain"
          />
        </div>
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden className={backdrop} />
      ) : video ? (
        <video
          src={`${video}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          className={backdrop}
        />
      ) : null}

      {/* The video window that appears on hover and trails the cursor */}
      {video && (
        <div
          ref={boxRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 aspect-video w-[72%] bg-black opacity-0 shadow-2xl"
        >
          <video
            ref={videoRef}
            src={`${video}#t=0.1`}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}
