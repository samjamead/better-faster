export const HoleInputRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-4">
      <h3 className="w-32 text-sm whitespace-nowrap">{label}</h3>
      {children}
    </div>
  );
};
