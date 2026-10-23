import Link from "next/link";
import { FileDown } from "lucide-react";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import ContactMenu from "./ContactMenu";
import IconLink from "./IconLink";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3 md:px-10 md:py-4">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight"
        >
          {site.name}
        </Link>


        <div className="flex items-center gap-1">
          <IconLink href={site.linkedin} label="LinkedIn">
            <LinkedinIcon className="size-[17px]" />
          </IconLink>
          <IconLink href={site.github} label="GitHub">
            <GithubIcon className="size-[18px]" />
          </IconLink>
          <IconLink href={site.resume} label="Download resume" download>
            <FileDown className="size-[18px]" strokeWidth={1.75} />
          </IconLink>
          <ContactMenu />
        </div>
      </div>
    </header>
  );
}
