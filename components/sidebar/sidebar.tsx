import { createClient } from "@/lib/supabase/server";
import { LogOutButton } from "@/components/sidebar/auth-buttons";
import MainNav from "./main-nav";
export default async function Sidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="sticky top-[60px] z-40 flex h-[calc(100svh-60px)] flex-col justify-between overflow-y-auto px-3 py-8 md:w-64 md:border-r md:pl-8 md:pr-4">
      {user && <MainNav />}
      {user && <LogOutButton />}
    </div>
  );
}
