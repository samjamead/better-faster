import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogInButton, LogOutButton } from "./auth-buttons";
import { createClient } from "@/lib/supabase/server";
import MainNav from "./main-nav";

export default async function Header({ maxWidth }: { maxWidth: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-background-secondary px-3">
      <nav
        className={cn(
          "mx-auto flex items-center justify-between py-4",
          maxWidth,
        )}
      >
        <div className="flex items-baseline gap-16">
          <Link href="/">
            <h2 className="text-lg font-semibold">Better Faster</h2>
          </Link>
          {user && <MainNav />}
        </div>

        {user ? <LogOutButton /> : <LogInButton />}
      </nav>
    </header>
  );
}
