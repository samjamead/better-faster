import { cn } from "@/lib/utils";

type CardProps = {
  heading?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Card = ({ heading, children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col space-y-2 rounded border p-3",
        className,
      )}
    >
      {heading && <h3 className="text-sm">{heading}</h3>}
      <div className="flex grow flex-col justify-between">{children}</div>
    </div>
  );
};

export const CardHeader = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className={cn("space-y-2", className)}>
    {children}
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
);

export const CardContent = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => <div className={cn("space-y-4", className)}>{children}</div>;
