import { Skeleton } from "../ui/skeleton";

const SurveySkeletonWrapper = () => {
  return (
    <div className='columns-1 sm:columns-2 lg:columns-3'>
      <Skeleton className='w-full h-45 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-65 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-70 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-80 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-45 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-55 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-65 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-45 break-inside-avoid mb-4' />
      <Skeleton className='w-full h-60 break-inside-avoid mb-4' />
    </div>
  );
};

export default SurveySkeletonWrapper;
