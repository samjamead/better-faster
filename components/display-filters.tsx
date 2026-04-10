"use client";

import { useFilters } from "@/hooks/use-filters";

export const DisplayFilters = () => {
  const { filters, removeFilter } = useFilters();

  if (!filters.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="text-muted-foreground tracking-wide uppercase">
        Filters
      </span>
      {filters.map((filter, index) => (
        <button
          key={`${filter.key}-${filter.value}-${index}`}
          type="button"
          className="border-border hover:bg-muted flex items-center gap-2 rounded-full border px-3 py-1 transition hover:cursor-pointer"
          onClick={() => removeFilter(filter.key, filter.value)}
        >
          <span className="font-medium">{filter.label}</span>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Remove {filter.label}</span>
        </button>
      ))}
    </div>
  );
};
