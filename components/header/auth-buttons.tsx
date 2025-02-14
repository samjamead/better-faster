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
    <div className="flex items-center gap-4">
      <form action="/auth/sign-out" method="post">
        <button
          type="submit"
          className="rounded-md border px-3 py-1 text-sm text-white no-underline transition-colors hover:bg-foreground/10"
        >
          Logout
        </button>
      </form>
    </div>
  );
};
