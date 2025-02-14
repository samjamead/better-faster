import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDataTable() {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border-b p-4 text-left">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="border-b p-4 text-left">
              <Skeleton className="h-4 w-96" />
            </th>
            <th className="border-b p-4 text-right">
              <Skeleton className="h-4 w-24" />
            </th>
            <th className="border-b p-4 text-right">
              <Skeleton className="h-4 w-24" />
            </th>
            <th className="border-b p-4 text-right">
              <div className="flex justify-end gap-2">
                <Skeleton className="h-4 w-24" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="p-4">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-96" />
              </td>
              <td className="p-4 text-right">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="p-4 text-right">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-4 w-24" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
