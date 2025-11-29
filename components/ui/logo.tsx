import Image from 'next/image';

export function Logo() {
  return <Image src="/images/logo.png" alt="logo" width={80} height={80} />;
}

export function LogoIcon() {
  return <Image src="/images/logo.png" alt="logo" width={40} height={40} />;
}
