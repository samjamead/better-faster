import { HolesPlayedSummary } from "@/components/holes-played-summary";
import { WideHoleDataList } from "@/components/wide-hole-data-list";

export default function HolesPage() {
  return (
    <div className="w-full space-y-6 py-6">
      <HolesPlayedSummary />
      <WideHoleDataList />
    </div>
  );
}
