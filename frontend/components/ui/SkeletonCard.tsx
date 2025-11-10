import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden border-2 border-border h-full">
      {/* Image skeleton */}
      <div className="relative h-52 bg-skeleton-base overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
      </div>

      <CardHeader className="space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-skeleton-base rounded overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
        </div>

        {/* Description skeleton - 3 lines */}
        <div className="space-y-2">
          <div className="h-4 bg-skeleton-base rounded overflow-hidden relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-skeleton-base rounded overflow-hidden relative w-5/6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-skeleton-base rounded overflow-hidden relative w-4/6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Info items skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-skeleton-base rounded overflow-hidden relative w-3/4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-skeleton-base rounded overflow-hidden relative w-2/3">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-skeleton-base rounded overflow-hidden relative w-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-skeleton-base rounded overflow-hidden relative mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skeleton-shine to-transparent animate-shimmer" />
        </div>
      </CardContent>
    </Card>
  );
}
