'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get current user on first load
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });

    // Keep header in sync if auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    // Hard reload so the UI resets everywhere
    window.location.href = '/';
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand → home */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-black text-white grid place-items-center font-bold">YC</div>
          <div className="leading-none">
            <div className="font-semibold">You need, I can</div>
            <div className="text-xs text-gray-500">Local help. Real people. Prices upfront.</div>
          </div>
        </Link>

        {/* Right-side nav */}
        <nav className="flex items-center gap-2">
          <Link href="/post" className="px-3 py-2 rounded-xl bg-black text-white">
            Post
          </Link>

          {email ? (
            <>
              <span className="hidden sm:block text-sm">{email}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-2 rounded-xl border border-gray-300"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/signin" className="px-3 py-2 rounded-xl border border-gray-300">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
