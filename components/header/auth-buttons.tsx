import Link from "next/link";

export const LogInButton = async () => {
  return (
    <Link
      href="/login"
      className="bg-btn-background hover:bg-btn-background-hover rounded-md px-3 py-1.5 text-sm no-underline"
    >
      Login
    </Link>
  );
};

export const LogOutButton = async () => {
  return (
    <div className="flex items-center gap-4 text-sm">
      <form action="/auth/sign-out" method="post">
        <button
          type="submit"
          className="bg-btn-background hover:bg-btn-background-hover rounded-md px-2 py-1 text-xs text-white no-underline transition-colors"
        >
          Logout
        </button>
      </form>
    </div>
  );
};
