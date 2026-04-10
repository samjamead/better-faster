export default function SwatchesPage() {
  const hexCodes = ["#e6b451", "#97b7f1", "#cfa2f2", "#bcde80", "#33c489"];

  return (
    <div className="min-h-120 space-y-8 py-8">
      <p>Potato</p>
      <div className="flex flex-wrap gap-8">
        {hexCodes.map((hexCode) => (
          <div
            key={hexCode}
            className="rounded px-5 py-2 text-xl text-black shadow"
            style={{ backgroundColor: hexCode }}
          >
            {hexCode}
          </div>
        ))}
      </div>
    </div>
  );
}
