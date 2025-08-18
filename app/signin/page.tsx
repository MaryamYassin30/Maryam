'use client';

import { useState } from 'react';
// ⬇️ If your client file lives somewhere else, keep your existing path.
import { supabase } from '@/lib/supabaseClient';

export default function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setMsg('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMsg('Signed in! Taking you home...');
        window.location.href = '/';
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/`,
          },
        });
        if (error) throw error;
        setMsg('Check your email to confirm your account.');
      }
    } catch (e: any) {
      setErr(e.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto mt-16 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">
        {mode === 'signin' ? 'Sign in' : 'Create account'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full px-4 py-2 bg-black text-white rounded-lg disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>

        {err && <p className="text-red-600 text-sm">{err}</p>}
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
      </form>

      <div className="mt-4 text-sm">
        {mode === 'signin' ? (
          <button className="underline" onClick={() => setMode('signup')}>
            Need an account? Sign up
          </button>
        ) : (
          <button className="underline" onClick={() => setMode('signin')}>
            Already have an account? Sign in
          </button>
        )}
      </div>
    </main>
  );
}
