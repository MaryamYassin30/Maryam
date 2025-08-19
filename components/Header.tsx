'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  // Keep email in sync with auth state
  useEffect(() => {
    let active = true;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setEmail(data.session?.user?.email ?? null);
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');       // go home
    router.refresh();       // refresh UI
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-black text-white grid place-items-center font-bold">
            YC
          </div>
          <div className="text-left">
            <div className="font-semibold leading-none">You need, I can</div>
            <div className="text-xs text-gray-500 leading-none">
              Local help. Real people. Prices upfront.
            </div>
          </div>
        </Link>

        {/* Right side */}
        <nav className="flex items-center gap-2">
          <Link href="/post" className="px-3 py-2 rounded-xl bg-black text-white">
            Post
          </Link>

          {email ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm text-gray-600">{email}</span>
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
