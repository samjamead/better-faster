import { createClient } from "@/lib/supabase/server";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("round_averages")
    .select("*")
    .single();

  const funnelStats = {
    "Fairways hit":
      data?.avg_fairways_hit != null
        ? `${(data.avg_fairways_hit * 100).toFixed(0)} %`
        : "N/A",
    "Greens in regulation":
      data?.avg_greens_in_regulation != null
        ? `${(data.avg_greens_in_regulation * 100).toFixed(0)} %`
        : "N/A",

    "Greens from fairway":
      data?.avg_greens_from_fairway != null
        ? `${(data.avg_greens_from_fairway * 100).toFixed(0)} %`
        : "N/A",
    "Greens from rough":
      data?.avg_greens_from_rough != null
        ? `${(data.avg_greens_from_rough * 100).toFixed(0)} %`
        : "N/A",
    "Greens on Par threes":
      data?.avg_greens_on_par_three != null
        ? `${(data.avg_greens_on_par_three * 100).toFixed(0)} %`
        : "N/A",
    "Up and Down":
      data?.avg_up_and_down != null
        ? `${(data.avg_up_and_down * 100).toFixed(0)} %`
        : "N/A",
    "Putts per hole":
      data?.avg_putts_per_hole != null
        ? `${data.avg_putts_per_hole.toFixed(2)}`
        : "N/A",
  };

  const otherStats = {
    Birdies:
      data?.avg_birdies != null ? `${data.avg_birdies.toFixed(1)}` : "N/A",
    "Double bogeys":
      data?.avg_double_bogeys != null
        ? `${data.avg_double_bogeys.toFixed(1)}`
        : "N/A",
    "Three putts":
      data?.avg_three_putts != null
        ? `${data.avg_three_putts.toFixed(1)}`
        : "N/A",
    "Penalty strokes":
      data?.avg_penalty_strokes != null
        ? `${data.avg_penalty_strokes.toFixed(1)}`
        : "N/A",
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Reality Check</h2>

      {error && (
        <p className="max-w-prose">Error fetching data: {error.message}</p>
      )}

      {data && (
        <div className="flex items-start gap-8">
          <div className="max-w-fit overflow-x-auto rounded-md border">
            <Table>
              <TableBody>
                {Object.entries(funnelStats).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="p-3 pr-12 font-mono text-lg">
                      {key}
                    </TableCell>
                    <TableCell className="p-3 text-right font-mono text-lg">
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="max-w-fit overflow-x-auto rounded-md border">
            <Table>
              <TableBody>
                {Object.entries(otherStats).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="p-3 pr-12 font-mono text-lg">
                      {key}
                    </TableCell>
                    <TableCell className="p-3 text-right font-mono text-lg">
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
