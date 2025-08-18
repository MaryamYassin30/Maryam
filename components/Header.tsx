'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    // bump z-40 -> z-50
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="w-9 h-9 rounded-2xl bg-black text-white grid place-items-center font-bold">
            YC
          </div>
          <div>
            <div className="font-semibold leading-none">You need, I can</div>
            <div className="text-xs text-gray-500 leading-none">
              Local help. Real people. Prices upfront.
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/post" className="px-3 py-2 rounded-xl bg-black text-white">
            Post
          </Link>

          {/* absolute URL helps confirm it’s not a routing issue */}
          <Link
            href="https://uneedican.vercel.app/signin"
            className="px-3 py-2 rounded-xl border border-gray-300"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
