import Link from "next/link";

export const LogInButton = async () => {
  return (
    <Link
      href="/login"
      className="bg-btn-background hover:bg-btn-background-hover rounded-md px-3 py-1.5 no-underline"
    >
      Login
    </Link>
  );
};

export const LogOutButton = async () => {
  return (
    <form action="/auth/sign-out" method="post">
      <button
        type="submit"
        className="-ml-3 w-full rounded-md px-3 py-2 text-left font-mono text-foreground no-underline transition-colors hover:bg-primary/50"
      >
        Logout
      </button>
    </form>
  );
};
