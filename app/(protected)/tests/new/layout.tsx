import { Heading2 } from "@/components/typography/typography";

export default function NewTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Heading2>Log a New Test</Heading2>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
