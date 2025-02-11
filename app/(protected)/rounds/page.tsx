import RoundsTable from "@/components/rounds/rounds-table";

export default async function Rounds() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2>Rounds</h2>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Add Round
        </button>
      </div>
      <RoundsTable />
    </div>
  );
}
