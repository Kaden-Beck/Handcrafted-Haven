import { Skeleton } from '@/components/ui/skeleton';

export default function RegisterPageSkeleton() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <Skeleton className="h-8 w-48" /> {/* Title */}
              <Skeleton className="h-4 w-64" /> {/* Subtitle */}
              <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-full" /> {/* Full Name Field */}
                <Skeleton className="h-6 w-full" /> {/* Email Field */}
                <Skeleton className="h-6 w-full" /> {/* Password Field */}
                <Skeleton className="h-6 w-full" /> {/* Confirm Password Field */}
              </div>
              <Skeleton className="h-10 w-full" /> {/* Submit Button */}
              <Skeleton className="h-4 w-32 mx-auto" /> {/* Or continue with */}
              <Skeleton className="h-10 w-full" /> {/* GitHub Button */}
              <Skeleton className="h-4 w-48 mx-auto" /> {/* Already have an account? */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Skeleton className="absolute inset-0 h-full w-full" /> {/* Background Image */}
      </div>
    </div>
  );
}
