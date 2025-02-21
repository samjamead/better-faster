import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-background font-mono">
      <nav className="flex items-center justify-start gap-4">
        <Link
          href="/"
          className="inline-block pb-4 pt-5 transition-colors duration-300 hover:bg-green-500/10 md:w-64 md:border-r md:px-8"
        >
          <h2 className="font-bold tracking-wide">Better Faster</h2>
        </Link>

        <div className="px-4 pb-4 pt-5">
          {user && <p>Logged in as {user.email}</p>}
        </div>
      </nav>
    </header>
  );
}
