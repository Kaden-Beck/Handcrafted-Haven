// import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-[#023047] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#fb8500] to-[#ffb703]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Brand & Description */}
          <div className="flex flex-col gap-6">
            {/* Fixed: Use next/link instead of <a> */}
            <Link href="/" className="group inline-block">
              <h2 className="text-4xl font-black tracking-tight text-[#ffb703] group-hover:text-[#fb8500] transition-colors duration-300">
                Handcrafted Haven
              </h2>
            </Link>

            <p className="max-w-md text-base leading-relaxed text-white/80">
              A platform to connect creators to lovers of handcrafted goods.
            </p>

            {/* GitHub Button */}
            <a
              href="https://github.com/Kaden-Beck/Handcrafted-Haven"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-[#ffb703] text-[#ffb703] hover:bg-[#ffb703] hover:text-[#023047] font-bold transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Right: Team Credit */}
          <div className="flex items-center justify-center md:justify-end">
            <p className="text-sm text-white/60">
              Built with passion by{' '}
              <span className="text-[#ffb703] font-bold">WDD 430 | Team 16</span>
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
