"use client";

export function CompanyCardSkeleton() {
  return (
    <div className="group">
      <div className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 shadow-xl rounded-lg">
        {/* Cover Image Skeleton */}
        <div className="relative h-48 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
        </div>

        {/* Header Skeleton */}
        <div className="relative -mt-8 z-10 px-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            <div className="flex-1 min-w-0">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />

          {/* Stats Skeleton */}
          <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200 dark:border-gray-700">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-1" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Badges Skeleton */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Contact Info Skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
          </div>

          {/* Button Skeleton */}
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="group">
      <div className="overflow-hidden border-0 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        {/* Image Skeleton */}
        <div className="relative h-64 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-4">
          {/* Price and Location */}
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4" />
          </div>

          {/* Title */}
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"
              />
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div
          className="absolute top-2 left-2 w-12 h-12 border-2 border-purple-400 border-b-transparent rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="h-16 bg-white/20 rounded animate-pulse mb-6 mx-auto max-w-2xl" />
        <div className="h-6 bg-white/10 rounded animate-pulse mb-8 mx-auto max-w-3xl" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center bg-white/10 rounded-xl p-4">
              <div className="h-12 bg-white/20 rounded animate-pulse mb-2" />
              <div className="h-4 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
