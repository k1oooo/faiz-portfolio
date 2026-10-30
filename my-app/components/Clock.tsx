"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-4 left-5 z-50 text-[13px] leading-tight text-white mix-blend-difference">
      <div className="font-semibold">
        {site.city} - {time}
      </div>
      <div className="opacity-60">{site.coords}</div>
    </div>
  );
}
