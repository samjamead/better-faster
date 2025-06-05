import Image from "next/image";
import githubMark from "@/public/github-mark.svg";
import githubMarkWhite from "@/public/github-mark-white.svg";
import { format } from "date-fns";

type RepoData = {
  sha: string;
  commit: { author: { date: string } };
} | null;

export default async function Footer() {
  let repoData: RepoData = null;
  const res = await fetch(
    "https://api.github.com/repos/samjamead/better-faster/commits/main",
    { next: { revalidate: 60 * 60 } },
  );
  if (res.ok) {
    repoData = await res.json();
  }
  return (
    <footer className="border-t px-3 md:px-8">
      <div className="flex flex-col items-center justify-between gap-8 pb-20 pt-12 md:flex-row lg:py-8">
        <div className="flex flex-col gap-4 text-center text-sm md:text-left">
          <p>Made with ❤️ in the Channel Islands</p>
          {repoData && repoData.sha && repoData.commit?.author?.date ? (
            <p className="max-w-72 md:max-w-prose">
              Last updated by commit{" "}
              <a
                href={`https://github.com/samjamead/better-faster/commits/main/`}
                target="_blank"
                className="rounded bg-secondary/30 px-1 py-0.5 font-semibold"
              >
                {repoData.sha.slice(0, 7)}
              </a>{" "}
              on{" "}
              {format(
                new Date(repoData.commit.author.date),
                "EEEE d MMMM, yyyy",
              )}
            </p>
          ) : (
            <p className="max-w-72 text-muted-foreground md:max-w-prose">
              Last updated info unavailable
            </p>
          )}
        </div>

        <p className="flex items-center gap-2 rounded border px-4 py-2 font-mono text-sm shadow-sm">
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
