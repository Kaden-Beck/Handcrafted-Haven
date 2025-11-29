import { Skeleton } from '@/components/ui/skeleton';

export default function LoginPageSkeleton() {
  return (
    <>
      <div className="flex w-full items-start justify-center px-6 py-10 ">
        <div className="w-full max-w-sm space-y-6">
          <Skeleton className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="animate-pulse  rounded-full w-20 h-20"></Skeleton>
          </Skeleton>
          <Skeleton className="flex flex-col gap-6">
            <Skeleton className=" flex flex-col gap-6 rounded-xl border py-6">
              <Skeleton className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
                <Skeleton className="animate-pulse  h-6 w-3/4 rounded"></Skeleton>
                <Skeleton className="animate-pulse  h-4 w-1/2 rounded"></Skeleton>
              </Skeleton>
              <Skeleton className="px-6 space-y-6">
                <form>
                  <Skeleton className="flex w-full flex-col gap-7">
                    <Skeleton className="flex w-full gap-3 flex-col">
                      <label className="animate-pulse  h-6 w-1/4 rounded"></label>
                      <Skeleton className="animate-pulse  h-9 w-full rounded"></Skeleton>
                    </Skeleton>
                    <Skeleton className="flex w-full gap-3 flex-col">
                      <Skeleton className="flex items-center">
                        <label className="animate-pulse  h-6 w-1/4 rounded"></label>
                        <Skeleton className="animate-pulse  h-4 w-1/3 rounded ml-auto"></Skeleton>
                      </Skeleton>
                      <Skeleton className="animate-pulse  h-9 w-full rounded"></Skeleton>
                    </Skeleton>
                    <Skeleton className="flex w-full gap-3 flex-col">
                      <button className="animate-pulse  h-9 w-full rounded"></button>
                    </Skeleton>
                  </Skeleton>
                </form>
                <form>
                  <button className="animate-pulse  h-9 w-full rounded"></button>
                </form>
                <Skeleton className="text-center text-sm">
                  <Skeleton className="animate-pulse  h-4 w-1/2 rounded mx-auto"></Skeleton>
                </Skeleton>
              </Skeleton>
            </Skeleton>
          </Skeleton>
        </div>
      </div>
    </>
  );
}
