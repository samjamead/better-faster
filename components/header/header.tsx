import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogInButton, LogOutButton } from "./auth-buttons";
import { createClient } from "@/lib/supabase/server";

export default async function Header({ maxWidth }: { maxWidth: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <nav
        className={cn(
          "mx-auto flex items-center justify-between py-4",
          maxWidth,
        )}
      >
        <Link href="/">
          <h2 className="text-2xl font-bold">Better Faster</h2>
        </Link>
        <div>
          {user && (
            <Link href="/rounds">
              <p>Rounds</p>
            </Link>
          )}
        </div>

        {user ? <LogOutButton /> : <LogInButton />}
      </nav>
    </header>
  );
}
