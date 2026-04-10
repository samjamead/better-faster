import { Suspense } from "react";

import { normalizeNextPath } from "@/lib/auth/next-path";
import { LoginForm } from "@/components/auth/login-form";

async function LoginFormContent({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <LoginForm next={normalizeNextPath(next)} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<p>Loading login...</p>}>
          <LoginFormContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
