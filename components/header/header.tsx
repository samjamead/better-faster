import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LoggedInHeader from "./logged-in-header";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-background font-mono">
      <nav className="flex items-center justify-between gap-4 md:justify-start">
        <Link
          href="/"
          className="inline-block px-3 pb-4 pt-5 transition-colors duration-300 hover:bg-green-500/10 md:w-64 md:border-r md:px-8"
        >
          <h2 className="font-bold tracking-wide">Better Faster</h2>
        </Link>

        {user && (
          <>
            <div className="hidden px-4 pb-4 pt-5 md:block">
              <LoggedInHeader />
            </div>

            <div className="px-3 md:hidden">
              <Link href="/menu">
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
