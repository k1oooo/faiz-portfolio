"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A website preview framed like a screen: the video sits in a centred window over a
 * blurred, black-and-white copy of itself.
 *
 * - autoPlay: the screen is always shown and the video loops on its own (project pages).
 * - otherwise (project cards): only the blurred backdrop shows until the visitor hovers;
 *   then the screen is revealed and plays for as long as the pointer stays over it, and
 *   hides and rewinds on leave. Touch screens have no hover, so there the screen is
 *   revealed while the frame is mostly on screen.
 */
export default function VideoFrame({
  src,
  poster,
  label,
  className = "",
  autoPlay = false,
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  autoPlay?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shown, setShown] = useState(autoPlay);

  const reveal = () => {
    setShown(true);
    videoRef.current?.play().catch(() => {});
  };
  const hide = () => {
    setShown(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  useEffect(() => {
    if (autoPlay) return;
    const root = rootRef.current;
    if (!root) return;
    const touch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!touch || reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? reveal() : hide()),
      {
        threshold: 0.6,
      },
    );
    observer.observe(root);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const backdrop =
    "absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-2xl grayscale";

  return (
    <div
      ref={rootRef}
      onPointerEnter={(e) => {
        if (!autoPlay && e.pointerType === "mouse") reveal();
      }}
      onPointerLeave={(e) => {
        if (!autoPlay && e.pointerType === "mouse") hide();
      }}
      data-cursor
      className={`relative overflow-hidden bg-charcoal ${className}`}
    >
      {/* Blurred black-and-white backdrop: the poster, or the video's first frame */}
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden className={backdrop} />
      ) : (
        <video
          src={`${src}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          className={backdrop}
        />
      )}
      {/* The screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src={`${src}#t=0.1`}
          poster={poster}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          preload={autoPlay ? "auto" : "metadata"}
          aria-label={label}
          aria-hidden={!shown}
          className={`aspect-video w-[88%] bg-black object-cover object-top shadow-2xl transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
