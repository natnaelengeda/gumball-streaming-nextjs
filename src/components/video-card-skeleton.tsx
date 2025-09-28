"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // from shadcn/ui

export default function SkeletonCard() {
  return (
    <Card className="pt-0 bg-white/10 border-white/20 rounded-xl shadow-lg backdrop-blur-md overflow-hidden animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="h-52 relative overflow-hidden rounded-t-lg aspect-video">
        <Skeleton className="w-full h-full" />
        {/* Badge placeholder */}
        <div className="absolute top-2 right-2">
          <div className="h-5 w-14 rounded-md bg-white/20" />
        </div>
      </div>

      {/* Text placeholders */}
      <div className="h- flex flex-col items-start justify-start gap-2 px-2">
        <div className="h-5 w-2/3 rounded-md bg-white/20" />
        <div className="h-4 w-full rounded-md bg-white/20" />
        <div className="h-4 w-5/6 rounded-md bg-white/20" />
      </div>
    </Card>
  );
}
