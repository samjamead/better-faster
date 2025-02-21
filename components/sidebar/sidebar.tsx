import { createClient } from "@/lib/supabase/server";
import { LogOutButton } from "../header/auth-buttons";
import MainNav from "../header/main-nav";
export default async function Sidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex min-h-full flex-col justify-between px-3 py-8 md:w-64 md:border-r md:pl-8 md:pr-4">
      {user && <MainNav />}
      {user && <LogOutButton />}
    </div>
  );
}
