import type { ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  children: ReactNode;
  download?: boolean;
};

/** Round icon button with a small tooltip on hover / keyboard focus. */
export default function IconLink({ href, label, children, download }: Props) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noreferrer" })}
      className="group relative grid size-9 place-items-center rounded-full text-white/70 transition duration-300 hover:bg-white/15 hover:text-white focus-visible:bg-white/15 focus-visible:text-white"
    >
      {children}
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-black opacity-0 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </a>
  );
}
