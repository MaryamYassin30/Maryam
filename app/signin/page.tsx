'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}` },
    });
    if (error) setError(error.message); else setSent(true);
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full px-3 py-2 bg-black text-white rounded-lg disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Send magic link'}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {sent && (
          <p className="text-green-700 text-sm">
            Check your email and open the link in a tab where this site is already open.
          </p>
        )}
      </form>
    </div>
  );
}
