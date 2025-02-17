import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="mx-auto mt-20 w-full max-w-md space-y-8 rounded-lg border bg-background-secondary p-4 lg:p-16">
      <h2 className="text-2xl font-bold">Log in</h2>
      <form className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="block" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md bg-foreground/20 px-3 py-1"
          />
        </div>

        <label className="block" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-md bg-foreground/20 px-3 py-1"
        />

        <div className="pt-4 text-right">
          <button
            className="rounded-md bg-blue-500 px-3 py-1 text-white"
            formAction={login}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
