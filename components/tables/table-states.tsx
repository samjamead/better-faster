export const TableLoadingState = ({ heading }: { heading: string }) => {
  return (
    <div className="w-full rounded border p-2">
      <div className="flex min-h-96 w-full items-center justify-center rounded bg-emerald-500/20 p-2">
        <p className="">{heading}...</p>
      </div>
    </div>
  );
};

export const TableErrorState = ({
  heading,
  message,
}: {
  heading: string;
  message: string;
}) => {
  return (
    <div className="w-full rounded border p-2">
      <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 rounded bg-rose-500/20 p-2">
        <p className="">{heading}</p>
        <p className="max-w-lg text-balance">{message}</p>
      </div>
    </div>
  );
};
