import Image from "next/image";
import githubMark from "@/public/github-mark.svg";
import githubMarkWhite from "@/public/github-mark-white.svg";
import { format } from "date-fns";

export default async function Footer() {
  const data = await fetch(
    "https://api.github.com/repos/samjamead/better-faster/commits/main",
  );
  const repoData = await data.json();
  return (
    <footer className="border-t px-3 md:px-8">
      <div className="flex flex-col items-center justify-between py-8 md:flex-row">
        <div className="flex flex-col gap-4 text-sm">
          <p>Made with ❤️ in the Channel Islands</p>
          <p>
            Last updated by commit{" "}
            <a
              href={`https://github.com/samjamead/better-faster/commits/main/`}
              target="_blank"
              className="rounded bg-secondary/30 px-1 py-0.5 font-semibold"
            >
              {repoData.sha.slice(0, 7)}
            </a>{" "}
            on{" "}
            {format(new Date(repoData.commit.author.date), "EEEE d MMMM, yyyy")}
          </p>
        </div>

        <p className="flex items-center gap-2 rounded border px-4 py-2 font-mono text-sm shadow">
          <Image
            src={githubMark}
            alt="GitHub"
            width={14}
            height={14}
            className="dark:hidden"
          />
          <Image
            src={githubMarkWhite}
            alt="GitHub"
            width={14}
            height={14}
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
