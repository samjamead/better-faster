import { Suspense } from "react";

import { normalizeNextPath } from "@/lib/auth/next-path";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

async function UpdatePasswordFormContent({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <UpdatePasswordForm next={normalizeNextPath(next)} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<p>Loading password update...</p>}>
          <UpdatePasswordFormContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
