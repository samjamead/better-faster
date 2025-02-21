import Image from "next/image";
import githubMark from "@/public/github-mark.svg";
import githubMarkWhite from "@/public/github-mark-white.svg";
import { cn } from "@/lib/utils";
export default function Footer() {
  return (
    <footer className="border-t px-3 md:px-8">
      <div className={cn("mx-auto flex justify-end py-8")}>
        <p className="flex items-center gap-2 rounded border px-3 py-2 font-mono text-sm shadow">
          <Image
            src={githubMark}
            alt="GitHub"
            width={16}
            height={16}
            className="dark:hidden"
          />
          <Image
            src={githubMarkWhite}
            alt="GitHub"
            width={16}
            height={16}
            className="hidden dark:block"
          />
          <a
            href="https://github.com/samjamead/better-faster"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            samjamead/better-faster
          </a>
        </p>
      </div>
    </footer>
  );
}
