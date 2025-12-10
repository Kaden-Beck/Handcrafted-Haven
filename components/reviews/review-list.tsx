import { Star } from 'lucide-react';
import type { Review } from '@/prisma/generated/prisma';

type Props = {
  reviews: Review[];
};

export function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return <p className="text-muted-foreground">No customer feedback yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {review.author_name || 'Anonymous'}
              </span>
              <span className="text-sm text-muted-foreground">
                • {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          {review.review && <p className="text-gray-700 dark:text-gray-300">{review.review}</p>}
        </div>
      ))}
    </div>
  );
}
