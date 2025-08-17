'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Chip from '@/components/Chip';
import ListingCard from '@/components/ListingCard';
import PostModal from '@/components/PostModal';
import { filterListings } from '@/lib/filter';

const categories = ['All','Cars & Errands','Home & Handy','Tech & Setup','Beauty & Self-care','Lessons & Coaching'];

type ListingRow = any;

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [items, setItems] = useState<ListingRow[]>([]);
  const [showModal, setShowModal] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from('listings')
      .select('*, profiles(display_name)')
      .eq('status','active')
      .order('created_at',{ ascending:false });
    if (!error && data) setItems(data.map((l: any) => ({ ...l, user: { display_name: (l as any).profiles?.display_name } })));
  }

  useEffect(() => { load(); }, []);

  const filtered = filterListings(
    items.map((it:any)=>({ title: it.title, description: it.description, city: it.city, category: it.category })),
    query,
    activeCat
  );

  const filteredItems = items.filter((it:any, idx:number) => {
    const f = filtered[idx];
    return f && f.title === it.title; // naive map back for display; sufficient for demo
  });

  return (
    <main className="max-w-6xl mx-auto px-4">
      <section className="pt-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <input value={query} onChange={e=>setQuery(e.target.value)} className="flex-1 outline-none" placeholder="Search needs and offers — e.g., jump-start, hair braiding, math tutor" />
            <button onClick={()=>setShowModal(true)} className="px-3 py-2 rounded-xl bg-black text-white">Post</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} label={c} active={c === activeCat} onClick={() => setActiveCat(c)} />
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 rounded-2xl border border-gray-200 p-3 bg-white flex items-center gap-3 text-sm">
        <span>Meet in public places when possible. Payments are off‑platform — verify details before committing.</span>
      </div>

      <section className="py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((it:any) => (
          <ListingCard key={it.id} item={it} onMessage={() => alert(`Start chat about: ${it.title}`)} />
        ))}
        {filteredItems.length===0 && (
          <div className="col-span-full text-center text-gray-500 py-20">No posts yet. Be the first!</div>
        )}
      </section>

      <PostModal open={showModal} onClose={()=>{ setShowModal(false); load(); }} />
    </main>
  );
}