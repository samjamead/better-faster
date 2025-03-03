export default function InvalidTestType({ type }: { type: string }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg border bg-rose-600/5 p-4 md:p-8">
      <h3 className="text-lg font-semibold">Sorry, that&apos;s a shank!</h3>
      <p>You can putt or you can wedge, but you can&apos;t {type}...</p>
    </div>
  );
}
