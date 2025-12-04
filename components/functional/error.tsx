'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import { useEffect } from 'react';
import { Button } from '../ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Item>
      <ItemHeader>There was an error!</ItemHeader>
      <ItemMedia />
      <ItemContent>
        <ItemTitle>There was an issue completing that action.</ItemTitle>
        <ItemDescription>Item</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button onClick={() => reset()}>Try Again</Button>
      </ItemActions>
      <ItemFooter>Try Again?</ItemFooter>
    </Item>
  );
}
