export const SummaryCard = ({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex w-full max-w-sm flex-col space-y-4 rounded-sm border p-4">
      {title && <h3 className="tracking-wider uppercase">{title}</h3>}
      <div className="grow">{children && children}</div>
    </div>
  );
};
