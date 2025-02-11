import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="mx-auto mt-20 max-w-lg">
      <form className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md bg-foreground/20 px-3 py-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="rounded-md bg-foreground/20 px-3 py-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="col-start-2 rounded-md bg-blue-500 px-3 py-1 text-white"
            formAction={login}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
