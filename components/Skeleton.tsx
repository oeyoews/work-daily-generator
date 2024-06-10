import { Skeleton } from '@/components/ui/skeleton';

export function GeneratorSkeleton() {
  const items = [1, 2, 3];
  return (
    <div className="md:flex justify-between gap-3">
      <div className="mt-10 w-full">
        <Skeleton className="h-10 w-1/3" />
        <div className="flex items-center mt-5 gap-4">
          <div className="w-full">
            <Skeleton className="w-full h-10" />
          </div>
          <div>
            <Skeleton className="w-12 h-9" />
          </div>
        </div>
      </div>

      <div className="w-full md:border-l-2 pl-2">
        <Skeleton className="mt-5 h-72 w-full" />
      </div>
    </div>
  );
}

export const ButtonsSkeleton = () => {
  return (
    <div className="gap-3 justify-end flex">
      {[...Array(3)].map((_, index) => {
        return (
          <Skeleton
            className="w-12 h-9"
            key={index}
          />
        );
      })}
    </div>
  );
};
