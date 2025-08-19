'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const [email, setEmail] = useState<string | null>(null);

  // Load the current user (for showing email / sign-out)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  // Sign out and send back to home
  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: logo / title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-black text-white grid place-items-center font-bold">
            YC
          </div>
          <div>
            <div className="font-semibold leading-none">You need, I can</div>
            <div className="text-xs text-gray-500 leading-none">
              Local help. Real people. Prices upfront.
            </div>
          </div>
        </Link>

        {/* Right: nav */}
        <nav className="flex items-center gap-2">
          <Link
            href="/post"
            className="px-3 py-2 rounded-xl bg-black text-white"
          >
            Post
          </Link>

          {email ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm text-gray-600">
                {email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-2 rounded-xl border border-gray-300"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="px-3 py-2 rounded-xl border border-gray-300"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
