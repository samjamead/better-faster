import { Suspense } from "react";

import { headers } from "next/headers";

import { Header } from "@/components/header";
import { ProtectedRouteProvider } from "@/components/protected-route-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const nextPath = requestHeaders.get("x-pathname") ?? "/better-faster";

  return (
    <Suspense>
      <ProtectedRouteProvider nextPath={nextPath}>
        <div className="flex w-full flex-col border font-mono text-sm dark:border-neutral-600/25 dark:bg-neutral-900">
          <Header />
          <div className="flex w-full grow px-6">{children}</div>
        </div>
      </ProtectedRouteProvider>
    </Suspense>
  );
}
