"use client";
import { usePathname } from "next/navigation";

// The Contacts page uses the dark theme. This follows the current URL rather than
// checking whether the page's markup exists, because Next keeps previously visited
// pages in the DOM (hidden), which left the dark theme stuck after navigating away.
export default function ThemeSync() {
  const dark = usePathname().startsWith("/contacts");
  if (!dark) return null;
  return <style>{`body{--bg:#0a0a0a;--fg:#f7f7f7;--grid:rgba(247,247,247,0.08);}`}</style>;
}
