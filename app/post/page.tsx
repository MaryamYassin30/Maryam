'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CreatePostPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const authed = !!email;

  // protect route
  useEffect(() => {
    let active = true;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      const session = data.session;
      setEmail(session?.user?.email ?? null);
      if (!session) router.push('/signin');
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
      if (!session) router.push('/signin');
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!authed) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('posts').insert({
      user_id: user?.id,
      title,
      category: category || null,
      body,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }
    // go home and show the new post
    router.push('/');
    router.refresh();
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create a Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Title"
          maxLength={120}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Category (optional)"
          maxLength={40}
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <textarea
          className="w-full border rounded-lg px-3 py-2 min-h-[160px]"
          placeholder="Describe what you need / can do…"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
        >
          {loading ? 'Posting…' : 'Post'}
        </button>
      </form>
    </main>
  );
}
