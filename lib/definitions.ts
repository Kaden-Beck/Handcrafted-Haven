import { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';

type HeroImageSource = ComponentProps<typeof Image>['src'];

export interface HeroProps {
  src: HeroImageSource;
  alt: string;
  children?: ReactNode;
  className?: string;
  overlayClassName?: string;
}
