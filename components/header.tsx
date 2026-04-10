import { Suspense } from "react";

import { BetterFasterNav } from "./better-faster-nav";

export const Header = () => {
  return (
    <header className="flex">
      <Suspense>
        <BetterFasterNav />
      </Suspense>
      <div className="h-10 grow border-b" />
    </header>
  );
};
