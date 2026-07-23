import { Skeleton } from "@/components/ui/skeleton";
export function TableSkeleton() {
  return (
    <div aria-label="Loading users" aria-live="polite">
      <div className="grid grid-cols-6 gap-4 py-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-4" />
        ))}
      </div>
      {Array.from({ length: 9 }, (_, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 border-t py-4">
          {Array.from({ length: 6 }, (_, cell) => (
            <Skeleton
              key={cell}
              className={cell === 5 ? "h-7 rounded-full" : "h-4"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
