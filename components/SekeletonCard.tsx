import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 justify-center sm:grid-cols-1 lg:grid-cols-4 overflow-x-hidden">
      <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </div>
  )
}
