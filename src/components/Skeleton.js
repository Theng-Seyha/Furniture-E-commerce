import React from 'react';

export const Skeleton = ({ className, circle }) => {
  return (
    <div 
      className={`animate-pulse bg-stone-200 dark:bg-stone-800 ${circle ? 'rounded-full' : 'rounded-lg'} ${className}`}
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800">
      <Skeleton className="aspect-4/3 w-full" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
};
