import { LoginForm } from "@/components/auth/login-form";
import { createClient } from "@/lib/supabase/server";

export const ProtectedRouteProvider = async ({
  children,
  nextPath,
}: {
  children: React.ReactNode;
  nextPath: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm next={nextPath} />
        </div>
      </div>
    );
  }

  return children;
};
