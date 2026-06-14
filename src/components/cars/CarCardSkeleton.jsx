import { Skeleton } from '@/components/ui/skeleton'

export default function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* image */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-4 space-y-3">
        {/* title */}
        <Skeleton className="h-4 w-3/4" />

        {/* meta lines */}
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/5" />

        {/* price row */}
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>

        {/* emi */}
        <Skeleton className="h-3 w-28" />

        {/* actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
